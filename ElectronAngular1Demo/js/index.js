'use strict';

var electronAngDemoModule = angular.module('electronAngDemo', []);

electronAngDemoModule.controller('mainCtrl', function($scope) {
    $scope.users = [];

    const root = 'http://jsonplaceholder.typicode.com';
    $.ajax({
        url: root + '/users',
        method: 'GET'
      }).then(function(data) {
        $scope.users = data;
      })
      .error((error) => {
        console.log(error);
    });
});