const Bot = require('messenger-bot');

const { FB_APP_SECRET, FB_PAGE_TOKEN, FB_WEBHOOK_TOKEN } = process.env;

if (
  !FB_APP_SECRET || FB_APP_SECRET.trim().length === 0
  || !FB_PAGE_TOKEN || FB_PAGE_TOKEN.trim().length === 0
  || !FB_WEBHOOK_TOKEN || FB_WEBHOOK_TOKEN.trim().length === 0
) {
  throw new Error(404, 'FB env var missing');
}

const bot = new Bot({
  app_secret: FB_APP_SECRET,
  token: FB_PAGE_TOKEN,
  verify: FB_WEBHOOK_TOKEN,
});

bot.on('error', (err) => {
  console.log(err.message);
  // TODO: email me
});

const greeting = [{
  locale: 'default',
  text: 'Comenzar',
}, {
  locale: 'en_US',
  text: 'Get Started',
}];

bot.setGreeting(greeting, (err, profile) => {
  console.log('err', err, 'profile', profile);
});

// bot.setGetStartedButton(payload, [callback])

bot.on('message', (payload, reply) => {
  const { text } = payload.message;

  bot.getProfile(payload.sender.id, (err1, profile) => {
    if (err1) throw err1;

    reply({ text }, (err2) => {
      if (err2) throw JSON.stringify(err2);
      console.log(`Echoed back to ${profile.first_name} ${profile.last_name}: ${text}`);
    });
  });
});

module.exports = bot;
