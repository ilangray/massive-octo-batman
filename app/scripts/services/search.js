angular.module('uselessApp')

.service('search', function() {
    // Applies f(k,...,k,v) to every leaf in the object
    function flatMap(f, obj){
      if(_.isArray(obj)){
        return _.flatten(_.map(obj, _.partial(flatMap, f)));
      }
      if(_.isObject(obj)){
        return _.flatten(_.map(_.pairs(obj),function(kv){
          return flatMap(_.partial(f,kv[0]),kv[1]);
        }));
      }
      return f(obj);
    }

    // add the value of the search result to the object being searched.
    // it will allow for sorting later.
    function assignValue(searchf, object){
      var result = searchf(object);
      if(_.isUndefined(object.__search)){
        return _.extend({__search:result},object);
      }
      var temp = object;
      temp.__search = object.__search + result;
      return temp;
    }

    function searchSum(searchf, item){
      return _.reduceRight(flatMap(searchf,item),
       function(a,b){return a+b;},
       0);
    }

    function fieldQuery(field,searchf,query){
      var args = _.pairs(arguments);
      var argarr = _.filter(args,function(na){return parseInt(na[0]) > 1});
      // This may be doing more work than needed
      args = _.reduce(argarr,function(base, argpair){base.push(argpair[1]); return base;},[]);
      if(_.contains(args,field)){
        return _.reduce(args,function(base,arg){return _.partial(base,arg)}, _.partial(searchf))();
      }
      return 0;
    }

    // Perform extension and query on list with function
    function searchIn(list, searchf){
      return _.sortBy(_.map(list, function(i){
        return assignValue(_.partial(searchSum,searchf), i);
      }),function(obj){return -obj.__search});
    }

    function searchInLimit(list, limit, searchf){
      return _.take(searchIn(list,searchf),limit);
    }

    // Setup the search
    // returns an object that can be passed in as "searchf"
    function searchFor(query,queryf){
      return _.partial(queryf,query.toLocaleLowerCase());
    }

    // Search in a field of the object
    function searchField(field, searchf){
      return _.partial(fieldQuery,field,searchf);
    }

    ///////////////////////////////////////////////////

    // Should have tail-call optimization
    // Returns a count of characters of query matches in body
    function fairQueryRec(query, prevMatch, qindex, sum, body) {
      if (query === "" || body === "" || query === null) {
        return sum;
      }
      if(query[qindex] === body[0]){
        return fairQueryRec(query,
                            // No word-wrapping bonus
                            qindex===query.length-1?false:true,
                            (qindex + 1) % query.length,
                            prevMatch?2*(sum+1):(sum-1),
                            body.substring(1));
      }
      return fairQueryRec(query,
        false,
        qindex,
        sum,
        body.substring(1));
    }

    // Prepare the body to ensure it is the value and is a string
    // Really: fairQuery(query, key...key...key......value)
    function fairQuery(query){
      var q = _.last(arguments);
      if(!_.isString(q)){
        return 0;
      }
      return fairQueryRec(query,false,0,0,q.toLocaleLowerCase());
    }

    function nopQuery(){return 1;}

    // export some public functions
    return {
      for: searchFor,
      field: searchField,
      in: _.defer(_.debounce(searchIn, 500)),
      inLimit: searchInLimit,
      fair: fairQuery,
      nop: nopQuery
    }
  });
