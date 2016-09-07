var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : '64.137.209.170', //127.0.0.1  nel server
  user     : 'bioedison',
  password : 'vrfablabintel',
  database : 'intelmaker'
});

exports.getHistory = function (callback){
  //IDEA per fare il grafico scarica gli ultimi 10 valori
  var sql="SELECT * FROM bioedison WHERE id BETWEEN 0 AND 10";
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}

exports.getId = function (callback){
  //IDEA per fare il grafico scarica gli ultimi 10 valori
  var sql="SELECT id FROM bioedison WHERE id = (SELECT max(id) FROM bioedison)";
  connection.query(sql, function(err, result){

    if(err) callback(err, null);
    else callback(null, result);

  });
}

exports.uploadAll = function (values, callback){

    var sql="INSERT INTO bioedison (time, temperature, humidity, light, water) VALUES (SYSDATE(),"+values[0]+","+values[1]+","+values[2]+","+values[3]+")";
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
