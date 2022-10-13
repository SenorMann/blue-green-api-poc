import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./routes";

const app = express();
const { NODE_ENV = "dev", PORT } = process.env;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(router);


app.listen(PORT, () => {
  console.log(`Ready on localhost:${PORT} - env: ${NODE_ENV}`)
})
