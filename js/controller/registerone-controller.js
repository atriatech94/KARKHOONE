angular.module('myapp')
.controller('RegisteroneController', function() {
          
})
.directive('registeroneDir' , function (){
		return {
			link: function() {
				
				/*====================================================*/
                
				/*====================================================*/
                var timeout ;
                var user_info = new Object();
                
                if(localStorage.getItem("user_info_temp") !== null)
                {
                    var user_info = JSON.parse( localStorage.getItem("user_info_temp") );
                    console.log(user_info);
                    $('#regform_one #name').val(user_info.name);
                    $('#regform_one #email').val(user_info.email);
                    $('#regform_one #passwd').val(user_info.passwd);
                    $('#regform_one #repasswd').val(user_info.passwd);
                    $('#regform_one #mobile').attr("type","text").val(user_info.mobile).attr("type","number");
                }
                
                
				$(function(){
                    $('#regform_one').on("submit",function(){
                        
                        name = $(this).find("#name").val().trim();
                        email = $(this).find("#email").val().trim();
                        mobile = $(this).find("#mobile").val().trim();
                        passwd = $(this).find("#passwd").val().trim();
                        repasswd = $(this).find("#repasswd").val().trim();
                        
                        clearTimeout(timeout);
                        var errors_req = new Array();                        
                        $('#regform_one .req').each(function(index,element){
                            if($(this).val() == "" || $(this).val() === undefined )
                            {
                                errors_req.push($(this).attr('placeholder'));
                            }
                        });
                        if(errors_req.length > 0)
                        {
                            $('body .alert .msg').text("فیلد های  "+errors_req.join()+"خالی است ").parent('.alert').removeClass('none');
                            timeout = setTimeout(function(){ $('body .alert').addClass('none');},5000);
                            return false;
                        }
                        console.log(isEmail(email));
                        if(!isEmail(email))
                        {
                            $('body .alert .msg').text("ایمیل وارد شده  معتبر نمی باشد").parent('.alert').removeClass('none');
                            timeout = setTimeout(function(){ $('body .alert').addClass('none');},5000);
                            return false;
                        }
                        if(mobile.length != 11)
                        {
                            $('body .alert .msg').text("شماره موبایل باید 11 رقم باشد").parent('.alert').removeClass('none');
                            timeout = setTimeout(function(){ $('body .alert').addClass('none');},5000);
                            return false;
                        }
                        if(passwd.length < 4 || passwd.length > 40)
                        {
                            $('body .alert .msg').text("پسورد باید بین 5 تا 40 کارکتر باشد").parent('.alert').removeClass('none');
                            timeout = setTimeout(function(){ $('body .alert').addClass('none');},5000);
                            return false;
                        }
                        if(passwd != repasswd)
                         {
                            $('body .alert .msg').text("رمز عبور و تکرار آن با هم برابر نیستند").parent('.alert').removeClass('none');
                            timeout = setTimeout(function(){ $('body .alert').addClass('none');},5000);
                            return false;
                        }
                        $('body .lpro').removeClass("none");
                        $.post(base_url+"api/chechk_reg/Passwd123/",{mobile:mobile,email:email},function(data){
                            chech_user = JSON.parse(data);
                            console.log(chech_user);
                            if(chech_user.msg_code == "0")
                            {
                                $('body .alert .msg').text(chech_user.msg_title).parent('.alert').removeClass('none');
                                $('body .lpro').addClass("none");
                                return false;
                            }else if(chech_user.msg_code == "1")
                            {
                                user_info.name = name ;
                                user_info.passwd = passwd;
                                user_info.email = email ;
                                user_info.mobile = mobile;
                                var user_data = JSON.stringify(user_info);
                                localStorage.setItem('user_info_temp',user_data);
                                window.location.hash = "#/register_two" ;
                            
                            }
                        }).fail(function(){
                            $('body .lpro').addClass("none");
                            $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none'); 
                        });
                        
                       
                        return false;
                    });
                    
                });
				/*====================================================*/
                function isEmail(email) {
                    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                    return regex.test(email);
                }
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
            }/* end */
}});
