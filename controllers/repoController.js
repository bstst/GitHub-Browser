app.controller('repoController', function($scope, $http, $routeParams, retriever){
	$scope.route = $routeParams;
	$scope.loadRepoPath = function(){
		var path = $routeParams.repoId.replace(/^\/|\/$/g, '').split('/');
		var repoId = path.shift();
		var url = 'repos/' + $routeParams.userId + '/' + repoId + '/contents/' + (path.length ? path.join('/') + '?ref=master' : '');
		retriever.getRepo(url).then(function(data){
			$scope.repo = data;
			if(data.content){
				// magic base64 to utf8 handling
				$scope.content = UTF8ArrToStr(base64DecToArr(data.content.replace(/[\r\n\s]/g, '')));
			}
		});
	};
});