const { instance } = require('./axios');

const uploadAvatar = async (trader, username, avatar_ref) => {
  await instance.patch(`/${trader ? 'traders' : 'users'}/${username}`, {
    avatar_ref
  });
};

export { uploadAvatar };
