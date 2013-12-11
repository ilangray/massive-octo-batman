angular.module('uselessApp')
  .filter('search', function(search) {
    return function (items, input, field) {
      if(_.isUndefined(input) || input === "")
        return {};
      field = field || 'tokens'
      console.log(field)
      return search.in(items,
             search.field(field,
             search.for(input,
             search.word)));
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