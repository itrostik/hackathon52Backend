import express, { Request, Response } from "express";
import cors from "cors";
import usersRoute from "./routes/user.route";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", usersRoute);

app.get("/", (req: Request, res: Response) => {
  res.redirect("/api/users");
});
app.listen(process.env.PORT || 4444, () => {
  console.log("SERVER OK");
});
