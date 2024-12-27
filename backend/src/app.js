import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { errorHandler } from "./middleware/errorHandler.js";
export const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);

// filename and dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Linking frontend
app.use(express.static(path.join(__dirname, "./../../frontend")));

app.use(express.urlencoded({
    extended: true,
    limit: "20kb" 
}));

app.use(express.json({
    limit: "20kb"
}));
// const port = process.env.PORT || 8000;

// Route file path
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./../../frontend/index.html"));
});

app.use(errorHandler);

// routes
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";

app.use("/api/v1/user", userRouter);

app.use("/api/v1/product", productRouter);

app.get("/", (req, res) => {
    res.send("hiiiii!!");
});
