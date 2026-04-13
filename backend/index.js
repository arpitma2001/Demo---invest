const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = {};

// REGISTER
app.get("/register", (req, res) => {
  const user = req.query.user;

  if (users[user]) {
    return res.json({ error: "User already exists" });
  }

  users[user] = {
    balance: 1000,
    lastEarn: 0
  };

  res.json({ message: "Registered successfully" });
});

// LOGIN
app.get("/login", (req, res) => {
  const user = req.query.user;

  if (!users[user]) {
    return res.json({ error: "User not found" });
  }

  res.json({ message: "Login successful" });
});

// BALANCE
app.get("/balance", (req, res) => {
  const user = req.query.user;

  if (!users[user]) return res.json({ error: "User not found" });

  res.json({ balance: users[user].balance });
});

// DAILY EARN
app.get("/earn", (req, res) => {
  const user = req.query.user;

  if (!users[user]) return res.json({ error: "User not found" });

  const now = Date.now();

  if (now - users[user].lastEarn < 86400000) {
    return res.json({ error: "Already earned today" });
  }

  let earning = users[user].balance * 0.02;
  users[user].balance += earning;
  users[user].lastEarn = now;

  res.json({ earning, balance: users[user].balance });
});

// INVEST
app.get("/invest", (req, res) => {
  const user = req.query.user;
  const amount = parseInt(req.query.amount);

  if (!users[user]) return res.json({ error: "User not found" });

  users[user].balance += amount;

  res.json({ balance: users[user].balance });
});

// WITHDRAW
app.get("/withdraw", (req, res) => {
  const user = req.query.user;

  if (!users[user]) return res.json({ error: "User not found" });

  res.json({ message: "Withdrawal requested" });
});

// PORT FIX
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
