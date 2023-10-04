const { Router } = require('express');
const router = Router();
const { validateShortUrlId, validateLongUrl } = require('./url.validators');
const urlController = require('./url.controller');
const { catchErrors } = require('../../lib/helpers/errorFormatHelpers');

/**
 * Shortener Module health status
 * @name   get/
 * @route  GET api/v1/url/health-status
 * @desc   Shortener module
 * @api    public
 * @param  {String} / forward slash
 * @return {Object} Message
 */
router.get('/health-check', (req, res) => {
  res.json({ msg: `Url shortener module working on ${process.env.APP_NAME}` });
});

/**
 * @name   url/encode
 * @route  Shortener api/v1/url/encode
 * @desc   Encode a long URl to a short URL
 * @api    public
 * @param  {String}
 * @return {Shortener} `Shortener` instance
 */
router.post('/encode', validateLongUrl(), catchErrors(urlController.encodeUrl));

/**
 * @name   url/decode
 * @route  Shortener api/v1/url/decode
 * @desc   Decode a shor URl to a long URL
 * @api    public
 * @param  {String}
 * @return {Shortener} `Shortener` instance
 */
router.get(
  '/decode/:shortUrlId',
  validateShortUrlId(),
  catchErrors(urlController.decodeUrl)
);

/**
 * @name   url/statistic
 * @route  Shortener api/v1/url/statistic
 * @desc   Get url statistics
 * @api    public
 * @param  {String}
 * @return {Shortener} `Shortener` instance
 */
router.get(
  '/statistic/:shortId',
  validateShortUrlId(),
  catchErrors(urlController.getUrlStatistics)
);

module.exports = router;
