import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/errorHandler.js";
export const app = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);


app.use(express.urlencoded({
    extended: true,
    limit: "20kb" 
}));

app.use(express.json({
    limit: "20kb"
}));
// const port = process.env.PORT || 8000;

app.use(errorHandler);

// routes
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";

app.use("/api/v1/user", userRouter);

app.use("/api/v1/product", productRouter);

app.get("/", (req, res) => {
    res.send("hiiiii!!");
});
