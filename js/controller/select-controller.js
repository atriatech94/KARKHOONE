angular.module('myapp')
.controller('SelectController', function($rootScope) {


 //      if(localStorage.getItem("user_id")){
	// 		window.location.hash = "#/wall";

	// }
})
.directive('selectDir' , function ($rootScope){
		return {
			link: function() {
				
                for (var prop in $rootScope) {
                    if (prop.substring(0,1) !== '$') {
                        delete $rootScope[prop];
                    }
                }
                /*====================================================*/
                height();
				/*====================================================*/
            }/* end */
}});
