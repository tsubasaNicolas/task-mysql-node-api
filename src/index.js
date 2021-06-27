import app from "./app";

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Task app listening at http://localhost:${port}`);
});
