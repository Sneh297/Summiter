const sendResponse = (res, data, status = 200) => {
  if (status >= 400) {
    return res.status(status).json({ error: data });
  }
  return res.status(status).json(data);
};

module.exports = sendResponse;
