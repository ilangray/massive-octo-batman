
angular.module('uselessApp')
  .controller('SchedCtrl', function ($scope, schedule) {
  	$scope.classes = [];
    $scope.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    $scope.hours = ["7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM"];
  	$scope.$watch(function(){return schedule.classData;}, function(newVal, oldVal){
  		var course = newVal[newVal.length-1];
  		$scope.classes.push(course);
  	}, true);
  });