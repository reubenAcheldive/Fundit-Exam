import express from "express";

import bodyParser = require("body-parser");
import { tempData } from "./temp-data";

const app = express();

const PORT = 8888;

const PAGE_SIZE = 5;

app.use(express.json());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("dev api status - up");
});

app.get("/api/match", (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const { startIndex, endIndex } = paginated(Number(page), Number(limit));

  const paginatedData = tempData.slice(startIndex, endIndex);

  res.send({
    page,
    limit,
    paginatedData,
  });
});

app.listen(PORT);
console.log("server running", PORT);
function paginated(page: number, limit: number) {
  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = Number(page) * Number(limit);
  return { startIndex, endIndex };
}
