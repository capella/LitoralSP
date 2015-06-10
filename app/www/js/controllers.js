angular.module('starter.controllers', [])

.controller('MunicipiosCtrl', function($scope, Data) {
  Data.update(function(){
    $scope.municipios = Data.municipios();
  });
  $scope.Refresh = function() {
    Data.update(function(){
      $scope.municipios = Data.municipios();
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
})

.controller('PraiaCtrl', function($scope, $stateParams, Data) {
  $scope.praias = Data.praias($stateParams.id);
})

.controller('InfoCtrl', function($scope, Data) {
  $scope.addtime = Data.last();
});


