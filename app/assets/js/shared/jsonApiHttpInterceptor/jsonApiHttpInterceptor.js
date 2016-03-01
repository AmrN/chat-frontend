module.exports = [function() {
  return {
    response: function(response) {
      if (response.data.data) {
        response.data = response.data.data;
      }
      return response;
    }
  }
}];
