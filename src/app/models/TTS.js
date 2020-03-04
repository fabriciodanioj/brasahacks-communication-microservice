import { Schema, model } from 'mongoose';

const TTSSchema = new Schema(
  {
    TTSStatus: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('TTS', TTSSchema);
