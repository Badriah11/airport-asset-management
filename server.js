const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false
});

async function initializeDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS assets (
      id VARCHAR(50) PRIMARY KEY,
      device VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL
    )
  `);

  const defaultAssets = [
    ["AST-001", "Check-in Kiosk", "Terminal 1", "Online"],
    ["AST-002", "Boarding Gate Scanner", "Gate A12", "Online"],
    ["AST-003", "Baggage Scanner", "Security Zone", "Maintenance"],
    ["AST-004", "Information Display", "Terminal 2", "Offline"]
  ];

  for (const asset of defaultAssets) {
    await pool.query(
      `
      INSERT INTO assets (id, device, location, status)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO NOTHING
      `,
      asset
    );
  }
}

app.get("/", (req, res) => {
  res.json({
    message: "Airport Asset Management API is running"
  });
});

app.get("/api/assets", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM assets ORDER BY id"
    );

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to load assets"
    });
  }
});

app.post("/api/assets", async (req, res) => {
  const { id, device, location, status } = req.body;

  if (!id || !device || !location || !status) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO assets (id, device, location, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [id, device, location, status]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {

    if (error.code === "23505") {
      return res.status(409).json({
        error: "Asset ID already exists"
      });
    }

    console.error(error);

    res.status(500).json({
      error: "Failed to add asset"
    });
  }
});
app.put("/api/assets/:id", async (req, res) => {
  const { id } = req.params;
  const { device, location, status } = req.body;

  if (!device || !location || !status) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

  try {
    const result = await pool.query(
      `
      UPDATE assets
      SET device = $1,
          location = $2,
          status = $3
      WHERE id = $4
      RETURNING *
      `,
      [device, location, status, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Asset not found"
      });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to update asset"
    });
  }
});
app.delete("/api/assets/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
      DELETE FROM assets
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        error: "Asset not found"
      });
    }

    res.json({
      message: "Asset deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to delete asset"
    });
  }
});

const PORT = process.env.PORT || 3000;

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("PostgreSQL database connected");
    });
  })
  .catch(error => {
    console.error("Database initialization failed:", error);
    process.exit(1);
  });
