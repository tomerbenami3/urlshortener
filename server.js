const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require('./app');

const port = 3000;

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
      .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful!");
  });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
