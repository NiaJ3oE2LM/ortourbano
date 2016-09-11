
angular.module('starter')
.controller('mainCtrl',['$scope', '$http', function($scope, $http){


  $(function () {
    $('#graph').highcharts({
      title: {
         text: '',
      },
     subtitle: {
         text: '',
     },
     xAxis: {
         categories: []
     },
     yAxis: {
         title: {
             text: ''
         },
         plotLines: [{
             value: 0,
             width: 1,
             color: '#808080'
         }]
     },
     legend: {
         layout: 'horizontal',
         align: 'center',
         verticalAlign: 'bottom',
         borderWidth: 0
     },
     series: [{
         name: 'Temperature',
         data: [],
          color: '#d9534f',
         tooltip: {
             valueSuffix: ' °C',
         }
     }, {
         name: 'Light',
         data: [],
         color: '#f0ad4e',
         tooltip: {
             valueSuffix: ' Lux',
         }
     }, {
       name: 'Humidity',
       data: [],
       color: '#5bc0de',
       tooltip: {
           valueSuffix: ' Kg/m^3',
       }
     }, {
       name: 'Gas',
       data: [],
       color: '#5bc0de',
       tooltip: {
           valueSuffix: ' Sm^3',
       }
     }, {
       name: 'Wind',
       data: [],
       color: '#5bc0de',
       tooltip: {
           valueSuffix: ' m/s',
       }
     }]
 });
});

window.date = []
var lastId = 0;
//TODO  imposta chiamata con timeout

function getValue(id){
  if(lastId == id) console.log('nothing to update');
  else {
    $http({
      method: 'GET',
      url: '/garden/'
      }).then(function successCallback(response) {

        //reral time
        lastId = id;
        $scope.temp= response.data[0].temperature;
        $scope.light= response.data[0].brightness;
        $scope.hum= response.data[0].humidity;
        $scope.hum= response.data[0].gas;
        $scope.hum= response.data[0].wind;
        //grafico
        updateGraph(response.data[0]);
        }, function errorCallback(response) {
          console.log(response);
        });
  }
}

function getId(){
  $http({
    method: 'GET',
    url: '/garden/id'
    }).then(function successCallback(response) {
        return(getValue(response.data[0].id));
      }, function errorCallback(response) {
        console.log(response);
      });
    }

function updateHistory() {
  $http({
    method: 'GET',
    url: '/garden/history'
    }).then(function successCallback(response) {

        for(i = 0; i < response.data.length; i++){

            //TODO add series 50 primo colpo
             updateGraph(response.data[i]);
        }
    }, function errorCallback(response) {
          console.log(response);
    });
  }

  function updateGraph (json){
    var chart = $("#graph").highcharts(); //identifica grafico per id
    console.log(json);
    chart.series[0].addPoint(json.temperature);
    chart.series[1].addPoint(json.brightness);
    chart.series[2].addPoint(json.humidity);
    chart.series[3].addPoint(json.gas);
    chart.series[4].addPoint(json.wind);
    window.date.push((JSON.stringify(json.date_time)).substr(12, 6));
    chart.xAxis[0].setCategories(window.date);
  }

//load initial values
getId();
updateHistory();

//refresh
setInterval(getId, 5000);
// setInterval(updateHistory, 5000);

}])
