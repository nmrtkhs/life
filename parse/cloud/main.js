
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  Parse.Cloud.httpRequest({
    url: 'http://www.shigotonavi.co.jp/api/search/',
    params: {
        key: "7e10c3a89d87cc92e20bd2b537ccccd2",
        spc: request.params.spc,
    },
    success: function(httpResponse) {
      console.log(httpResponse.text);
      response.success(httpResponse.text);
    },
    error: function(httpResponse) {
      console.error('Request failed with response code ' + httpResponse.status);
    }
  });
});
