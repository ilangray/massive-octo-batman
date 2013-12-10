'use strict';

  // {
  //   title: "Calc 1",
  //   number: "MATH 0011",
  //   professor: "Ming Chow",
  //   description: "This is some stuff about that class that you want to take."
  // },



angular.module('uselessApp')

  .service('search', function() {
    console.log("loading search")

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
      return _.map(list, function(i){
        return assignValue(_.partial(searchSum,searchf), i);
      });
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

    // export some public functions
    return {
      searchFor: searchFor,
      searchField: searchField,
      searchIn: searchIn
    }
  })

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
  })

  .controller('SearchCtrl', function ($scope, $filter, $http) {
    // This holds ALL classes. Every fuckin class. The whole thing
    $http.get('data.json')
      .then(function(res){
        $scope.data = res.data;
      });
    // $scope.results = [
    //   {
    //     title: "Calc 1",
    //     number: "MATH 0011",
    //     professor: "Ming Chow",
    //     description: "This is some stuff about that class that you want to take."
    //   },
    //        {
    //     title: "Calc 2",
    //     number: "MATH 0011",
    //     professor: "Ming Chow",
    //     description: "Blah blah blah."
    //   },
    //        {
    //     title: "Calc 3",
    //     number: "MATH 0011",
    //     professor: "Ming Chow",
    //     description: "This class blows."
    //   }]

    $scope.tabs = [
      {
        tab: "Schedule",
        active:true,
        content: "Section 1",
        partial: "views/partials/schedule.html"
      },
      {
        tab: "Requirements",
        active: false,
        content: "Section 2",
        partial: "views/partials/requirements.html"
      }
    ];

    $scope.activeTab = function(tab) {
      // reset the tabs to false
      angular.forEach(this.tabs, function(t) {
        t.active = false;
      });

      // set clicked tab to true
      tab.active = true;
      
    }

    $scope.activeClass = function(tab) {
      return tab.active === true ? "active" : "";
    }

    $scope.templateUrl = function(tab) {
      return tab.partial;
    }
  })

  .controller('BodyCtrl', function ($scope, $location) {
   
    $scope.bodyClass = function(route) {

    	if (route === $location.path().substr(0)) {
    		return "home";
    	} else {
        return "search"
      }
    }
  })

  .controller('SchedCtrl', function ($scope) {
   
    $scope.days = ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    $scope.hours = ["7AM", "8AM", "9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM"];
  })

  .controller('ReqCtrl', function ($scope) {
    $scope.headers = ["Class", "Status", "Term"];
    $scope.requirements = [
      {
        title:"Class Title",
        status:"Complete",
        term:"Fall 2011"
      },
      {
        title:"Class Title",
        status:"Complete",
        term:"Fall 2011"
      },
      {
        title:"Class Title",
        status:"Complete",
        term:"Fall 2011"
      },
      {
        title:"Class Title",
        status:"Complete",
        term:"Fall 2011"
      },
      {
        title:"Class Title",
        status:"Complete",
        term:"Fall 2011"
      },
      {
        title:"Class Title",
        status:"Complete",
        term:"Fall 2011"
      },
      {
        title:"Class Title",
        status:"Complete",
        term:"Fall 2011"
      }
    ];
  });