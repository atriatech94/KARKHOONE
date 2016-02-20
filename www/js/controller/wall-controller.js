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
                /*====================================================*/
                var draggable = document.getElementById('home_btn_ref');
                console.log(draggable);
                draggable.addEventListener('touchmove', function(event) {
                    var touch = event.targetTouches[0];
                          
                    // Place element where the finger is
                    draggable.style.left = touch.pageX-25 + 'px';
                    draggable.style.top = touch.pageY-25 + 'px';
                    event.preventDefault();
                }, false);
            }/* end */
}})
.controller('ExitController', function($rootScope) {
    
})
.directive('exitDir' , function (){
		return {
			link: function() {
				/*====================================================*/

                /*====================================================*/
                var user_id = localStorage.getItem("user_id");
                var reg_id = localStorage.getItem("reg_id");
                push.unregister(function() {
                      $.post(base_url+"api/user_unregister/Attmi3-HasJ00B3-9854NEsIHY",{user_id:user_id,reg_id:reg_id});
                }, function() {
                   
                });
                localStorage.clear();
                quit();
                window.location.hash = "#/select";
                /*====================================================*/
                
            }/* end */
}})
.controller('ReloadController', function($rootScope) {
    window.history.back();
});
