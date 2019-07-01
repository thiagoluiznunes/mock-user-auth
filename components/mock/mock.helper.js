const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

const retrieveRequestToken = async (req) => {
  const authorization = 'authorization';
  let token = req.body.token || req.query.token || req.headers[authorization];
  return token;
}

export default { asyncMiddleware, retrieveRequestToken };
