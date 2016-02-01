angular.module('myapp')
.controller('ruleController', function($scope, $sce) {
   show_anim();
    $.get(base_url+"/api_upload/rule_karkhaneh/UsfasdfgPLo-09sdf56ghs32UYH-oofsdssdfadfgu",function(datas){
        hide_anim();
        console.log(datas);
        $scope.rule = JSON.parse(datas);
        $scope.rule1 = $sce.trustAsHtml($scope.rule[0].text);
        
    }).fail(function(){
        $(".one_ids").next('.refresh_loading').show();
    });
    
})
.directive('ruleDir' , function ($rootScope){
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
