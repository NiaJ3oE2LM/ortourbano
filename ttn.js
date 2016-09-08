var ttn = require('ttn'),
  db = require('./mysql.js');

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
var json = JSON.parse(msg.fields.message);
  console.log(json);
  //TODO store data in db
  db.uploadAll(json, function(err, data){
    if (err) console.log(data);
    else console.log('db up to date');
  });

});
