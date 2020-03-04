import TotalVoice from 'totalvoice-node';

const api = new TotalVoice(process.env.ACCESS_TOKEN);

class MessageControler {
  async store(req, res) {
    try {
      const { phone } = req.params;
      const { message } = req.body;

      const status = await api.sms.enviar(phone, message);

      return res.send(status);
    } catch (error) {
      return res.send(error);
    }
  }
}

export default new MessageControler();
