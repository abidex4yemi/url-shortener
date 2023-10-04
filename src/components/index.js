const urlRoutes = require('./url/url.routes');
const urlService = require('./url/url.service');

const componentModule = {
  urlModule: {
    routes: urlRoutes,
    service: urlService,
  },
};

module.exports = componentModule;
