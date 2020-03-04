import Message from '../models/Message';

class MessageResponseController {
  async store(req, res) {
    try {
      const { resposta, sms_id } = req.body;

      const response = await Message.findOneAndUpdate(
        { message_id: sms_id },
        {
          response: resposta,
        }
      );

      return res.status(200).send(response);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default new MessageResponseController();
