const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

const uri = "mongodb://akshayas:Shreya%402406@ac-ei96flr-shard-00-00.xib2hb8.mongodb.net:27017,ac-ei96flr-shard-00-01.xib2hb8.mongodb.net:27017,ac-ei96flr-shard-00-02.xib2hb8.mongodb.net:27017/CHESSBY?ssl=true&replicaSet=atlas-3kpzb0-shard-0&authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri);

const path = require("path");

// Serve index.html from current directory
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});


async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}

connectDB();

const db = client.db("chess_course");

// ✅ 1. Get all chapters
app.get("/chapters", async (req, res) => {
  try {
    const data = await db.collection("chapter").find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 2. Get all modules
app.get("/modules", async (req, res) => {
  try {
    const data = await db.collection("module").find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 3. Get all stories
app.get("/stories", async (req, res) => {
  try {
    const data = await db.collection("story").find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 4. Get all principle positions
app.get("/principles", async (req, res) => {
  try {
    const data = await db.collection("principle_position").find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 5. Get all story mappings
app.get("/story-mappings", async (req, res) => {
  try {
    const data = await db.collection("story_mapping").find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 6. Get all chess puzzles
app.get("/puzzles", async (req, res) => {
  try {
    const data = await db.collection("chess_puzzle").find({}).toArray();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
