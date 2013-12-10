angular.module('uselessApp')
  // .filter('search', function(search) {
  //   return function (items, input, length, field) {
  //     if(_.isUndefined(input) || input === "")
  //       return {};
  //     return search.inLimit(items,length,
  //            search.field(field,
  //            search.for(input,
  //            search.fair)));
  //   }
  // })
  // .filter('truncate', function () {
  //   return function (text, length, end) {
  //     if (isNaN(length))
  //       length = 10;
  //     if (end === undefined)
  //       end = "...";
  //     if (text.length <= length || text.length - end.length <= length) {
  //       return text;
  //     } else {
  //       return String(text).substring(0, length-end.length) + end;
  //     }
  //   };
  // });

  .filter('search', function() {
    return function (items, input) {
      if (_.isUndefined(input) || input.length < 4) return;

      return _.first(items, 200);

      var terms = input.split(" ");

      var f =  _.filter(items, function(course) {
        return _.some(course, function(value, key) {
          return _.any(terms, function (t) { 
            return _.isArray(value) && value.indexOf(t) != -1; 
          })
        });
      });

      console.log("Mother fucking done")
      console.log(f);
      return f;
    }
  });