angular.module('myapp')
.controller('ForgetpassController', function() {
          
})
.directive('forgetpassDir' , function (){
		return {
			link: function() {
				var timeout;
                var user;
				/*====================================================*/
				$(function(){
                    $("#forgetpass_form").on("submit",function() {
                           
                        if($("#user").val()=="")
                        {
                            $('body .alert .msg').text("فیلد نام کاربری خالی است ").parent('.alert').removeClass('none');
                            return false;
                        }
                        $('body .lpro').removeClass("none");
                        
                        $.post(base_url+"api/send_user_code/",{user:$("#user").val()},function(data){
                            user_data = JSON.parse(data);
                                if(user_data.msg_code == "0")
                                {
                                    $('body .lpro').addClass("none");
                                    $('body .alert .msg').text("کاربری با این مشخصات در سیستم موجود نمی باشد ").parent('.alert').removeClass('none');
                                    return false;
                                }else if(user_data.msg_code == "1"){
                                    
                                    $("#forgetpass_form").addClass("none");
                                    $("#reset_pass_form").removeClass("none");
                                    $('body .lpro').addClass("none");
                                    
                                    var text = " کد بازیابی رمز برای ";
                                    if(user_data.email != "null"){ text +=" پست الکترونیک "+user_data.email;}
                                    if(user_data.mobile != "null"){text +=" و شماره همراه "+user_data.mobile;}
                                    text +="ارسال شد";
                                    localStorage.setItem("user_id",user_data.member_id);
                                    $('body .alert .msg').text(text).parent('.alert').removeClass('none');
                                    
                                }
                        }).fail(function(){
                            
                            $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none');  
                        });
                        return false;
                    });
                /*====================================================*/
                $('#reset_pass_form').on('submit',function(){
                    $('body .lpro').removeClass("none");
                    if($('#code').val() == "")
                    {
                        $('body .alert .msg').text("فیلد کد خالی است").parent('.alert').removeClass('none');
                        return false;
                    }
                    $.post(base_url+"api/reset_passwd/Passwd123/",{code:$("#code").val(),user:localStorage.getItem("user_id")},function(data){
                                
                        chech_res = JSON.parse(data);   
                        if(chech_res.msg_code == "0")
                        {
                            $('body .lpro').addClass("none");
                            $('body .alert .msg').text("کد وارد شده نا معتبر است").parent('.alert').removeClass('none');
                                  
                        }
                        else if(chech_res.msg_code == "1")
                        {
                            $('body .lpro').addClass("none");
                            $('#reset_pass_form').addClass("none");
                            $('#reset_form').removeClass("none");
                                
                        }
                        else if(chech_res.msg_code == "2")
                        {
                            $('body .lpro').addClass("none");
                            $('body .alert .msg').text("اکانت شما به دلیل درخواست متعدد برای بازیابی رمز عبور به مدت 24 ساعت بلاک شده است ").parent('.alert').removeClass('none');
                        }
                    }).fail(function(){
                        $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none');  
                    });
 
                    return false;
                });
         /*====================================================*/
                $('#reset_form').on('submit',function(){
                    var pass = $('#pass').val();
                    var repass = $('#repass').val();
                    if(pass=="" || repass=="" || pass === undefined || repass === undefined)
                    {
                        $('body .alert .msg').text("یک یا چند فیلد خالی است").parent('.alert').removeClass('none');
                        return false;
                    }
                    if(pass!=repass)
                    {
                        $('body .alert .msg').text("کلمه ی عبور و تکرار کلمه ی عبور باید یکسان باشد .").parent('.alert').removeClass('none');
                        return false;
                    }
                    if(pass.length < 5 )
                    {
                        $('body .alert .msg').text("کلمه ی عبور حداقل باید 5 کارکتر باشد .").parent('.alert').removeClass('none');
                        return false;
                    }
                    
                    $('body .lpro').removeClass("none");
                     $.post(base_url+"api/set_new_passwd/Passwd123/",{ new_pass : pass , user:localStorage.getItem("user_id") },function(data){
                         $('body .lpro').addClass("none");
                         $('body .alert .msg').text("رمز عبور شما با موفقیت تغییر پیدا کرد").parent('.alert').removeClass('none');
                         $('#reset_form').addClass("none");
                         setTimeout(function(){window.location.hash = "#/wall";},5000);
                         
                         
                     }).fail(function(){
                         $('body .lpro').addClass("none");
                         $('body .alert .msg').text("عدم برقراری اطلاعات با سرور . مجدد تلاش نمایید .").parent('.alert').removeClass('none');
                     });
                    return false;
                    
                });
         /*====================================================*/
                    $( ".show_passwd" ).click(function() {
                       
                        if($(this).prev('input').attr("type") == "password"){
                            $(this).prev('input').attr("type","text");
                            $(this).addClass('hide_passwd');
                        }else{
                            $(this).prev('input').attr("type","password");
                            $(this).removeClass('hide_passwd');
                        }
                    });
                });
                
            }/* end */
}});
