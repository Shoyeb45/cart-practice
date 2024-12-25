import express from "express";
import cors from "cors";
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

// routes
import userRouter from "./routes/user.route.js";

app.use("/api/v1/user", userRouter);

app.get("/", (req, res) => {
    res.send("hiiiii!!");
});
