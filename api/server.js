const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;

const mongodb = "mongodb://mongodb:27017/quotes";

mongoose.set("strictQuery", true);
mongoose.connect(mongodb, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const quoteSchema = new mongoose.Schema(
  {
    quote: String,
  },
  {
    collection: "quotes",
  }
);
const Quote = mongoose.model("Quote", quoteSchema);

app.use(express.json());
app.use(cors());

app.get("/quotes", async (req, res) => {
  const quotes = await Quote.find({});
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  res.json({ quote: randomQuote });
});

app.post("/quotes", async (req, res) => {
  try {
    const quote = new Quote({
      quote: req.body.quote,
    });
    const newQuote = await quote.save();
    res.json({ newQuote });
  } catch (err) {
    console.error(err);
  }
});

app.listen(port, () => {
  console.log(`Backend at port ${port}.`);
});
