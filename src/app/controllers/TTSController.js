import TotalVoice from 'totalvoice-node';
import User from '../models/User';
import Tts from '../models/TTS';

const api = new TotalVoice(process.env.ACCESS_TOKEN);

class MessageControler {
  async store(req, res) {
    try {
      const { phone } = req.params;
      const { message } = req.body;

      const { status, mensagem } = await api.composto.enviar(
        phone,
        [
          {
            acao: 'tts',
            acao_dados: {
              mensagem: message,
              velocidade: '-2',
              tipo_voz: 'br-Vitoria',
            },
          },
        ],
        null,
        'auto_range',
        false
      );

      let user = await User.findOne({ phone });

      if (!user) {
        user = await User.create({ phone });
      }

      const { user_id, TTSStatus, id } = await Tts.create({
        phone,
        text: message,
        TTSStatus: status,
        user_id: user.id,
      });

      return res.status(201).send({
        user: {
          user_id,
          phone,
        },
        TTS: {
          id,
          message,
          TTSStatus,
          mensagem,
        },
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  async show(req, res) {
    try {
      const { phone } = req.params;

      const { id: user_id } = await User.findOne({ phone });

      const messages = await Tts.find({ user_id });

      return res.status(200).send({
        phone,
        messages,
      });
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default new MessageControler();
