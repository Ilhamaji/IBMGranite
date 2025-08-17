import Replicate from "replicate";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();
const replicate = new Replicate();
const app = express();
const port = 3000;
app.use(express.json());

const corsOptions = {
  origin: process.env.URL_FE, // Replace with your allowed origin(s)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed request headers
  credentials: true, // Allow sending cookies/authorization headers
};

app.use(cors(corsOptions));

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

let answer;

app.get("/", async (req, res) => {
  res.status(200).json({ data: await answer });
});

app.post("/prompt", async (req, res) => {
  res.status(200).json({
    message: "Data received successfully!",
    data: await submitPrompt(req.body.prompt),
  });
});

const submitPrompt = async (prompt) => {
  const input = {
    prompt: prompt,
  };

  const output = await replicate.run("ibm-granite/granite-3.3-8b-instruct", {
    input,
  });

  answer = output.join("");

  return output.join("");
};
