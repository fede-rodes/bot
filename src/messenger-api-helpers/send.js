const castArray = require('lodash/castArray');
const api = require('./api');

// Turns typing indicator on.
const typingOn = recipientId => ({
  recipient: {
    id: recipientId,
  },
  sender_action: 'typing_on',
});

// Turns typing indicator off.
const typingOff = recipientId => ({
  recipient: {
    id: recipientId,
  },
  sender_action: 'typing_off',
});

// Wraps a message JSON object with recipient information.
const messageToJSON = (recipientId, messagePayload) => ({
  recipient: {
    id: recipientId,
  },
  message: messagePayload,
});

// Send one or more messages using the Send API.
const sendMessage = (recipientId, messagePayloads) => {
  const messagePayloadArray = castArray(messagePayloads).map(messagePayload => (
    messageToJSON(recipientId, messagePayload)));

  api.callMessagesAPI([
    typingOn(recipientId),
    ...messagePayloadArray,
    typingOff(recipientId),
  ]);
};

// Send a read receipt to indicate the message has been read
const sendReadReceipt = (recipientId) => {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    sender_action: 'mark_seen',
  };

  api.callMessagesAPI(messageData);
};

module.exports = {
  sendMessage,
  sendReadReceipt,
};
