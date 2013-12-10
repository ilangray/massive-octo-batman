angular.module('uselessApp')


  .controller('BodyCtrl', function ($scope, $location) {
   
    $scope.bodyClass = function(route) {

    	if (route === $location.path().substr(0)) {
    		return "home";
    	} else {
        return "search"
      }
    }
  });