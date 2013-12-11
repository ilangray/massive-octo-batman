
angular.module('uselessApp')
  .controller('SchedCtrl', function ($scope, schedule) {
  	$scope.classes = [];
    $scope.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    $scope.hours = ["7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM"];
  	$scope.$watch(function(){return schedule.classData;}, function(newVal, oldVal){
  		$scope.classes = newVal;
  		angular.forEach($scope.classes, function(item){
  			var times = item.times;
  			angular.forEach(times, function(day, index){
  				if(day !== "!"){
  					var bounds = day.split('-');
  					var upper = bounds[0];
  					var lower = bounds[1];
  					var startY = findY(upper);
  					var endY = findY(lower);
  					var elemHeight = Math.floor(endY-startY);
  					appendClass(startY, elemHeight, item, index);
  				}
  			});
  		});
  		function findY(time){
  			var array = time.split("");
  			var hour = parseInt(time.split(':')[0]);
  			var minutes = parseInt(time.split(':')[1][0] + time.split(':')[1][1]);
  		  	var suffix = time[time.length-2];
  		  	if(suffix === "P" && hour != 12){
  		  		hour += 12;
  		  	}
  		  	var startHour = parseInt($scope.hours[0].substring(0, $scope.hours[0].length-2));
  			var height = document.getElementsByClassName('hour')[0].offsetHeight;
 			var totalOffset = height * (hour - startHour + 1);
 			var minutesOffset =  (minutes/60) * height;
 			return totalOffset + minutesOffset;
  		}
  		function appendClass(y, height, course, day){
  			var weekdays = ["mon", "tues", "wed", "thurs", "fri"];
  			var spot = 0;
  			angular.forEach(weekdays, function(elem, index){
  				if(day === elem) spot = index;
  			});
  			var parent = document.getElementsByClassName('day')[spot];
  			console.log(height);
  			var style = "style='position:absolute;top:" + y + "px;height:" + height + "px'";
  			var div = "<div " + style + "class='class'><span class='courseTitle'>" + course.num + "</span></div>"
  			parent.innerHTML = parent.innerHTML + div;
  		}
  			// var times = courses.times;
	  		// var day_times = [];
	  		// for(var index in times){
	  		// 	console.log(times[index]);
	  		// }
  		
  	}, true);
  });