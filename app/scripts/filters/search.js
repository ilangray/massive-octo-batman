angular.module('uselessApp')
  .filter('search', function() {
    return function (items, input) {
      // note for MJ: search through given items for classes matching the given input

      /* 
        this is just a stub search implementation so we can see that it actually works
        should be replaced with MJ's badass search function(s) 
      */
      if(_.isUndefined(input))
        return {};
      return items;
    }
  });