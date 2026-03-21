import { Router, type IRouter } from "express";
import { CreateProjectRequestBody } from "@workspace/api-zod";
import { db, projectRequestsTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/project-requests", async (req, res) => {
  try {
    const parsed = CreateProjectRequestBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const data = parsed.data;

    const [inserted] = await db
      .insert(projectRequestsTable)
      .values({
        fullName: data.fullName,
        companyName: data.companyName ?? null,
        email: data.email,
        phone: data.phone ?? null,
        palCategory: data.palCategory,
        missionId: data.missionId,
        packageDetails: data.packageDetails ?? null,
        estimatedTotal: data.estimatedTotal?.toString() ?? null,
        projectDescription: data.projectDescription ?? null,
        preferredTimeline: data.preferredTimeline ?? null,
      })
      .returning();

    res.status(201).json({
      id: inserted.id,
      message: "Your project request has been submitted successfully! We'll be in touch within 24 hours.",
      createdAt: inserted.createdAt.toISOString(),
    });
  } catch (error) {
    req.log.error({ err: error }, "Failed to create project request");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
