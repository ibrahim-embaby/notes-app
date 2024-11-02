const express = require("express");
const app = express();
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const cookiePareser = require("cookie-parser");
require("dotenv").config();

connectToDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookiePareser());

app.use("/auth", require("./routes/authRoute"));
app.use("/notes", require("./routes/notesRoute"));

PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
