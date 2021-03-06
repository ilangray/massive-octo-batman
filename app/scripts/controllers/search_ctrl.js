angular.module('uselessApp')
 .controller('SearchCtrl', function ($scope, $filter, $http, schedule) {
    // This holds ALL classes. Every fuckin class. The whole thing

    // get the class data async
    $http({method:'GET',
          url:'data.json',
          cache:true})
      .then(function(res){
        $scope.data = res.data;
      })

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

    $scope.searcher = function(){
      $scope.results = $filter('search')($scope.data,$scope.searchText);
    }

    _.each(['searchText','searchField'],function(thing){
      $scope.$watch(thing,function(){
        $scope.searcher();
      });
    });

    $scope.activeClass = function(tab) {
      return tab.active === true ? "active" : "";
    }

    $scope.templateUrl = function(tab) {
      return tab.partial;
    }
    $scope.addClass = function(result){
      schedule.addClass(result);
    }
  });