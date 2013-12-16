app.controller('userController', function($scope, $http, $routeParams, retriever){
	$scope.route = $routeParams;
	$scope.loadUserRepos = function(){
		retriever.findRepos('user:' + $routeParams.userId).then(function(data){
			$scope.repos = data.items;
		});
	};
});