angular.module("myapp").controller("RegistertwoController",function(){}).directive("registertwoDir",function(){return{link:function(){$("body .lpro").addClass("none");var e,t,a;return now_year=moment().format("jYYYY"),null===localStorage.getItem("user_info_temp")?(window.location.hash="#/register_one",!1):(user_info=JSON.parse(localStorage.getItem("user_info_temp")),$("#name input").val(user_info.name),$("#age input").val(user_info.age),$("#field input").val(user_info.field),$("#gender select  option[value="+user_info.gender+"]").prop("selected",!0),$("#field input").val(user_info.field),$.get(base_url+"api/def_info/Passwd123",function(a){if(a=JSON.parse(a),t=a.state,e=a.city,localStorage.setItem("city",JSON.stringify(e)),localStorage.setItem("state",JSON.stringify(t)),state_select='<option value="0" selected>استان محل سکونت</option>',t.forEach(function(e,t){state_select+='<option value="'+e.state_id+'">'+e.state_name+"</option>"}),$("label#state select").append(state_select),null!==localStorage.getItem("user_info_temp")){$("#state select option[value="+user_info.state_id+"] ").prop("selected",!0),status_id=user_info.state_id,arr=jQuery.grep(e,function(e){return e.state_id==status_id});var n='<option value="0" selected>شهر محل سکونت</option>';arr.forEach(function(e,t){n+='<option value="'+e.city_id+'">'+e.city_name+"</option>"}),$("label#city select").html(n),$("#city select option[value="+user_info.city_id+"] ").prop("selected",!0)}}),user_data=JSON.parse(localStorage.getItem("user_info_temp")),$(".r2_name").val(user_data.name),$("label#state select").on("change",function(){status_id=$(this).val(),arr=jQuery.grep(e,function(e){return e.state_id==status_id});var t='<option value="0" selected>شهر محل سکونت</option>';arr.forEach(function(e,a){t+='<option value="'+e.city_id+'">'+e.city_name+"</option>"}),$("label#city select").html(t)}),void $(".reg_two_next").on("click",function(){name=$("#name input").val().trim().replace(/(<([^>]+)>)/gi,""),age=$("#age input").val().trim().replace(/(<([^>]+)>)/gi,""),gender=$("#gender select").val().trim().replace(/(<([^>]+)>)/gi,""),field=$("#field input").val().trim().replace(/(<([^>]+)>)/gi,""),state=$("#state select").val().trim().replace(/(<([^>]+)>)/gi,""),city=$("#city select").val().trim().replace(/(<([^>]+)>)/gi,"");var e=new Array;return $("#reg_two .req").each(function(t,a){(""==$(this).val()||void 0===$(this).val())&&e.push($(this).attr("placeholder"))}),e.length>0?($("body .alert .msg").text("فیلد  "+e.join()+"خالی است ").parent(".alert").removeClass("none"),a=setTimeout(function(){$("body .alert").addClass("none")},5e3),!1):name.length>16?($("body .alert .msg").text("نام شما حداکثر باید 16 کارکتر باشد").parent(".alert").removeClass("none"),a=setTimeout(function(){$("body .alert").addClass("none")},5e3),!1):field.length>32?($("body .alert .msg").text("رشته ی شما باید حداکثر 32 کارکتر باشد").parent(".alert").removeClass("none"),a=setTimeout(function(){$("body .alert").addClass("none")},5e3),!1):(my_age=parseInt(now_year)-parseInt(age),my_age<16||my_age>71?($("body .alert .msg").text("سن شما باید بین 17 تا 70 سال باشد").parent(".alert").removeClass("none"),a=setTimeout(function(){$("body .alert").addClass("none")},5e3),!1):0==state||0==city?($("body .alert .msg").text("انتخاب شهر و استان اجباری است . ").parent(".alert").removeClass("none"),a=setTimeout(function(){$("body .alert").addClass("none")},5e3),!1):"null"==gender?($("body .alert .msg").text("لطفا جنسیت خود را انتخاب کنید").parent(".alert").removeClass("none"),a=setTimeout(function(){$("body .alert").addClass("none")},5e3),!1):($("body .lpro").addClass("none"),user_data.name=name,user_data.age=age,user_data.gender=gender,user_data.field=field,user_data.state_id=state,user_data.state=$("#state select option:selected").text(),user_data.city_id=city,user_data.city=$("#city select option:selected").text(),localStorage.setItem("user_info_temp",JSON.stringify(user_data)),void(window.location.hash="#/register_three")))}))}}});