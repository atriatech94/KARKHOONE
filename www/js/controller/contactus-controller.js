angular.module('myapp')
.controller('contactusController', function($scope, $sce) {
  $scope.user_id = localStorage.getItem('user_id');
  $scope.imei = imei;
    
})
.directive('contactDir' , function ($rootScope){
		return {
			link: function(scope) {
				/*====================================================*/
				$(document).ready(function(){
                    var snapper = new Snap({ element: document.getElementById('content345'), disable: 'left'});
                    $("body #content345").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
                });
				/*====================================================*/
                $('#content345').on("submit",".contact_us",function(){
                    
                    var type = $("#type").val().trim();
                    var title = $("#title").val().trim();
                    var text = $("#text").val().trim();
                    
                    console.log(type,title,text);
                    var errors_req = new Array();                        
                    $('#content345 .contact_us .req').each(function(index,element){
                        if($(this).val() == "" || $(this).val() === undefined )
                        {
                            errors_req.push($(this).attr('placeholder'));
                        }
                    });
                    if(errors_req.length > 0)
                    {
                        $('body .alert .msg').text("فیلد  "+errors_req.join()+"خالی است ").parent('.alert').removeClass('none');
                        timeout = setTimeout(function(){ $('body .alert').addClass('none');},5000);
                        return false;
                    }
                    
                    if( type == "null" )
                    {
                        $('body .alert .msg').text("نوع درخواست خود را مشخص کنید . ").parent('.alert').removeClass('none');
                        timeout = setTimeout(function(){ $('body .alert').addClass('none');},5000);
                        return false;
                    }
                     $('body .lpro').removeClass("none");
                    var data_form = $('#content345 .contact_us ').serialize();
                    $.post(base_url+"api/contact_us/aksdhg-dUYwsef2343Y-OOO09228",data_form,function(){
                        $('body .lpro').addClass("none");
                        $('#content345 .contact_us ').trigger('reset');
                        $('.submit_register').attr("type","button");
                        $('body .alert .msg').text("پیام شما با موفقیت ارسال شد .").parent('.alert').removeClass('none');
                        
                    }).fail(function(){
                        $('body .lpro').addClass("none");
                        $('body .alert .msg').text("خطا در ارسال - مجدد تلاش نمایید .").parent('.alert').removeClass('none');
                    });
                    
                   
                    
                });
				/*====================================================*/
                /*====================================================*/

               
                
            }/* end */
}})