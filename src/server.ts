import express, { Request, Response } from "express";
import cors from "cors";
import Sender from "./service/initialVenomService";
const port = process.env.PORT || 3333;
const sender = new Sender();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log("app listening on port" + port);
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
