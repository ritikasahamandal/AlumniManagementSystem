import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
// import { arcjetMiddleware } from "./middlware/arcjet.middleware.js";
import alumniRoutes from "./routes/alumni.routes.js";
import adminRoutes from "./routes/admin.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
// app.use(arcjetMiddleware);
app.use("/api/alumni", alumniRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(process.env.PORT, ()=>{
  console.log("Server running...");
  
});