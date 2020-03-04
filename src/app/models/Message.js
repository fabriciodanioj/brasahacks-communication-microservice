import { Schema, model } from 'mongoose';

const MessageSchema = new Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'Message',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('Message', MessageSchema);
