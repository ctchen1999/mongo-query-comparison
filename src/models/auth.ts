import {Document, Schema, Model, Types, model} from "mongoose";

interface IAuthModel extends Document {
  name: string;
  email: string;
}

const AuthSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  email: {
    type: String,
  },
});

export const Auth: Model<IAuthModel> = model<IAuthModel>("Auth", AuthSchema);