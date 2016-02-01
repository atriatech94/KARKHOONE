angular.module('myapp')
.controller('WallController', function() {
          
})
.directive('wallDir' , function (){
		return {
			link: function() {
				/*====================================================*/
                var snapper = new Snap({ element: document.getElementById('content4'), disable: 'left'});
                $("body #content4").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
				/*====================================================*/
				localStorage.setItem("user_info_temp",null);
            }/* end */
}})
.controller('ExitController', function($rootScope) {
    for (var prop in $rootScope) {
        if (prop.substring(0,1) !== '$') {
            delete $rootScope[prop];
        }
    }
    exit();
});
