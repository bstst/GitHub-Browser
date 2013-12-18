var app = angular.module('app', [
	'ngRoute'
]);

app.config(['$routeProvider', '$locationProvider',
	function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'partials/search.html',
				controller: 'mainController'
			})
			.when('/:userId', {
				templateUrl: 'partials/repos.html',
				controller: 'userController'
			})
			.when('/:userId/:repoId*', {
				templateUrl: 'partials/repo.html',
				controller: 'repoController'
			})
		;
	}]
);

app.factory('retriever', function($http, $q){
	var proxy = 'proxy.php?url=';
	var base = 'https://api.github.com/';
	var request = function(path, query){
		var defer = $q.defer();
        var url = (proxy ? proxy + encodeURIComponent(base + path) : base + path) + encodeURIComponent(query || '');
		$http.get(url, {cache: true}).success(function(data){
			defer.resolve(data);
		}).error(function(data){
			defer.reject('error: ' + data);
		});
		return defer.promise;
	};
	return {
		findUsers: function(q){
			return request('search/users?q=', q);
		},
		findRepos: function(q){
			return request('search/repositories?q=', q);
		},
		getRepo: function(q){
			return request(q);
		}
	}
});