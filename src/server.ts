import express, { Request, Response } from "express";
import cors from "cors";
import Sender from "./service/initialVenomService";
const sender = new Sender();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: false }));
app.listen(3333, () => {
  console.log("app listening on port 3333");
});
app.get("/status", (req: Request, res: Response) => {
  return res.send({ qr_code: sender.qrCode, connected: sender.isConnected });
});
app.post("/send", async (req: Request, res: Response) => {
  const { number, message } = req.body;
  try {
    await sender.sendText(number, message);
    return res.status(200).json({ success: true });
  } catch (error: any) {
    res.status(500).send({ success: false, message: error.message });
  }
});
