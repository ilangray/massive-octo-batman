angular.module('uselessApp')

.service('schedule', function() {
    var classData = [];
    function addClass(course){
      if(!_.contains(classData, course)){
        console.log("adding class " + course.name);
        classData.push(course);
      }
      else console.log("error");
    }
    return {
      addClass:addClass,
      classData:classData
    }
  });
