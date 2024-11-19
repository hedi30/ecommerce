module.exports.responseReture = (res, status, data) => {
  res.status(status).json({
    data,
  });
};
