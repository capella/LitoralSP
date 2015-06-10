angular.module('starter.services', [])

.factory('Data', function($http, $ionicLoading) {
  var praias = [];
  var municipios = [];
  return {
    update: function(callback){
      $http.get('http://'+server_url+'/praias.json').then(function(resp) {
        municipios = resp.data.municipios;
        praias = resp.data.praias;
        callback();
      }, function(err) {
        console.error('ERR', err);
          $scope.show = function() {
            $ionicLoading.show({
              template: 'Verifique a sua internet.',
              duration: 1200
            });
          };
      })
    },
    praias: function(id){
      var praias_id = [];
      angular.forEach(praias, function(value, key) {
        if (value.municipioid == id) {
          praias_id.push(value);
        }
      });
      return praias_id;
    },
    municipios: function(){
      return municipios;
    },
    last: function(){
      if (typeof praias[0] !== 'undefined')
        return praias[0].addtime;
      else 
        return 0;
    }
  };
});
