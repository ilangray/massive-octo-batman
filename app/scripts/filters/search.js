angular.module('uselessApp')

  .filter('search', function() {
    return function (items, input) {
      // note for MJ: search through given items for classes matching the given input

      /* 
        this is just a stub search implementation so we can see that it actually works
        should be replaced with MJ's badass search function(s) 
      */
      var terms = input.split(" ");

      return _.filter(items, function(course) {
        return _.some(course, function(value, key) {
          return _.any(terms, function (t) { 
            return value.indexOf(t) != -1; 
          })
        });
      });
    }
  });