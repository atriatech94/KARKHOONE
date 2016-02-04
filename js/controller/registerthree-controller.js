angular.module('myapp')
.controller('RegisterthreeController', function() {
          
})
.directive('registerthreeDir' , function (){
		return {
			link: function() {
				$('body .lpro').addClass("none");
                var files;
                var timeout ;
                var change_evenet ;
				/*====================================================*/
				$(document).ready(function(){
                    
                    if(!localStorage.getItem("user_info_temp")) { window.location.hash = "#/register_one";return false;}
                    var user_info = JSON.parse( localStorage.getItem("user_info_temp") );
                    if(typeof user_info.age === 'undefined'){ window.location.hash = "#/register_two";return false;}
                    
                     /*insert json user_data to hidden input*/
                    
                    $("#datas").val(localStorage.getItem("user_info_temp"));
                    clearTimeout(timeout);

                    $('.main').delegate('.select_image',"click",function(){
                         /*select and show image to user before upload*/
                        if($('.takePictureField').val() ==""){
                            $('.takePictureField').click();
                        }else{
                            src = "img/user.png";
                            $('#user_image_up').attr('src',src);
                            $('#user_image_up').removeClass("user_image_add");
                            $('.select_image img').removeClass("remove_image");
                            $('.takePictureField').val("");
                            return false;
                        }
                    });
                /*====================================================*/
                    var is_snd = 0;
                    $(".upload_image").click(function(event){
                        
                       if(change_evenet !== undefined){
                           
                            if (!isImage($('.takePictureField').val())) {
                                alert('فرمت فایل انتخابی اشتباه است . مجدد تلاش نمایید ');
                                return false;
                            }else{
                                document.addEventListener("deviceready", onDeviceReady, false);
                                function onDeviceReady() 
                                {
                                    
                                   var element = document.getElementById('deviceProperties');
                                    platform = device.platform;
                                    version = device.version;
                                    version = version.split('.');
                                    version = parseInt(version[0]+ version[1]);
                                    if(platform == "Android" && version < 43 ){is_snd = 1;$.event.trigger({ type: "imageResized_firstprofile" });}
                                    else{resize_image(change_evenet,"imageResized_firstprofile");}
                                    
                                }

                            }
                       }else{
                           $.event.trigger({type: 'imageResized_firstprofile' });
                       }
                        
                    });
                /*====================================================*/
                    
                     $('.takePictureField').on("change",function(event){
                         change_evenet = event;
                     });
                    
                /*====================================================*/
                 $(document).on("imageResized_firstprofile", function (event) {
                     
                 
                     $('body .lpro').removeClass("none");
                          var data ;
                     if (event.blob){
                         data = new FormData($(".change_profile_img")[0]);
                         data.append('profile_pic', event.blob);
                         data.append('user_data',$('.user_datas').val());
                     }
                     if(is_snd == 1)
                     {
                         data = new FormData($(".android42_image")[0]);
                     }
                    
                     $.ajax({
                         url: base_url+"api/user_register/Passwd123/",
                         type: 'POST',
                         data: data,
                         async: true,
                         cache: false,
                         contentType: false,
                         processData: false,
                         timeout:60000,
                         
                     }).done(function(data) {
                         /* chechk inset and login user into software */
                         var user_data = JSON.parse(data);
                         
                         if(user_data.msg_code == "1")
                         {
                             user_info.member_id = user_data.member_id ;
                             user_info.picname = user_data.picname ;
                             user_info.passwd = user_data.passwd ;
                             user_data_update = new Array();
                             user_data_update[0] = user_info;
                             init(user_info.member_id);
                             var result_update = JSON.stringify(user_data_update);
                             localStorage.setItem("user_info",result_update);
                             localStorage.setItem("user_id",(user_data_update[0].member_id));
                                  
                             $('body .lpro').addClass("none");
                             window.location.hash = "#/wall";
                         }
                         else if(user_data.msg_code == "2")
                         {
                             $('body .alert .msg').text("کاربری با این ایمیل قبلا ثبت نام کرده است ").parent('.alert').removeClass('none');
                             return false;
                             $('body .lpro').addClass("none");
                         }
                         else if(user_data.msg_code == "1"){
                             $('body .lpro').addClass("none");
                         }

                     }).fail(function(){
                         /*if user cant send data such as no internet access*/
                         $('body .alert .msg').text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent('.alert').removeClass('none'); 
                         $('body .lpro').addClass("none");
                     });
                     
                     return false;
                     
                 });
                    /*====================================================*/
                });
                /*====================================================*/
            }/* end */
}});
function showimagepreview(input) 
    {
        if (input.files && input.files[0]) 
        {
            var filerdr = new FileReader();
            filerdr.onload = function(e) 
            {
                //document.getElementById('user_image_up').src = e.target.result;
                $('#user_image_up').attr('src', e.target.result);
                $('#user_image_up').addClass("user_image_add");
                $('.select_image img').addClass("remove_image");
            }
                
            filerdr.readAsDataURL(input.files[0]);
        }
                       
    }
