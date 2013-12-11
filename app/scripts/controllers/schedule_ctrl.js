
angular.module('uselessApp')
  .controller('SchedCtrl', function ($scope, schedule) {
  	$scope.classes = [];
    $scope.days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    $scope.hours = ["7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM"];

    $scope.validateClasses = function() {
      console.log("test")
    }

    var pairs = function (array, f) {
      for (var i=0;i<array.length-1;i++) {
        for (var j=i+1;j<array.length;j++) {
          f(array[i], array[j]);
        }
      }
    }

    var times = {"mon":"10:00AM-10:50AM","tues":"!","wed":"10:00AM-10:50AM","thurs":"10:00AM-10:50AM","fri":"!"}

    // do the two classes overlap
    var overlap = function(c1, c2) {
      var days = ["mon", "tues", "wed", "thurs", "fri"];

      // converts the time string of the form HH:mm{PM/AM} to an interger representation
      var toInteger = function (str) {
        var parts = str.split(":");
        var hour = parseInt(parts[0]);
        var minutes = parseInt(parts[1].substring(0,2));
        var meridian = parts[1].substring(2, 4);

        var val = hour * 100 + minutes;
        return meridian == "PM" ? val + 1200 : val;
      }

      // StartA > EndB || EndA < StartB
      var _overlap = function (range1, range2) {
        // split into start and end times
        range1 = range1.split("-"); 
        range2 = range2.split("-");

        var start1 = toInteger(range1[0]), end1 = toInteger(range1[1]);
        var start2 = toInteger(range2[0]), end2 = toInteger(range2[1]);

        return !(start1 > end2 || end1 < start2);
      }

      var b = _.all(days, function (day) {
        return _overlap(c1.times[day], c2.times[day]);
      });

      console.log("Overlap found = " + b);

      return b;
    }

    // sets $scope.isDisabled to false if >=2 classes overlap, true otherwise
    var validate = function () {
      console.log("validating...");

      // cant have no classes 
      if ($scope.classes.length == 0) {
        $scope.isDisabled = true;
        return;
      }

      // go find the collisions
      var collision = false;

      pairs($scope.classes, function (c1, c2) {
        collision = collision || overlap(c1, c2);
      })

      $scope.isDisabled = collision;
      console.log($scope.isDisabled);
    }

  	$scope.$watch(function(){return schedule.classData;}, function(newVal, oldVal){
  		
		var views = document.getElementsByClassName('class');
  		for(var i = 0; i < views.length; i++){
	  		views[i].parentNode.removeChild(views[i]);
	  	}
	  	views = document.getElementsByClassName('class');
  		for(var i = 0; i < views.length; i++){
	  		views[i].parentNode.removeChild(views[i]);
	  	}
	  	$scope.classes = newVal;
     	validate();

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
  	}, true);
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
  			var style = "style='position:absolute;top:" + y + "px;height:" + height + "px'";
  			var div = "<div " + style + "class='class' id='" + course.$$hashKey + "'><span class='courseTitle'>" + course.num + "</span></div>"
  			parent.innerHTML = parent.innerHTML + div;
  		}
  		$scope.removeClass = function(index){
  		
            	$scope.classes.remove(index, 0);
        
  		}
  		// Array Remove - By John Resig (MIT Licensed)
		Array.prototype.remove = function(from, to) {
		  var rest = this.slice((to || from) + 1 || this.length);
		  this.length = from < 0 ? this.length + from : from;
		  return this.push.apply(this, rest);
		};

  });