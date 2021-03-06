const casual = require('casual');
const times = require('lodash/times');
const { Author, Post } = require('./models');

// Clear DB
const clearAll = async () => {
  await Author.remove({});
  await Post.remove({});
};

// Populate DB
const fixtures = () => {
  casual.seed(11);

  times(10, async () => {
    const author = new Author({
      firstName: casual.first_name,
      lastName: casual.last_name,
    });

    await author.save();

    const post = new Post({
      authorId: author._id,
      title: `A post by ${author.firstName}`,
      text: casual.sentences(3),
    });

    await post.save();
  });
};

const initDB = async () => {
  // Clear Author and Post collections
  await clearAll();
  // Set some initial data
  await fixtures();
};

module.exports = initDB;
