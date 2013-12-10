angular.module('uselessApp')
  .filter('search', function(search) {
    return function (items, input, length, field) {
      if(_.isUndefined(input) || input === "")
        return {};
      return search.inLimit(items,length,
             search.field(field,
             search.for(input,
             search.fair)));
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