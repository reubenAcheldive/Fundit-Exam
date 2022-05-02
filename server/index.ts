import express from "express";

import { tempData } from "./temp-data";
import { Data } from "./match.modal";

const app = express();
let mocData: Data[] = tempData;
const PORT = 8888;

function paginated(page: number, limit: number) {
  const startIndex = (Number(page) - 1) * Number(limit);
  const endIndex = Number(page) * Number(limit);
  return { startIndex, endIndex };
}

app.use(express.json());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/api/match", (req, res) => {
  const { page = 1, limit = 5 } = req.query;
  const { startIndex, endIndex } = paginated(Number(page), Number(limit));

  const paginatedData = mocData.slice(startIndex, endIndex);

  res.send({
    page,
    limit,
    paginatedData,
  });
});
app.delete("/api/match/delete", (req, res) => {
  try {
    const { id } = req.body;
    console.log({ id });

    const newData = mocData.filter((match) => match.id !== id);
    console.log(id);

    if (newData) {
      mocData = newData;

      res.send({ id });
    }
  } catch (error) {
    return res.status(404).send([]);
  }
});

app.listen(PORT);
console.log("server running", PORT);
