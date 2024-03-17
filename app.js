const path = require("path");
const express = require("express");
const app = express();

const {
  shortenURL,
  getLongByShort,
  getLongById,
} = require("./controller/urlController");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // Load public directory

app.post("/url/long-to-short", async (req, res) => {
  const { value } = req.body;
  const short = await shortenURL(value);
  res.json({ message: `${short}` });
});

app.post("/url/short-to-long", async (req, res) => {
  const { key } = req.body;
  const long = await getLongByShort(key);
  console.log(`long is: ${long}`);
  res.json({ message: `${long}` });
});
// Handle Redirect
app.get("/:shortUrl", async (req, res) => {
  const long = await getLongById(req.params.shortUrl);
  if (!long) {
    res.json({ message: "Short URL not valid" });
    return;
  }
  res.redirect(long);
});

module.exports = app;
