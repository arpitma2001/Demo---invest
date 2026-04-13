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
    lastEarn: ""
  };

  res.json({ message: "Registered successfully" });
});

// BALANCE
app.get("/balance", (req, res) => {
  const user = req.query.user;

  if (!users[user]) {
    return res.json({ error: "User not found" });
  }

  res.json({ balance: users[user].balance });
});

// INVEST
app.get("/invest", (req, res) => {
  const user = req.query.user;
  const amount = parseInt(req.query.amount);

  if (!users[user]) {
    return res.json({ error: "User not found" });
  }

  if (!amount || amount <= 0) {
    return res.json({ error: "Invalid amount" });
  }

  users[user].balance += amount;

  res.json({
    message: "Invested " + amount,
    balance: users[user].balance
  });
});

// DAILY EARN
app.get("/earn", (req, res) => {
  const user = req.query.user;

  if (!users[user]) {
    return res.json({ error: "User not found" });
  }

  const today = new Date().toDateString();

  if (users[user].lastEarn === today) {
    return res.json({ error: "Already earned today" });
  }

  users[user].balance += 100;
  users[user].lastEarn = today;

  res.json({
    message: "100 Daily Earn Added",
    balance: users[user].balance
  });
});

// WITHDRAW
app.get("/withdraw", (req, res) => {
  const user = req.query.user;

  if (!users[user]) {
    return res.json({ error: "User not found" });
  }

  users[user].balance = 0;

  res.json({
    message: "Withdrawal requested"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
