import mongoose, { Document, Model, model, Schema, Types } from "mongoose" 

interface IFavoritesModel extends Document {
    userId: Types.ObjectId;
    movieId: number;
}

const FavoritesSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    movieId: {
        type: Number,
        required: true,
    },
});

export const Favorite: Model<IFavoritesModel> = model<IFavoritesModel>("Favorite", FavoritesSchema)