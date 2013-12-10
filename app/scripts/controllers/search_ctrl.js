angular.module('uselessApp')
 .controller('SearchCtrl', function ($scope, $filter) {
    // This holds ALL classes. Every fuckin class. The whole thing
    $scope.results = [
      {
        title: "Calc 1",
        number: "MATH 0011",
        professor: "Ming Chow",
        description: "This is some stuff about that class that you want to take."
      },
           {
        title: "Calc 2",
        number: "MATH 0011",
        professor: "Ming Chow",
        description: "Blah blah blah."
      },
           {
        title: "Calc 3",
        number: "MATH 0011",
        professor: "Ming Chow",
        description: "This class blows."
      },

      ]

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
  });