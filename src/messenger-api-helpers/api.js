const request = require('request');
const castArray = require('lodash/castArray');
const isEmpty = require('lodash/isEmpty');

const { FB_PAGE_TOKEN } = process.env;

/**
 * Send messages in order to the Facebook graph API.
 *
 * @param   {String}          endPoint - Specific endpoint to send data to
 * @param   {Object|Object[]} messageDataArray - Payloads to send individually
 * @param   {Object}          queryParams - Query Parameters
 * @param   {Object}          retries - # of times to attempt to send a message.
 * @returns {undefined}
 */
const callAPI = (endPoint, messageDataArray, queryParams = {}, retries = 5) => {
  // Error if developer forgot to specify an endpoint to send our request to
  if (!endPoint) {
    console.error('callAPI requires you specify an endpoint.');
    return;
  }

  // Error if we've run out of retries.
  if (retries < 0) {
    console.error(
      'No more retries left.',
      { endPoint, messageDataArray, queryParams },
    );
    return;
  }

  // Ensure query parameters have a FB_PAGE_TOKEN value
  const query = Object.assign({ access_token: FB_PAGE_TOKEN }, queryParams);

  // Ready the first message in the array for send.
  const [messageToSend, ...queue] = castArray(messageDataArray);
  const payload = {
    uri: `https://graph.facebook.com/v2.6/me/${endPoint}`,
    qs: query,
    method: 'POST',
    json: messageToSend,
  };

  request(payload, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      // Message has been successfully received by Facebook.
      console.log(
        `Successfully sent message to ${endPoint} endpoint: `,
        JSON.stringify(body),
      );

      // Continue sending payloads until queue empty.
      if (!isEmpty(queue)) {
        callAPI(endPoint, queue, queryParams);
      }
    } else {
      // Message has not been successfully received by Facebook.
      console.error(
        `Failed calling Messenger API endpoint ${endPoint}`,
        res.statusCode,
        res.statusMessage,
        body.error,
        queryParams,
      );

      // Retry the request
      console.error(`Retrying Request: ${retries} left`);
      callAPI(endPoint, messageDataArray, queryParams, retries - 1);
    }
  });
};

const callMessagesAPI = (messageDataArray, queryParams = {}) => (
  callAPI('messages', messageDataArray, queryParams)
);

const callThreadAPI = (messageDataArray, queryParams = {}) => (
  callAPI('thread_settings', messageDataArray, queryParams)
);

module.exports = {
  callMessagesAPI,
  callThreadAPI,
};
