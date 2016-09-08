
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
         categories: ['Jan', 'Feb', 'Mar']
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
     tooltip: {
         valueSuffix: '°C'
     },
     legend: {
         layout: 'horizontal',
         align: 'center',
         verticalAlign: 'bottom',
         borderWidth: 0
     },
     series: [{
         name: 'Temperature',
         data: []
     }, {
         name: 'Humidity',
         data: []
     }, {
         name: 'Light',
         data: []
     }]
 });
});

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
        $scope.hum= response.data[0].humidity
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
    chart.series[0].addPoint(json.temperature);
    chart.series[1].addPoint(json.humidity);
    chart.series[2].addPoint(json.brightness);
  }

//load initial values
getId();
updateHistory();

//refresh
setInterval(getId, 5000);
// setInterval(updateHistory, 5000);

}])
