import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('User', UserSchema);
