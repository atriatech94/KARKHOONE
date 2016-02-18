angular.module('myapp')
.controller('TestController', function() {
          
})
.directive('testDir' , function (){
		return {
			link: function() {
				
				/*====================================================*/
				var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    paginationClickable: true
                });
				/*====================================================*/
            }/* end */
}});
