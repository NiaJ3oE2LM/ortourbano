var ttn = require('ttn'),
  db = require('mysql.js');

var appEUI = '70B3D57ED0000669';
var accessKey = 'tFLz+J8NvTlp01annRnNBi3h8GqYmHhwzTxmdSbZjiA=';
var client = new ttn.Client('staging.thethingsnetwork.org', appEUI, accessKey);

client.on('connect', function() {
  console.log('[DEBUG]', 'Connected');
});

client.on('error', function (err) {
  console.error('[ERROR]', err.message);
});

client.on('activation', function (e) {
  console.log('[INFO] ', 'Activated: ', e.devEUI);
});

client.on('uplink', function (msg) {
  console.info('[INFO] ', 'Uplink: ' + JSON.stringify(msg, null, 2));
  console.log(msg);
  //TODO store data in db

  //db.uploadAll();//object values

});
