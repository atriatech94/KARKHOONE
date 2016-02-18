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
                
                
           
                     push.on('registration', function(data33) {
                             alert(data33.registrationId);
                      //  $.post(base_url+"api/user_reg_id/Attmi3-HasJ00B3-9854NEsIHY",{reg_id:data33.registrationId,user_id:user_data.user_info[0].member_id});
                     });
                   
            }/* end */
}})
.controller('ExitController', function($rootScope) {
    
})
.directive('exitDir' , function (){
		return {
			link: function() {
				/*====================================================*/

                /*====================================================*/
                localStorage.clear();
                quit();
                window.location.hash = "#/select";
                /*====================================================*/
                
            }/* end */
}})
.controller('ReloadController', function($rootScope) {
    window.history.back();
})
