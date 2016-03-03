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
                var image_resize;
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
                            $('#user_image_up').addClass("user_image_add");
                            $('.select_image img').addClass("remove_image");
                            $('.takePictureField').click();
                            
                        }else{
                            src = "img/user.png";
                            $('#user_image_up').css('background-image',"url('"+src+"')");
                            $('#user_image_up').removeClass("user_image_add");
                            $('.select_image img').removeClass("remove_image");
                            $('.takePictureField').val("");
                            //$('.takePictureField').click();
                            return false;
                        }
                    });
                    
                     
                /*====================================================*/
                    var is_snd = 0;
                    $(".upload_image").on("click",function(event){
                        
                       if(change_evenet !== undefined){
                           
                            if (!isImage($('.takePictureField').val())) {
                                alert('فرمت فایل انتخابی اشتباه است . مجدد تلاش نمایید ');
                                return false;
                            }else{
                                $('.short_info .user_img').addClass("user_img_change");
                                resize_image(window.URL.createObjectURL(change_evenet.target.files[0]),function(dataUri){
                                    image_resize = dataUri;
                                    $('.takePictureField2').val(image_resize);
                                    $.event.trigger({ type: "imageResized_firstprofile"});
                                });
                            }
                       }else{
                           $.event.trigger({type: 'imageResized_firstprofile' });
                       }
                        
                    });
                /*====================================================*/
                     $('.takePictureField').on("change",function(event){
                         var src = window.URL.createObjectURL(event.target.files[0]);
                         $('#user_image_up').css('background-image',"url('"+src+"')");
                         change_evenet = event;
                     });
                    
                /*====================================================*/
                 $(document).on("imageResized_firstprofile", function (event) {

                     $('body .lpro').removeClass("none");
                     $.post(base_url+"api/user_register/Passwd123/" ,$('.android42_image').serialize())
                     .done(function(data) {
                         var user_data = JSON.parse(data);
                         
                         if(user_data.msg_code == "1")
                         {
                             user_info.member_id = user_data.member_id ;
                             user_info.picname = user_data.picname ;
                             user_info.passwd = user_data.passwd ;
                     
                             
                             localStorage.setItem("user_follower","[]");
                             localStorage.setItem("user_checked","[]");
                             localStorage.setItem("user_view","[]");
                             
                             user_data_update = new Array();
                             user_data_update[0] = user_info;
                             init(user_info.member_id);
                             var result_update = JSON.stringify(user_data_update);
                             localStorage.setItem("user_info",result_update);
                             localStorage.setItem("user_id",(user_data_update[0].member_id));
                             
                              if(localStorage.getItem("reg_id") == "" || localStorage.getItem("reg_id") == null )
                                {
                                   app1.initialize();
                                }
                              window.plugins.imeiplugin.getImei(callback1);
                                function callback1(imei) {
                                     localStorage.setItem("model",device.model);
                                     localStorage.setItem("IMEI",imei);
                                     $.post(base_url+"api/user_imei/Attmi3-HasJ00B3-9854NEsIHY",{user_id:localStorage.getItem("user_id"),model:localStorage.getItem("model"),IMEI:localStorage.getItem("IMEI")});
                                           
                               }        
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

