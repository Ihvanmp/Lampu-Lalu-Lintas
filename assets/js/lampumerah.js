var lampumerah = angular.module('lampumerah', []);

lampumerah.controller('lampuMerahCtrl', function($scope, $interval){

	$scope.lamps = [];
	DefaultTimer = 20;
	var LampPosition = ['top','right','bottom','left'];
	var countdown;
	var started = false;
	var redLampDelay = 3;
	var yellowLampDelay = 2;

	for (var i = 0 ; i < 4; i++) {
		var newLamp = {
			id : i,
			position : LampPosition[i],
			status : false,
			timer : 0,
			yellowLampDelay : yellowLampDelay
		}
		$scope.lamps.push(newLamp);
	};

	$scope.start = function(){
		initLampuMerah();
		countdown = $interval(function(){
			for (var i = 0; i < $scope.lamps.length ; i++) {
				if ($scope.lamps[i].status !== 'yellow' ) {
					$scope.lamps[i].timer--;
				};
				if ($scope.lamps[i].status == 'red' && $scope.lamps[i].timer == 0) {
					setToGreen(i);
				};
				if ($scope.lamps[i].status == 'yellow' ) {
					 $scope.lamps[i].yellowLampDelay--;
				};
				if ($scope.lamps[i].status == 'yellow' && $scope.lamps[i].yellowLampDelay == 0) {
					setToRed(i);
					setTimer(i, (DefaultTimer * 3) + (redLampDelay * 3) + (yellowLampDelay * 3) + yellowLampDelay + 1)
				};
				if ($scope.lamps[i].status == 'green' && $scope.lamps[i].timer == 0) {
					setToYellow(i);
				};
			};
		},1000);
		$('#btn-stop').slideDown();
        $('#btn-start').slideUp();
	}
	$scope.stop = function(){
            $interval.cancel(countdown);
            $('#btn-stop').slideUp();
          	$('#btn-start').slideDown();
	}
	
	function setToGreen(key){
		$scope.lamps[key].status = 'green';
		$scope.lamps[key].timer = DefaultTimer;
	}
	function setToYellow(key){
		$scope.lamps[key].status = 'yellow';
	}
	function setToRed(key){
		$scope.lamps[key].status = 'red';
		$scope.lamps[key].yellowLampDelay = yellowLampDelay;
	}
	function setTimer(key, timer){
		$scope.lamps[key].timer = timer;
	}
	function initLampuMerah(){
		if (!started) {
			setToGreen(0);
			setToRed(1);
			setTimer(1, DefaultTimer + redLampDelay + yellowLampDelay );
			setToRed(2);
			setTimer(2, (DefaultTimer * 2) + (redLampDelay * 2) + (yellowLampDelay * 2) );
			setToRed(3);
			setTimer(3, (DefaultTimer * 3) + (redLampDelay * 3) + (yellowLampDelay * 3) );
		};
		started = true;
	}

})

lampumerah.filter('counterValue', function(){
   return function(value){
      if( value < 10){
         return "0" + value;
      }else{
      return  value;
  	}
   }
})