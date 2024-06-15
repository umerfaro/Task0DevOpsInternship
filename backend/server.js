const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Establishing connection to MySQL database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: 3306,
  dialect: 'mysql'
});

// Define a model for the Credentials table
const User = sequelize.define('Credentials', {
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
}, {
  timestamps: false // No automatic timestamp fields
});

// Synchronize the model with the database
(async () => {
  try {
    await sequelize.sync(); // Using sync without 'force: true' to avoid dropping tables
    console.log("Database synchronized");
  } catch (error) {
    console.error("Failed to synchronize database:", error);
  }
})();

app.listen(PORT, () => {
  console.log("Server is Successfully Running, and App is listening on port " + PORT);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // Find a user with the provided email and password
    const user = await User.findOne({
        where: { email, password },
        attributes: ['email', 'password']
    });

    if (user) {
      res.status(200).send("Success");
    } else {
      res.status(401).send("Invalid username or password.");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
