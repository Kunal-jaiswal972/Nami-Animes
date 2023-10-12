import cors from "cors";
import morgan from "morgan";
import express from "express";
import connect from "./conn.js";
import router from "./routes/router.js";

const app = express();

/**middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.status(201).json("hi from server");
});

app.use("/api/v1", router);

// connect()
//   .then(() => {
//     try {
//       app.listen(port, () => {
//         console.log(`Server connected to http://localhost:${port}`);
//       });
//     } catch (error) {
//       console.log("Cannot connect to server");
//     }
//   })
//   .catch((error) => {
//     console.log("Invalid db connection...");
//   });


try {
  app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
  });
} catch (error) {
  console.log("Cannot connect to server");
}