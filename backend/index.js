let balance = 1000;

app.get("/balance", (req, res) => {
  res.json({ balance });
});

app.get("/earn", (req, res) => {
  let earning = balance * 0.02; // 2% simulation
  balance += earning;

  res.json({ earning, balance });
});

app.get("/withdraw", (req, res) => {
  res.json({ message: "Withdrawal requested" });
});
