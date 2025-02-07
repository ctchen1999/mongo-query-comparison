import mongoose, { Schema, model, Model, Types, Document } from "mongoose";

interface IUserModel extends Document {
    authId: string;
    favorites: Types.ObjectId[];
    ratings: Map<string, number>;
}

const userSchema = new mongoose.Schema({
    authId: {
        type: Schema.Types.ObjectId,
        ref: "Auth",
        required: [true, "Please provide your userId"],
        unique: [true, "userId already exists"]
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "Favorite",
        unique: [true, "Already added to favorite"]
    }],
    ratings: {
        type: Map,
        of: Number,
        default: new Map(),
      },
})

// userSchema.pre(/^find/, function (this: any, next) {
//     this.startTime = Date.now();
//     next();
// });

// userSchema.pre("aggregate", function (this: any, next) {
//     this.startTime = Date.now();
//     next();
// });

// userSchema.post(/^find/, function (this: any, docs, next) {
//     const executionTime = Date.now() - this.startTime;
//     console.log(`Query took ${executionTime}ms`);
//     next()
// });

// userSchema.post("aggregate", function (this: any, docs, next) {
//     const executionTime = Date.now() - this.startTime;
//     console.log(`Query took ${executionTime}ms`);
//     next()
// });

export const User: Model<IUserModel> = model<IUserModel>("User", userSchema)