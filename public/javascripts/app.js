angular.module('shopping',[])
.controller('MainCtrl',[
  '$scope','$http',
  function($scope,$http) {
    $scope.store = [];
    $scope.cart = [];
    $scope.getAll = function() {
			return $http.get('/shopping').success(function(data){
			  console.log(data);
				angular.copy(data, $scope.store);
			});
    };
    $scope.getAll();
    $scope.create = function(candidate) {
			return $http.post('/shopping', candidate).success(function(data){
			  console.log("This is in create function: data -> ", data);
				$scope.store.push(data);
			});
    };
    $scope.dovote = function() {
      angular.forEach($scope.store, function(value,key) {
        if(value.selected) {
          console.log("This is the value: ", value);
          $scope.Uporder(value);
          $scope.cart.push(value);
        }
      });
    }

    $scope.Uporder = function(candidate) {
      return $http.put('/shopping/' + candidate._id + '/Uporder')
        .success(function(data){
        });
    };

    $scope.addItem = function() {
      var newObj = {Name:$scope.formContentProduct,price:$scope.formContentPrice,Url:$scope.formContentUrl,ordered:0};
      $scope.create(newObj);
      $scope.formContentProduct = '';
      $scope.formContentPrice = '';
      $scope.formContentUrl = '';

    }

    $scope.incrementordered = function(candidate) {
      $scope.ordered(candidate);
    };

    $scope.delete = function(candidate) {
      console.log("Deleting Name "+candidate.Name+" ID "+candidate._id);
      $http.delete('/shopping/'+candidate._id)
        .success(function(data){
          console.log("delete worked");
      });
      $scope.getAll();
    };
  }
]);