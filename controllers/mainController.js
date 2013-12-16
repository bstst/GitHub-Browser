app.controller('mainController', function($scope, $http, $routeParams, retriever){
	$scope.route = $routeParams;
	$scope.findUsers = function(){
		if($scope.search){
			retriever.findUsers($scope.search).then(function(data){
				$scope.users = data.items;
			});
		}
	};
	$scope.findRepos = function(){
		if($scope.search){
			retriever.findRepos('user:' + $scope.search).then(function(data){
				$scope.repos = data.items;
			});
		}
	};
});