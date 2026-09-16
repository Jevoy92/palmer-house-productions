import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { PackageDetail } from "@/components/collection/PackageDetail";
import { getPackageById, resolvePackageId } from "@/lib/pricing-catalog";
import { createSeo } from "@/lib/seo";

export const Route = createFileRoute("/packages/$packageId")({
  validateSearch: (search: Record<string, unknown>): { count?: number } => ({
    count:
      search.count !== undefined && Number.isInteger(Number(search.count))
        ? Number(search.count)
        : undefined,
  }),
  beforeLoad: ({ params, search }) => {
    const id = resolvePackageId(params.packageId);
    if (!getPackageById(id)) throw notFound();
    if (id !== params.packageId)
      throw redirect({
        to: "/packages/$packageId",
        params: { packageId: id },
        search,
        replace: true,
      });
  },
  head: ({ params }) => {
    const item = getPackageById(params.packageId);
    return createSeo({
      title: `${item?.name ?? "Video package"} | Palmer House Productions`,
      description: item?.description ?? "Find the right video package for your business.",
      pathname: `/packages/${item?.id ?? params.packageId}`,
    });
  },
  component: PackageRoute,
});

function PackageRoute() {
  const { packageId } = Route.useParams();
  const search = Route.useSearch();
  const item = getPackageById(packageId)!;
  const count =
    search.count !== undefined &&
    search.count >= item.editable!.min &&
    search.count <= item.editable!.max
      ? search.count
      : undefined;
  return <PackageDetail key={item.id} item={item} initialCount={count} />;
}
