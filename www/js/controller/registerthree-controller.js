angular.module("myapp").controller("RegisterthreeController",function(){}).directive("registerthreeDir",function(){return{link:function(){$("body .lpro").addClass("none");var e,a,t;$(document).ready(function(){if(!localStorage.getItem("user_info_temp"))return window.location.hash="#/register_one",!1;var r=JSON.parse(localStorage.getItem("user_info_temp"));if("undefined"==typeof r.age)return window.location.hash="#/register_two",!1;$("#datas").val(localStorage.getItem("user_info_temp")),clearTimeout(e),$(".main").delegate(".select_image","click",function(){return""!=$(".takePictureField").val()?(src="img/user.png",$("#user_image_up").css("background-image","url('"+src+"')"),$("#user_image_up").removeClass("user_image_add"),$(".select_image img").removeClass("remove_image"),$(".takePictureField").val(""),!1):($("#user_image_up").addClass("user_image_add"),$(".select_image img").addClass("remove_image"),$(".takePictureField").click(),void 0)});$(".upload_image").on("click",function(e){if(void 0!==a){if(!isImage($(".takePictureField").val()))return alert("فرمت فایل انتخابی اشتباه است . مجدد تلاش نمایید "),!1;$(".short_info .user_img").addClass("user_img_change"),resize_image(window.URL.createObjectURL(a.target.files[0]),function(e){t=e,$(".takePictureField2").val(t),$.event.trigger({type:"imageResized_firstprofile"})})}else $.event.trigger({type:"imageResized_firstprofile"})}),$(".takePictureField").on("change",function(e){var t=window.URL.createObjectURL(e.target.files[0]);$("#user_image_up").css("background-image","url('"+t+"')"),a=e}),$(document).on("imageResized_firstprofile",function(e){return $("body .lpro").removeClass("none"),$.post(base_url+"api/user_register/Passwd123/",$(".android42_image").serialize()).done(function(e){function a(e){localStorage.setItem("model",device.model),localStorage.setItem("IMEI",e),$.post(base_url+"api/user_imei/Attmi3-HasJ00B3-9854NEsIHY",{user_id:localStorage.getItem("user_id"),model:localStorage.getItem("model"),IMEI:localStorage.getItem("IMEI")})}var t=JSON.parse(e);if("1"==t.msg_code){r.member_id=t.member_id,r.picname=t.picname,r.passwd=t.passwd,localStorage.setItem("user_follower","[]"),localStorage.setItem("user_checked","[]"),localStorage.setItem("user_view","[]"),user_data_update=new Array,user_data_update[0]=r,init(r.member_id);var i=JSON.stringify(user_data_update);localStorage.setItem("user_info",i),localStorage.setItem("user_id",user_data_update[0].member_id),(""==localStorage.getItem("reg_id")||null==localStorage.getItem("reg_id"))&&app1.initialize(),window.plugins.imeiplugin.getImei(a),$("body .lpro").addClass("none"),window.location.hash="#/wall"}else{if("2"==t.msg_code)return $("body .alert .msg").text("کاربری با این ایمیل قبلا ثبت نام کرده است ").parent(".alert").removeClass("none"),!1;"1"==t.msg_code&&$("body .lpro").addClass("none")}}).fail(function(){$("body .alert .msg").text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent(".alert").removeClass("none"),$("body .lpro").addClass("none")}),!1})})}}});