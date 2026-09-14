const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let assets = [
  {
    id: "AST-001",
    device: "Check-in Kiosk",
    location: "Terminal 1",
    status: "Online"
  },
  {
    id: "AST-002",
    device: "Boarding Gate Scanner",
    location: "Gate A12",
    status: "Online"
  },
  {
    id: "AST-003",
    device: "Baggage Scanner",
    location: "Security Zone",
    status: "Maintenance"
  },
  {
    id: "AST-004",
    device: "Information Display",
    location: "Terminal 2",
    status: "Offline"
  }
];

app.get("/", (req, res) => {
  res.json({
    message: "Airport Asset Management API is running"
  });
});

app.get("/api/assets", (req, res) => {
  res.json(assets);
});

app.post("/api/assets", (req, res) => {
  const { id, device, location, status } = req.body;

  if (!id || !device || !location || !status) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

  const newAsset = {
    id,
    device,
    location,
    status
  };

  assets.push(newAsset);

  res.status(201).json(newAsset);
});

app.delete("/api/assets/:id", (req, res) => {
  const { id } = req.params;

  const assetExists = assets.find(asset => asset.id === id);

  if (!assetExists) {
    return res.status(404).json({
      error: "Asset not found"
    });
  }

  assets = assets.filter(asset => asset.id !== id);

  res.json({
    message: "Asset deleted successfully"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
