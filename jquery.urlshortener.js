 (function($,window) {
  "use strict";
  
  window.pdogs = window.pdogs || {};
  pdogs.urlshortener = function() {
  var
  _bitlyAccessToken = '<YOUR BITLY ACCESS_TOKEN HERE>',
  _bitlyShortDomain = 'j.mp',
  _module = { shorten: shorten };
  return _module;
  
  function shorten(longUrl, sync) {
  var p = $.Deferred();
  if (typeof longUrl === 'undefined' || !longUrl || !longUrl.length) {
  p.reject({ error: 'Invalid/Empty URI' });
  return p.promise();
  }
  
  var
  encodedLongUrl = encodeURIComponent(decodeURIComponent(longUrl)),
  params = 'access_token=' + _bitlyAccessToken
  + '&longUrl=' + encodedLongUrl
  + '&domain=' + _bitlyShortDomain
  + '&format=json',
  r = {
  type: 'GET',
  url: 'https://api-ssl.bitly.com/v3/shorten?' + params,
  headers: {
  'Accept': 'application/json'
  },
  async: !sync
  };
  jQuery.support.cors = true;
  $.ajax(r)
  .done(function(response) {
        if (response.status_code != 200) p.reject({ error: response.status_txt });
        else p.resolve({ shortUrl: response.data.url, shortUrlImg: response.data.url + '.qrcode' });
        })
  .fail(function(xhr,textStatus, error) {
        var m = error.message ? error.message : error;
        p.reject({ error: 'bitly] ' + textStatus + ': ' + m });
        });
  return p.promise();
  }
  }();
  
  })(jQuery,window);

