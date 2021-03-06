angular.module('myapp')
.controller('settingsController', function($scope, $http) {
   
    $scope.user_info = JSON.parse(localStorage.getItem("user_info"));
    $scope.user_skill = JSON.parse(localStorage.getItem("user_skill"));
    console.log($scope.user_skill);
    $scope.now_year = moment().format('jYYYY');
    $scope.base_url = base_url;
    console.log($scope.user_info);

    $http.get(base_url+"/api_upload/settings_prev/UPssdfdfLo-098UdfsdfYdfdsH-ooesdfdsfWu/" + localStorage.getItem("user_id"))
    .success(function(data){
        if(data.length > 0){
            data.forEach(function(element,index){
                if(element.perm_name == "mobile") $scope.perm_mobile = element;
                else if(element.perm_name == "email") $scope.perm_email = element;
                else if(element.perm_name == "cv") $scope.perm_cv = element;
                else if(element.perm_name == "portfolio") $scope.perm_portfolio = element; 
                else if(element.perm_name == "follower") $scope.perm_follower = element; 
                else if(element.perm_name == "following") $scope.perm_following = element; 
                else if(element.perm_name == "request") $scope.perm_requesting = element; 
                else if(element.perm_name == "notif") $scope.perm_notif = element; 
            });
        // $scope.p_one_detail = data;
       }
    });
    
})
.directive('settingsDir' , function ($rootScope){
		return {
			link: function(scope) {
				/*====================================================*/
				$(document).ready(function(){
                    var snapper = new Snap({ element: document.getElementById('content35'), disable: 'left'});
                    $("body #content35").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});

                    
                });
				/*====================================================*/
                /*$('.setting_link').mousedown(function(event) {
                    switch (event.which) {
                        case 1:
                            alert('Left Mouse button pressed.');
                            break;
                        case 2:
                            alert('Middle Mouse button pressed.');
                            break;
                        case 3:
                            alert('Right Mouse button pressed.');
                            break;
                        default:
                            alert('You have a strange Mouse!');
                    }
                });
                */
				/*====================================================*/
                /*===============================================================================*/

                $(".settings_form").submit(function() {
                    $('body .lpro').removeClass("none");
                    
                    var formData = new FormData($(this)[0]);
                     $.ajax({
                        url: base_url+"api/mobile_permission/UP61237wLo-05h98DssYH-oo234sesWu/"+localStorage.getItem("user_id"),
                        type: 'POST',
                        data: formData,
                        async: true,
                        cache: false,
                        contentType: false,
                        processData: false,
                         
                     }).fail(function(){
                         /*if user cant send data such as no internet access*/
                         $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none');     
                         $('body .lpro').addClass("none");
                     });
                    
                    $.ajax({
                        url: base_url+"api/follower_permission/UP61237wdf4Lo-0o5h98DsYH-oo234sesWu2/"+localStorage.getItem("user_id"),
                        type: 'POST',
                        data: formData,
                        async: true,
                        cache: false,
                        contentType: false,
                        processData: false,
                         
                     }).fail(function(){
                         /*if user cant send data such as no internet access*/
                         $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none');     
                         $('body .lpro').addClass("none");
                     });
                    
                    
                    $.ajax({
                        url: base_url+"api/request_permission/UP6123acs7wdf4Lo-0o5h98DsYH-oo2ee34sesWu2/"+localStorage.getItem("user_id"),
                        type: 'POST',
                        data: formData,
                        async: true,
                        cache: false,
                        contentType: false,
                        processData: false,
                         
                     }).fail(function(){
                         /*if user cant send data such as no internet access*/
                         $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none');     
                         $('body .lpro').addClass("none");
                     });
                       
                    $.ajax({
                        url: base_url+"api/notif_permission/UP61237wdf4Lo-0o5h9as8DsYH-oo234assesWu2/"+localStorage.getItem("user_id"),
                        type: 'POST',
                        data: formData,
                        async: true,
                        cache: false,
                        contentType: false,
                        processData: false,
                         
                     }).fail(function(){
                         /*if user cant send data such as no internet access*/
                         $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none');     
                         $('body .lpro').addClass("none");
                     });
                    
                    $.ajax({
                        url: base_url+"api/following_permission/UP61237wdf4Lo-0o5h98DsYH-oo234sesWu1/"+localStorage.getItem("user_id"),
                        type: 'POST',
                        data: formData,
                        async: true,
                        cache: false,
                        contentType: false,
                        processData: false,
                         
                     }).fail(function(){
                         /*if user cant send data such as no internet access*/
                         $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none');     
                         $('body .lpro').addClass("none");
                     });
                    

                     $.ajax({
                        url: base_url+"api/email_permission/UP61237wdf4Lo-05h98DssYH-oo234sesWu/"+localStorage.getItem("user_id"),
                        type: 'POST',
                        data: formData,
                        async: true,
                        cache: false,
                        contentType: false,
                        processData: false,
                         
                     }).fail(function(){
                        /*if user cant send data such as no internet access*/
                         $('body .lpro').addClass("none");
                         $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none');                   
                     });

                     $.ajax({
                         
                        url: base_url+"api/portfolio_permission/UP61237wmdf4Lo-05h98DssYH-oon9a234sesWu/"+localStorage.getItem("user_id"),
                        type: 'POST',
                        data: formData,
                        async: true,
                        cache: false,
                        contentType: false,
                        processData: false,
                         
                     }).fail(function(){
                        /*if user cant send data such as no internet access*/
                         $('body .lpro').addClass("none");
                         $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none');                   
                     });

                     $.ajax({
                         
                        url: base_url+"api/cv_permission/UP61237wdf4Lo-0o5h98DsYH-oo234sesWu/"+localStorage.getItem("user_id"),
                        type: 'POST',
                        data: formData,
                        async: true,
                        cache: false,
                        contentType: false,
                        processData: false,

                    }).success(function(){
                        $('body .lpro').addClass("none");
                        $('body .alert .msg').text("تنظیمات با موفقیت اعمال شد").parent('.alert').removeClass('none');
                        setTimeout(function(){
                            $('body .alert').addClass('none');
                        },5000);        
                         window.location.hash = "#/settings";
                        return true;                        
                     }).fail(function(){
                        /*if user cant send data such as no internet access*/
                         $('body .lpro').addClass("none");
                         $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none');                   
                     });
                    return false;

                });
                
            }/* end */
}})
/*============================================================================================*/
