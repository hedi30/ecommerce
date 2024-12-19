const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const orderRoutes = require("./routes/orderRoutes.js");
const cardRoutes = require("./routes/cardRoutes.js");
const { dbConnect } = require("./utils/db.js");
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api/auth", require("./routes/authRoutes.js"));
app.use("/api/orders", orderRoutes);
app.use("/api/card", cardRoutes);
const gunRoutes = require("./routes/gunRoutes.js");
app.use("/api/guns", gunRoutes);
const port = process.env.PORT;
dbConnect();
app.listen(port, () => console.log(`server is running on port ${port} `));
