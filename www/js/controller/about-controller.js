angular.module('myapp')
.controller('aboutController', function($scope, $sce) {
   
    $.get(base_url+"/api_upload/about_karkhaneh/UsfasdfgPLo-09sdf56ghsf8UYH-oofsdsadfgu",function(datas){
                        
                        console.log(datas);
                        $scope.about = JSON.parse(datas);
                        $scope.about1 = $sce.trustAsHtml($scope.about[0].text);

                    }).fail(function(){
                        $(".one_ids").next('.refresh_loading').show();
                    });
    
})
.directive('aboutDir' , function ($rootScope){
		return {
			link: function(scope) {
				/*====================================================*/
				$(document).ready(function(){
                    var snapper = new Snap({ element: document.getElementById('content35'), disable: 'left'});
                    $("body #content35").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
                });
				/*====================================================*/
               
				/*====================================================*/
                   /*===============================================================================*/

               
                
            }/* end */
}})
/*============================================================================================*/
