import express from "express"
import mongoose from "mongoose"
import { faker } from '@faker-js/faker';

import userRouter from "./routes/user"
import authRouter from "./routes/auth"
import favoriteRouter from "./routes/favorite"

mongoose.connect("mongodb://localhost:27017/")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

// mongoose monitoring
// mongoose.set("debug", true)
// mongoose.plugin((schema) => {
//     schema.pre(['find', 'findOne'], function (this: any, next) {
//         console.log("PREFIND")
//         this.start = Date.now();
//         console.log('Executing query:', this.getFilter());
//         next();
//     });
//     schema.post(['find', 'findOne'], function (this: any, docs, next) {
//         console.log("POSTFIND")
//         const duration = Date.now() - this.start;
//         console.log('Query returned:', docs.length, 'documents in', duration, 'ms');
//         next();
//     });
// });

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    const startTime = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - startTime;
    //   console.log(`Request to ${req.originalUrl} took ${duration}ms`);
    });
    next();
});

app.use(userRouter);
app.use(authRouter);
app.use(favoriteRouter);

app.listen(8080, () => {
    console.log("Server is running on port 8080");      
})

export default app;