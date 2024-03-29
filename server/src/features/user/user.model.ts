import mongoose, { Schema, model, InferSchemaType } from 'mongoose';
import bcrypt from "bcryptjs"

const UserSchema = new Schema({
    username: {
      type: String,
      required: true,
      trim: true
    },
    hashPassword: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

UserSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.hashPassword);
};

export declare interface IUser extends InferSchemaType<typeof UserSchema> {
  comparePassword(password: string): boolean
}

export default model<IUser>("User", UserSchema);