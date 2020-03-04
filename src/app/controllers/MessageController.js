import TotalVoice from 'totalvoice-node';
import User from '../models/User';
import Message from '../models/Message';

const api = new TotalVoice(process.env.ACCESS_TOKEN2);

class MessageControler {
  async store(req, res) {
    try {
      const { phone } = req.params;
      const { message } = req.body;

      const { dados, status } = await api.sms.enviar(phone, message, true);

      let user = await User.findOne({ phone });

      if (!user) {
        user = await User.create({ phone });
      }

      const { user_id, messageStatus, id } = await Message.create({
        phone,
        message,
        messageStatus: status,
        user_id: user.id,
        message_id: dados.id,
      });

      return res.status(201).send({
        user: {
          user_id,
          phone,
        },
        message: {
          id,
          message,
          messageStatus,
          message_id: dados.id,
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

      const messages = await Message.find({ user_id });

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
