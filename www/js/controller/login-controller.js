angular.module('myapp')
.controller('LoginController', function() {
          
})
.directive('loginDir' , function (){
		return {
			link: function() {
				var timeout;
				/*====================================================*/
				$(function(){
                    
                    if(localStorage.getItem("user_id")){
                        window.location.hash = "#/wall";
                    }
                    /*==================================================*/
                    $('.english_only').keyup(function(){english_only($(this));});
                    /*==================================================*/
                    $("#login_form").on("submit",function(){
                        clearTimeout(timeout);
                        var errors_req = new Array();                        
                        $('#login_form .req').each(function(index,element){
                            if($(this).val() == "" || $(this).val() === undefined )
                            {
                                errors_req.push($(this).attr('placeholder'));
                            }
                        });
                        if(errors_req.length > 0)
                        {
                            $('body .alert .msg').text("یک یا چند فیلد خالی است ").parent('.alert').removeClass('none');
                            timeout = setTimeout(function(){$('body .alert').addClass('none');},5000);
                            return false;
                        }
                        $('body .lpro').removeClass("none");
                        var user = $("#user").val();
                        var pass = $("#pass").val();
                        /*-------------------send user-pass------------------*/
                        $.post(base_url+"api/user_login/Attmi3-HasJ00B3-9854NEsIHY",{user:user,pass:pass},function(data,status,xhr){
                            
                            var user_data = JSON.parse(data);
                           
                            if(user_data.msg_code == "0")
                            {
                                $('body .lpro').addClass("none");
                                $('body .alert .msg').text("نام کاربری و رمز عبور اشتباه است").parent('.alert').removeClass('none');
                            }
                            else if(user_data.msg_code == "2"){
                                $('body .lpro').addClass("none");
                                $('body .alert .msg').text("حساب کاربری شما غیرفعال شده است").parent('.alert').removeClass('none');
                            }
                            else if(user_data.msg_code == "1")
                            {
                                var user_info = JSON.stringify(user_data.user_info);
                                var city = JSON.stringify(user_data.city);
                                var state = JSON.stringify(user_data.state);
                                var user_skill = JSON.stringify(user_data.user_skill);
                                var follower = JSON.stringify(user_data.follower);
                                var checked = JSON.stringify(user_data.checked);
                                var view = JSON.stringify(user_data.view);

                                var info = JSON.stringify(user_data.info);
                                var followers = JSON.stringify(user_data.followers);
                                localStorage.setItem("info",info);
                                localStorage.setItem("followers",followers);
                                
                                localStorage.setItem("user_info",user_info);
                                localStorage.setItem("user_id",user_data.user_info[0].member_id);
                                 if(localStorage.getItem("reg_id") == "" || localStorage.getItem("reg_id") == null )
                                {
                                   app1.initialize();
                                }
                                localStorage.setItem("city",city);
                                localStorage.setItem("state",state);
                                localStorage.setItem("user_skill",user_skill);
                                localStorage.setItem("user_follower",follower);
                                localStorage.setItem("user_checked",checked);
                                localStorage.setItem("user_view",view);
                                window.plugins.imeiplugin.getImei(callback1);
                                function callback1(imei) {
                                     localStorage.setItem("model",device.model);
                                     localStorage.setItem("IMEI",imei);
                                     $.post(base_url+"api/user_imei/Attmi3-HasJ00B3-9854NEsIHY",{user_id:localStorage.getItem("user_id"),model:localStorage.getItem("model"),IMEI:localStorage.getItem("IMEI")});      
                                }
      
                                
                                $('body .lpro').addClass("none");

                                init(user_data.user_info[0].member_id);
                                
                                window.location.hash = "#/wall";
                            }
                            
                        }).fail(function(){
                            
                            $('body .lpro').addClass("none");
                            $('body .alert .msg').text("خطا در اتصال - مجدد تلاش نمایید ").parent('.alert').removeClass('none');
                            timeout = setTimeout(function(){$('body .alert').addClass('none');},5000);
                            return false;
                        }).always(function(data,status) {
                            if(status == "timeout"){
                                $('body .lpro').addClass("none");
                                $('body .alert .msg').text("خطا در اتصال - مجدد تلاش نمایید ").parent('.alert').removeClass('none');
                                timeout = setTimeout(function(){$('body .alert').addClass('none');},5000);
                                return false;
                            }
                        })
                        return false;
                    });
                    /*end login submit*/
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
                /*====================================================*/
				/*====================================================*/
            }/* end */
}});
