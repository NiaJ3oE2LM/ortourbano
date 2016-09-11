var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '64.137.209.170', //127.0.0.1  nel server
  user     : 'bioedison',
  password : 'vrfablabintel',
  database : 'intelmaker'
});

exports.getHistory = function (callback){
  var sql="SELECT * FROM bioedison WHERE id between (SELECT (max(id)-50) FROM bioedison) and (SELECT max(id) FROM bioedison)";
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}

exports.getId = function (callback){
  var sql="SELECT id FROM bioedison WHERE id = (SELECT max(id) FROM bioedison)";
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}

exports.uploadAll = function (json, callback){

    var sql="INSERT INTO bioedison (date_time, temperature, humidity, brightness) VALUES (SYSDATE(),"+json.temp+","+json.hum+","+json.light+")";
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}

exports.getValue = function (callback){
  //IDEA imposta time stamp ddel db
  var sql="SELECT * FROM bioedison WHERE id = (SELECT max(id) FROM bioedison)"; //TODO controlla slelect valore unico
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}
