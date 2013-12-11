angular.module('uselessApp')

.service('schedule', function() {
    var classData = [];
    function addClass(course){

      if(!hasBeenAdded(course)) classData.push(course);
      else console.log("error");
      console.log(classData);
    }
    function hasBeenAdded(course){
      for(var index in classData){
        var identifier = classData[index].$$hashKey;
        if(classData.$$hashKey === identifier) return true;
      }
      return false;
    }
    return {
      addClass:addClass,
      classData:classData
    }
  });
