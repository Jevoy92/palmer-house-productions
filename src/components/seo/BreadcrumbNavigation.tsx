import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export const BreadcrumbNavigation = () => {
  const location = useLocation();
  
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/" }
    ];

    const path = location.pathname;
    
    switch (path) {
      case "/about":
        items.push({ label: "About", current: true });
        break;
      case "/video-packages":
        items.push({ label: "Video Packages", current: true });
        break;
      case "/contact":
        items.push({ label: "Contact", current: true });
        break;
      case "/discovery-call":
        items.push({ label: "Discovery Call", current: true });
        break;
      case "/glimpse":
        items.push({ label: "Glimpse", current: true });
        break;
      case "/team":
        items.push({ label: "Team", current: true });
        break;
      case "/reviews":
        items.push({ label: "Reviews", current: true });
        break;
      case "/video-use-cases":
        items.push({ label: "Video Use Cases", current: true });
        break;
      case "/arsenal":
        items.push({ label: "Arsenal", current: true });
        break;
      case "/pathways":
        items.push({ label: "Pathways", current: true });
        break;
      case "/podcast":
        items.push({ label: "Podcast", current: true });
        break;
      case "/client-results":
        items.push({ label: "Client Results", current: true });
        break;
      default:
        return [];
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <BreadcrumbItem>
                {item.current ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.href!}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};