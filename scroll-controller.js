if (Meteor.isClient) {
    var module = angular.module('scroll-demo', ['angular-meteor', 'infinite-scroll']);

    module.controller('ngInfiniteScrollCtrl', ['$scope', '$meteor',
        function($scope, $meteor) {

            var page = 20;

            $meteor.subscribe('images', {
                skip: 0,
                limit: 2 * page
            });

            $scope.images = $meteor.collection(function() {
                return Images.find();
            });

            $scope.loadMore = function() {
                var len = $scope.images.length;
                $meteor.subscribe('images', {
                    skip: len,
                    limit: page
                });
            };

        }]);
}
