import express from "express";
import cors from "cors";
import { prisma } from "./lib/prisma";

const app = express();

app.use(cors());
app.use(express.json());

// ===================================================================
// CREATE — POST /api/feedback
// ===================================================================
app.post("/api/feedback", async (req, res) => {
  const {
    name,
    email,
    eventName,
    division,
    rating,
    comment = "",
    suggestion = "",
  } = req.body;

  if (!name || !email || !eventName || !division || !rating) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const newFeedback = await prisma.feedback.create({
      data: {
        name,
        email,
        eventName,
        division,
        rating: Number(rating),
        comment,
        suggestion,
      },
    });

    return res.status(201).json(newFeedback);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating feedback." });
  }
});

// ===================================================================
// READ — GET /api/feedback
// ===================================================================
app.get("/api/feedback", async (req, res) => {
  const feedbacks = await prisma.feedback.findMany({
    orderBy: { createdAt: "desc" },
  });

  return res.json(feedbacks);
});

// ===================================================================
// UPDATE — PUT /api/feedback/:id
// ===================================================================
app.put("/api/feedback/:id", async (req, res) => {
  const { id } = req.params;

  const allowed = [
    "name",
    "email",
    "eventName",
    "division",
    "rating",
    "comment",
    "suggestion",
    "status",
  ];

  const updateData: any = {};

  for (const field of allowed) {
    if (req.body[field] !== undefined) {
      updateData[field] = req.body[field];
    }
  }

  try {
    const updated = await prisma.feedback.update({
      where: { id },
      data: updateData,
    });

    return res.json(updated);
  } catch (err) {
    return res.status(404).json({ message: "Feedback not found." });
  }
});

// ===================================================================
// DELETE — DELETE /api/feedback/:id
// ===================================================================
app.delete("/api/feedback/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await prisma.feedback.delete({
      where: { id },
    });

    return res.json({ message: "Deleted", deleted });
  } catch {
    return res.status(404).json({ message: "Feedback not found." });
  }
});

// ===================================================================
// Start Server
// ===================================================================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
