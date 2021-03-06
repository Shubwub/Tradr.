const { instance } = require('./axios');
const { getCity } = require('./makeAccount');

const getTraders = async (project_id, filters) => {
  const { data } = await instance.get(`/traders`, {
    params: { project_id, ...filters }
  });

  return data.traders;
};

const getTrader = async username => {
  const { data } = await instance.get(`/traders/${username}`);
  return data.trader;
};

const getTradersOnProject = async project_id => {
  const { data } = await instance.get(`/projects/${project_id}/traders`);
  return data.traders;
};

const getTraderRequests = async trader_username => {
  const { data } = await instance.get(`/requests`, {
    params: { trader_username }
  });
  data.requests.map(async request => {
    request.city = await getCity(request.lat, request.lng);
    return request;
  });

  return data.requests;
};

const replyRequest = async body => {
  await instance.delete('/requests', { data: body });
};

export {
  getTraders,
  getTrader,
  getTraderRequests,
  getTradersOnProject,
  replyRequest
};
