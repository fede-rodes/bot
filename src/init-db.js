const casual = require('casual');
const times = require('lodash/times');
const { Author, Post } = require('./models');

// Clear DB
const clearAll = async () => {
  await Author.remove({});
  await Post.remove({});
};

// Populate DB.
const fixtures = () => {
  casual.seed(11);

  times(10, () => (
    new Author({
      firstName: casual.first_name,
      lastName: casual.last_name,
    }).save().then(author => (
      new Post({
        authorId: author._id, // eslint-disable-line
        title: `A post by ${author.firstName}`,
        text: casual.sentences(3),
      }).save()
    ))
  ));
};

const initDB = async () => {
  // Clear Author and Post collections
  await clearAll();
  // Set some initial data
  await fixtures();
};

module.exports = initDB;
