angular.module('uselessApp')
  .filter('search', function(search) {
    return function (items, input) {
      if(_.isUndefined(input) || input === "")
        return {};
      console.log(field)
      var results = search.in(results,
                search.field("prof",
                search.for(input,
                search.fair)));
      results = _.map(results,function(obj){
        obj.__search = obj.__search * 2;
        return obj;
      })
      results = search.in(items,
             search.field("tokens",
             search.for(input,
             search.word)));
      return results;
    }
  })
  .filter('truncate', function () {
    return function (text, length, end) {
      if (isNaN(length))
        length = 10;
      if (end === undefined)
        end = "...";
      if (text.length <= length || text.length - end.length <= length) {
        return text;
      } else {
        return String(text).substring(0, length-end.length) + end;
      }
    };
  });