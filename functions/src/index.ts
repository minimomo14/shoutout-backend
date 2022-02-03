import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import shoutRoutes from "./routes/ShoutRoutes";


const app = express();
app.use(cors());
app.use(express.json());

app.use("/", shoutRoutes);

export const api = functions.https.onRequest(app);

