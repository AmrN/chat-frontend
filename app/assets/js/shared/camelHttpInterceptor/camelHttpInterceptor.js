var humps = require('humps');

module.exports = [function() {
  return {
    request: function(config) {
      config.data = humps.decamelizeKeys(config.data);
      config.params = humps.decamelizeKeys(config.params);
      return config;
    },

    response: function(response) {
      response.data = humps.camelizeKeys(response.data);
      return response;
    }
  }
}];
