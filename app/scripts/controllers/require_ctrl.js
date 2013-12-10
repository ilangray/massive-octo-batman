angular.module('uselessApp')

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