const sendApi = require('./send');
const messages = require('../messages');

/*
 * handleReceivePostback — Postback event handler triggered by a postback
 * action you, the developer, specify on a button in a template. Read more at:
 * developers.facebook.com/docs/messenger-platform/webhook-reference/postback
 */
const handleReceivePostback = (event) => {
  /**
   * The 'payload' parameter is a developer-defined field which is
   * set in a postbackbutton for Structured Messages.
   *
   * In this case we've defined our payload in our postback
   * actions to be a string that represents a JSON object
   * containing `type` and `data` properties. EG:
   */
  console.log('event', event);
  // const { type, data } = JSON.parse(event.postback.payload);
  const type = event.postback.payload;
  const senderId = event.sender.id;

  // Perform an action based on the type of payload received
  switch (type) {
    case 'I_AM_ORGANIZER':
      sendApi.sendMessage(senderId, messages.askGameLocation);
      break;
    case 'I_AM_PLAYER':
      // handleNewGiftSelected(senderId, data.giftId);
      break;
    case 'GET_STARTED':
      // sendApi.sendHelloRewardMessage(senderId);
      break;
    default:
      console.error(`Unknown Postback called: ${type}`);
      break;
  }
};

/*
 * handleReceiveMessage - Message Event called when a message is sent to
 * your page. The 'message' object format can vary depending on the kind
 * of message that was received. Read more at: https://developers.facebook.com/
 * docs/messenger-platform/webhook-reference/message-received
 */
const handleReceiveMessage = ({ message, sender }) => {
  const senderId = sender.id;

  // It's good practice to send the user a read receipt so they know
  // the bot has seen the message. This can prevent a user
  // spamming the bot if the requests take some time to return.
  sendApi.sendReadReceipt(senderId);

  if (message.text) {
    sendApi.sendMessage(senderId, messages.askUserType);
  }
};

module.exports = {
  handleReceivePostback,
  handleReceiveMessage,
};
