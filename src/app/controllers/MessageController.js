import TotalVoice from 'totalvoice-node';
import User from '../models/User';
import Message from '../models/Message';

const api = new TotalVoice(process.env.ACCESS_TOKEN);

class MessageControler {
  async store(req, res) {
    try {
      const { phone } = req.params;
      const { message } = req.body;

      const { status, mensagem } = await api.sms.enviar(phone, message);

      let user = await User.findOne({ phone });

      if (!user) {
        user = await User.create({ phone });
      }

      const { user_id, messageStatus, id } = await Message.create({
        phone,
        message,
        messageStatus: status,
        user_id: user.id,
      });

      return res.send({
        user: {
          user_id,
          phone,
        },
        message: {
          id,
          message,
          messageStatus,
          mensagem,
        },
      });
    } catch (error) {
      return res.send(error);
    }
  }

  async show(req, res) {
    try {
      const { phone } = req.params;

      const { id: user_id } = await User.findOne({ phone });

      const messages = await Message.find({ user_id });

      return res.send({
        phone,
        messages,
      });
    } catch (error) {
      return res.send(error);
    }
  }
}

export default new MessageControler();
