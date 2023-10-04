exports.sanitizeUrl = (req, res, next) => {
  req.body.longUrl = req.body.longUrl.replace(/\/+$/, '');
  return next();
};
