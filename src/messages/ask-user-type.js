const askUserType = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: 'Hey, I match organizers looking for players with players looking for people to play. What kind of human are you? 🤖 ⚽',
      buttons: [{
        type: 'postback',
        title: 'I\'m an organizer',
        payload: 'I_AM_ORGANIZER',
      }, {
        type: 'postback',
        title: 'I\'m a player',
        payload: 'I_AM_PLAYER',
      }],
    },
  },
};

module.exports = askUserType;
