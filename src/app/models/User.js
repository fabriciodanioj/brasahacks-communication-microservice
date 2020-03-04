import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    messages: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('User', UserSchema);
