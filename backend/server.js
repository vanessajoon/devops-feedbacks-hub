const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

app.get("/", (req, res) => {
  res.json({
    message: "Feedback Hub API is running"
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy"
  });
});

app.get("/api/feedback", async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({
      error: "Failed to retrieve feedback"
    });
  }
});

app.post("/api/feedback", async (req, res) => {
  const { name, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({
      error: "Name and message are required"
    });
  }

  try {
    const feedback = await Feedback.create({
      name,
      message
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({
      error: "Failed to save feedback"
    });
  }
});

async function startServer() {
  const mongoUrl = process.env.MONGO_URL;

  if (!mongoUrl) {
    throw new Error("MONGO_URL environment variable is required");
  }

  await mongoose.connect(mongoUrl);

  const port = process.env.PORT || 5000;

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

if (require.main === module) {
  startServer().catch((error) => {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  });
}

module.exports = { app, Feedback };
