var myWidget = angular.module('myWidget', []);

myWidget.directive('myimageonload', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('load', function() {
                // alert('image is loaded');
                $("#main-icon-area").css("opacity", 1);
            });
        }
    };
});

myWidget.directive('myrepeatonload', function() {
	return function(scope, element, attrs) {
		if (scope.$last) {
			// console.log("done");
            $("#widget-bottom-box").toggleClass("ready");


		}
	}
});
var apiURL = "http://query.yahooapis.com/v1/public/yql?q=select%20item%20from%20weather.forecast%20where%20location%3D%2222102%22&format=json";
function myController($scope, $http) {
	// Simple GET request example:
	$http({
	  method: 'GET',
	  url: apiURL
	}).then(function successCallback(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    console.log("success");
	    var data = response.data;
	    if (!data) {
	    	alert("something goes wrong!");
	    	return;
	    }

	    var item = data.query.results.channel.item;

	    //get the name of the location
	    var words = item.title.split(" ");
		$scope.widgetTitle = words[2]+words[3];

	    //get current temperature and description
	    var condition = item.condition;
	    $scope.currentTemp = condition.temp;
	    $scope.conditionDescrp = condition.text;

	    //use regex to fetch the img src of the icon
	    var description = item.description;	    
	    var regex = /<img[^>]+src="(http:\/\/[^">]+)"/g;
		$scope.iconSrc = regex.exec(description)[1];

		//get the forecast info
		var forecast = item.forecast;
		$scope.forecast = [];
		for (var i = 0; i < forecast.length; i++) {
			$scope.forecast[i] = {};
			$scope.forecast[i].day = forecast[i].day;
			$scope.forecast[i].high = forecast[i].high;
			$scope.forecast[i].low = forecast[i].low;
		}
		// document.getElementById("result").innerHTML = description; 
	  }, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    console.log("fail");
	  });
}