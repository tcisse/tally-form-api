import { Schema, model, Types } from 'mongoose';

interface IUser {
  _id: Types.ObjectId;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, unique: true, required: true, index: true },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

export const User = model<IUser>('User', UserSchema);
export type { IUser };

