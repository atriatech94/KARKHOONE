angular.module("myapp").controller("myprofileController",function(e){e.user_skill=JSON.parse(localStorage.getItem("user_skill")),e.count_s1=0,e.count_s2=0,null!=e.user_skill&&e.user_skill.length>0&&e.user_skill.forEach(function(t,a){"0"==t[2]?e.count_s1++:e.count_s2++}),e.user_info=JSON.parse(localStorage.getItem("user_info")),e.now_year=moment().format("jYYYY"),e.base_url=base_url,$.get(base_url+"/api_upload/get_ffc/UPssdsdffdfLo-098UdfsdfYdsdffdsH-ooesdfdsfWu/"+localStorage.getItem("user_id"),function(t){var a=JSON.parse(t);e.$apply(function(){e.info=a.info,e.followers=a.followers,e.user_info=a.infos,localStorage.setItem("user_info",JSON.stringify(e.user_info))})}).error(function(){hide_anim(),$("body .alert .msg").text("خطا در اتصال - مجدد تلاش نمایید ").parent(".alert").removeClass("none")})}).directive("myprofileDir",function(e){return{link:function(t){function a(){show_anim(),is_req=1,$.get(base_url+"/api_upload/portfolio/UPLo-098UYH-ooeWu/"+localStorage.getItem("user_id")+"/20/"+i+"/"+localStorage.getItem("user_id"),function(a){hide_anim(),data=JSON.parse(a),data.length>0&&(data.forEach(function(e,t){e.dates=moment(e.p_date).calendar(),e.cap=Math.round(parseInt(e.p_filesize)/1048576)/100,r.push(e)}),t.$apply(function(){t.portfolio=r,e.portfolio=r,e.portfolio_ofset=i}),i+=20,is_req=0)})}$(document).ready(function(){var e=new Snap({element:document.getElementById("content7"),disable:"left"});$("body #content7").on("click","#open-right",function(){"right"==e.state().state?e.close():e.open("right")})});var s;"portfolio_detail"!=now_h&&(e.portfolio=void 0,e.portfolio_ofset=void 0),$(".contant_profile").delegate(".user_img","click",function(){$(this).hasClass("user_img_change")||$(".contant_profile #amin .takePictureField").click()}),$(".takePictureField").change(function(e){isImage($(".takePictureField").val())?($(".short_info .user_img").addClass("user_img_change"),resize_image(window.URL.createObjectURL(e.target.files[0]),function(e){s=e,$.event.trigger({type:"imageResized_myprofile"})})):alert("فرمت فایل انتخابی اشتباه است . مجدد تلاش نمایید ")}),$(document).on("imageResized_myprofile",function(e){return $(".short_info .user_img").addClass("user_img_change"),$.post(base_url+"api/change_image/Passwd12-amin-APload3/"+localStorage.getItem("user_id"),{profile_pic:s}).done(function(e){$(".short_info .user_img").removeClass("user_img_change");var a=JSON.parse(e);t.$apply(function(){t.user_info[0].picname=a.picname,$("body .snap-drawers .user_menu_info .img").css("background-image",'url("'+base_url+"/uploads/user_img-medium/"+a.picname+'")');var e=JSON.parse(localStorage.getItem("user_info"));e[0].picname=a.picname,localStorage.setItem("user_info",JSON.stringify(e))})}).fail(function(){$(".short_info .user_img").removeClass("user_img_change"),$("body .alert .msg").text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent(".alert").removeClass("none")}),!1});var r=Array(),i=0;$(".cv_list").on("click",".do_like",function(){var t=$(this).parents(".extra").prev(".photo_cv").attr("p_id"),a=$(this);a.hasClass("liked")?(a.text((parseInt(a.text())-1).toString()),e.portfolio.forEach(function(e){e.p_id==t&&(e.l_count=parseInt(e.l_count)-1)}),a.addClass("unliked").removeClass("liked")):a.hasClass("unliked")&&(a.text((parseInt(a.text())+1).toString()),e.portfolio.forEach(function(e){e.p_id==t&&(e.l_count=parseInt(e.l_count)+1)}),a.addClass("liked").removeClass("unliked")),$.get(base_url+"/api_upload/toggle_like/UPLo-09dfdfd8UYH-ooudfdfs/"+localStorage.getItem("user_id")+"/"+t)}),void 0===e.portfolio?a():(t.portfolio=e.portfolio,i=e.portfolio_ofset,console.log(e.msg)),$(".cv_list").on("click",".photo_cv",function(){var t=$(this).attr("p_id"),a=$.grep(e.portfolio,function(e){return e.p_id==t});e.p_detail=a,console.log(e.p_detail),localStorage.setItem("p_detail",JSON.stringify(e.p_detail)),window.location.hash="#/portfolio_detail/"+t}),$(".tool_bar_fix").on("scroll",function(){win_height=$(window).height()+400;var e=$(".tool_bar_fix"),t=e.scrollTop()+e.height(),s=$(".haminjouri").height();console.log(s-t,win_height),s-t<win_height&&0==is_req&&(is_req=1,a())}),$(".cv_list").on("click",".remove_portfolio",function(){var t=$(this).attr("p_id"),a=$(this);$("body .lpro").removeClass("none"),$.get("http://atriaweb.ir/karkhaneh/api_upload/delete_portfolio/UP234Lo-09dfdfd8sdf34-ooudfdsdffs/"+t+"/"+localStorage.getItem("user_id"),function(){$("body .lpro").addClass("none");var s=$.grep(e.portfolio,function(e){return e.p_id!=t});e.portfolio=s,a.parents(".cv_one ").slideUp(100)}).fail(function(){$("body .alert .msg").text("خطا در اتصال - مجدد تلاش نمایید ").parent(".alert").removeClass("none"),$("body .lpro").addClass("none")})}),$(".cv_list").on("click",".share_btn",function(){var e=$(this).attr("share_url");share_fn(e)})}}}).controller("MycvController",function(e){}).directive("mycvDir",function(){return{link:function(){$(document).ready(function(){if(user_info=JSON.parse(localStorage.getItem("user_info")),user_id=user_info[0].member_id,null!==localStorage.getItem("user_skill")){var e=JSON.parse(localStorage.getItem("user_skill"));e.forEach(function(e,t){"0"==e[2]&&$("#skill_uni").next(".skill_list_new").prepend('<label class="title_form"><span class="full_center"><i class="fa fa-graduation-cap"></i></span><text class="m25"><h1>'+e[0]+'</h1><i class="fa fa-times remove_btn" skill_id="'+e[1]+'"></i></text></label>'),"1"==e[2]&&$("#skill_job").next(".skill_list_new").prepend('<label class="title_form"><span class="full_center"><i class="fa fa-briefcase"></i></span><text class="m25"><h1>'+e[0]+'</h1><i class="fa fa-times remove_btn" skill_id="'+e[1]+'"></i></text></label>')})}var t=new Snap({element:document.getElementById("content2"),disable:"left"});$("body #content2").on("click","#open-right",function(){"right"==t.state().state?t.close():t.open("right")}),$("#skill_uni").submit(function(){var e=$("#skill").val().trim().replace(/(<([^>]+)>)/gi,"");return e.length<2?($("body .alert .msg").text("رشته تحصیلی وارد شده باید حداقل 2 کارکتر باشد .").parent(".alert").removeClass("none"),!1):($("body .lpro").removeClass("none"),$.post(base_url+"/api_inapp/add_skill/AminKarKhuneh1222/",{member_id:user_id,skill:e,type:"0"},function(t){$("body .lpro").addClass("none");var a=JSON.parse(t);if($("#skill_uni").next(".skill_list_new").prepend('<label class="title_form"><span class="full_center"><i class="fa fa-graduation-cap"></i></span><text class="m25"><h1>'+e+'</h1><i class="fa fa-times remove_btn" skill_id="'+a.insert_id+'"></i></text></label>'),null===localStorage.getItem("user_skill")){var s=[];s[0]=Array(e,a.insert_id,"0"),localStorage.setItem("user_skill",JSON.stringify(s))}else{var s;s=JSON.parse(localStorage.getItem("user_skill")),s.push(Array(e,a.insert_id,"0")),localStorage.setItem("user_skill",JSON.stringify(s))}$("#skill").val("")}).fail(function(){$("body .lpro").addClass("none"),$("body .alert .msg").text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent(".alert").removeClass("none")}),!1)}),$("#skill_job").submit(function(){var e=$("#skill2").val().trim().replace(/(<([^>]+)>)/gi,"");return e.length<2?($("body .alert .msg").text("مهارت یا شغل وارد شده باید حداقل 2 کارکتر باشد .").parent(".alert").removeClass("none"),!1):($("body .lpro").removeClass("none"),$.post(base_url+"/api_inapp/add_skill/AminKarKhuneh1222/",{member_id:user_id,skill:e,type:"1"},function(t){$("body .lpro").addClass("none");var a=JSON.parse(t);if($("#skill_job").next(".skill_list_new").prepend('<label class="title_form"><span class="full_center"><i class="fa fa-briefcase"></i></span><text class="m25"><h1>'+e+'</h1><i class="fa fa-times remove_btn" skill_id="'+a.insert_id+'"></i></text></label>'),null===localStorage.getItem("user_skill")){var s=[];s[0]=Array(e,a.insert_id,"1"),localStorage.setItem("user_skill",JSON.stringify(s))}else{var s;s=JSON.parse(localStorage.getItem("user_skill")),s.push(Array(e,a.insert_id,"1")),localStorage.setItem("user_skill",JSON.stringify(s))}$("#skill2").val("")}).fail(function(){$("body .lpro").addClass("none"),$("body .alert .msg").text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent(".alert").removeClass("none")}),!1)})}),$(".skill_list_new").on("click",".remove_btn",function(){$("body .lpro").removeClass("none");var e=$(this).attr("skill_id"),t=$(this);$.post(base_url+"api_inapp/remove_skill/AminKarKhuneh13411",{id:e,user_id:user_id},function(){$("body .lpro").addClass("none");var a=JSON.parse(localStorage.getItem("user_skill"));a.forEach(function(t,s){t[1]==e&&a.splice(s,1)}),localStorage.setItem("user_skill",JSON.stringify(a)),t.parents(".title_form").fadeOut(100)}).fail(function(){$("body .lpro").addClass("none"),$("body .alert .msg").text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent(".alert").removeClass("none")})})}}}).controller("EditinfoController",function(e){e.user_info=JSON.parse(localStorage.getItem("user_info")),e.base_url=base_url}).directive("editinfoDir",function(){return{link:function(){$(document).ready(function(){var e=new Snap({element:document.getElementById("content3"),disable:"left"});$("body #content3").on("click","#open-right",function(){"right"==e.state().state?e.close():e.open("right")}),user_info=JSON.parse(localStorage.getItem("user_info")),console.log(user_info),user_id=user_info[0].member_id,$("#name").val(user_info[0].name),$("#age").val(user_info[0].age),$("#married option[value="+user_info[0].married+"]").prop("selected",!0),$("#grade option[value="+user_info[0].grade+"]").prop("selected",!0),$("#gender option[value="+user_info[0].gender+"]").prop("selected",!0),$("#status option[value="+user_info[0].status+"]").prop("selected",!0),$("#description").val(user_info[0].description),$("#field").val(user_info[0].field),states=JSON.parse(localStorage.getItem("state")),cities=JSON.parse(localStorage.getItem("city")),state_select='<option value="0" selected>استان محل سکونت</option>',states.forEach(function(e,t){state_select+='<option value="'+e.state_id+'" >'+e.state_name+"</option>"}),$("label#state select").append(state_select),$("label#state select option[value="+user_info[0].state_id+"]").prop("selected",!0),status_id=user_info[0].state_id,arr=jQuery.grep(cities,function(e){return e.state_id==status_id});var t='<option value="0" selected>شهر محل سکونت</option>';cities.forEach(function(e,a){t+='<option value="'+e.city_id+'">'+e.city_name+"</option>"}),$("label#city select").html(t);var a=$("#city select option[value="+user_info[0].city_id+"] ").text();$("#city select").html("<option value="+user_info[0].city_id+">"+a+"</option>"),$("label#state select").on("change",function(){status_id=$(this).val(),arr=jQuery.grep(cities,function(e){return e.state_id==status_id});var e='<option value="0" selected>شهر محل سکونت</option>';arr.forEach(function(t,a){e+='<option value="'+t.city_id+'">'+t.city_name+"</option>"}),$("label#city select").html(e)}),now_year=moment().format("jYYYY");var s=0;usr_data=new Object,$(".submit_form1").on("click",function(){name=$("#name").val().replace(/(<([^>]+)>)/gi,""),age=$("#age").val().replace(/(<([^>]+)>)/gi,""),gender=$("#gender").val().replace(/(<([^>]+)>)/gi,""),married=$("#married").val().replace(/(<([^>]+)>)/gi,""),grade=$("#grade").val().replace(/(<([^>]+)>)/gi,""),field=$("#field").val().replace(/(<([^>]+)>)/gi,""),state=$("#state select").val().replace(/(<([^>]+)>)/gi,""),city=$("#city select").val().replace(/(<([^>]+)>)/gi,""),description=$("#description").val().replace(/(<([^>]+)>)/gi,""),status=$("#status").val().replace(/(<([^>]+)>)/gi,"");var e=new Array;if($(".skill_uni .req").each(function(t,a){(""==$(this).val()||void 0===$(this).val())&&e.push($(this).prev("span").text())}),e.length>0)return $("body .alert .msg").text(" فیلد  "+e.join()+" خالی است ").parent(".alert").removeClass("none"),!1;if(my_age=parseInt(now_year)-parseInt(age),my_age<16||my_age>71)return $("body .alert .msg").text("سن شما باید بین 17 تا 70 سال باشد").parent(".alert").removeClass("none"),!1;if(0==state||0==city)return $("body .alert .msg").text("انتخاب شهر و استان اجباری است . ").parent(".alert").removeClass("none"),!1;if("null"==gender)return $("body .alert .msg").text("لطفا جنسیت خود را انتخاب کنید").parent(".alert").removeClass("none"),!1;$("body .lpro").removeClass("none"),user_info=JSON.parse(localStorage.getItem("user_info")),usr_data.member_id=user_id,usr_data.email=user_info[0].email,usr_data.mobile=user_info[0].mobile,usr_data.name=name,usr_data.age=age,usr_data.married=married,usr_data.gender=gender,usr_data.grade=grade,usr_data.field=field,usr_data.description=description,usr_data.status=status,usr_data.picname=user_info[0].picname,usr_data.state_id=state,usr_data.state=$("#state select option:selected").text(),usr_data.city_id=city,usr_data.city=$("#city select option:selected").text(),user_data_update=new Array,user_data_update[0]=usr_data;var t=JSON.stringify(user_data_update);return s++,s>5?($("body .alert .msg").text("تعداد دفعات آپدیت بیش از حد مجاز بوده است . مجدد تلاش ننمایید").parent(".alert").removeClass("none"),!1):($.post(base_url+"/api_inapp/edit_info/Ami3-nKarK7-9854KIHY/",{data:t},function(){localStorage.setItem("user_info",t),$("body .lpro").addClass("none"),$("body .alert .msg").text("اطلاعات کاربری شما با موفقیت به روز رسانی گردید").parent(".alert").removeClass("none"),window.location.hash="/relaod"}).fail(function(){$("body .lpro").addClass("none"),$("body .alert .msg").text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent(".alert").removeClass("none")}),!1)}),$(".register_form").delegate(".select_image","click",function(){$(this).hasClass("user_img_change")||$(".register_form #amin .takePictureField").click()}),$(".takePictureField").change(function(e){isImage($(".takePictureField").val())?($(".short_info .user_img").addClass("user_img_change"),resize_image(window.URL.createObjectURL(e.target.files[0]),function(e){image_resize=e,$.event.trigger({type:"imageResized_myprofiles"})})):alert("فرمت فایل انتخابی اشتباه است . مجدد تلاش نمایید ")}),$(document).on("imageResized_myprofiles",function(e){return $(".register_form .select_image").addClass("user_img_change"),$.post(base_url+"api/change_image/Passwd12-amin-APload3/"+localStorage.getItem("user_id"),{profile_pic:image_resize}).done(function(e){$(".register_form .select_image").removeClass("user_img_change");var t=JSON.parse(e);$("body .snap-drawers .user_menu_info .img").css("background-image",'url("'+base_url+"/uploads/user_img-medium/"+t.picname+'")');var a=JSON.parse(localStorage.getItem("user_info"));a[0].picname=t.picname,localStorage.setItem("user_info",JSON.stringify(a)),$(".title_form .full_center").css("background-image","url("+base_url+"uploads/user_img-small/"+t.picname+")")}).fail(function(){$(".register_form .select_image").removeClass("user_img_change"),$("body .alert .msg").text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent(".alert").removeClass("none")}),!1}),$(".submit_form2").on("click",function(){return old_pass=$("#passwd").val().replace(/(<([^>]+)>)/gi,""),new_pass=$("#new_pass").val().replace(/(<([^>]+)>)/gi,""),renew_pass=$("#re_new_pass").val().replace(/(<([^>]+)>)/gi,""),""==old_pass||""==new_pass||""==renew_pass?($("body .alert .msg").text("یک یا چند فیلد خالی است").parent(".alert").removeClass("none"),!1):new_pass!=renew_pass?($("body .alert .msg").text("رمز عبور جدید و تکرار آن با هم برابر نیستند").parent(".alert").removeClass("none"),!1):new_pass.length<5?($("body .alert .msg").text("رمز عبور باید حداقل 5 کارکتر باشد").parent(".alert").removeClass("none"),!1):($("body .lpro").removeClass("none"),$.post(base_url+"api/change_pass/asdkfjgad-poiuEPEPEP-oo0o098/"+localStorage.getItem("user_id"),{old_pass:old_pass,new_pass:new_pass},function(e){datas=JSON.parse(e),$("body .alert .msg").text(datas.msg).parent(".alert").removeClass("none"),$("body .lpro").addClass("none")}).fail(function(){$("body .alert .msg").text("خطا در برقراری اتصال - مجدد تلاش نمایید").parent(".alert").removeClass("none"),$("body .lpro").addClass("none")}),!1)}),$(".show_passwd").click(function(){"password"==$(this).prev("input").attr("type")?($(this).prev("input").attr("type","text"),$(this).addClass("hide_passwd")):($(this).prev("input").attr("type","password"),$(this).removeClass("hide_passwd"))})})}}}).directive("editloginDir",function(){return{link:function(){}}});