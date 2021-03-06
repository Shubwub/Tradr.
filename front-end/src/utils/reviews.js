const { instance } = require('./axios');

const getReviewsByUsername = async username => {
  const { data } = await instance.get(`/reviews?trader_username=${username}`);
  return data.reviews;
};

const postReview = async body => {
  const { data } = await instance.post(`/reviews`, body);
  return data.review;
};

export { getReviewsByUsername, postReview };
