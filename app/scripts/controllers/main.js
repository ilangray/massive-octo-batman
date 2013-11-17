'use strict';

angular.module('uselessApp')
  
  .controller('MainCtrl', function ($scope) {
    $scope.results = [
      {
        title: "Calc 1",
        number: "MATH 0011",
        professor: "Ming Chow",
        description: "This is some stuff about that class that you want to take."
      },
      {
        title: "Calc 2",
        number: "MATH 0012",
        professor: "Ming Chow",
        description: "This is some stuff about that class that you want to take."
      },
      {
        title: "Calc 3",
        number: "MATH 0013",
        professor: "Ming Chow",
        description: "This is some stuff about that class that you want to take."
      },
      {
        title: "Calc 1",
        number: "MATH 0011",
        professor: "Ming Chow",
        description: "This is some stuff about that class that you want to take."
      },
      {
        title: "Calc 2",
        number: "MATH 0012",
        professor: "Ming Chow",
        description: "This is some stuff about that class that you want to take."
      },
      {
        title: "Calc 3",
        number: "MATH 0013",
        professor: "Ming Chow",
        description: "This is some stuff about that class that you want to take."
      }
    ];

    $scope.tabs = [
      {
        tab: "Schedule",
        active:true,
        content: "Section 1",
        partial: "views/partials/schedule.html"
      },
      {
        tab: "Requirements",
        active:false,
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
    
  });;