
angular.module('myapp')
.controller('RegistertwoController', function() {
          
})
.directive('registertwoDir' , function (){
		return {
			link: function() {
				$('body .lpro').addClass("none");    
                var cities , states ; 
                var timeout ;
                now_year = moment().format('jYYYY');
				/*====================================================*/
                
				if(localStorage.getItem("user_info_temp") === null)
                {
                    window.location.hash = "#/register_one";
                    return false;
                }
                else{
                    user_info = JSON.parse(localStorage.getItem("user_info_temp"));
                    console.log(user_info);
                    $("#name input").val(user_info.name);
                    $("#age input").val(user_info.age);
                    $("#married select option[value="+user_info.married+"]").prop('selected', true);
                    $("#grade select  option[value="+user_info.grade+"]").prop('selected', true);
                    $("#gender select  option[value="+user_info.gender+"]").prop('selected', true);
                    $("#field input").val(user_info.field);

                    
                }
                $.get(base_url+"api/def_info/Passwd123",function(data){
                    
                    data = JSON.parse(data);
                    states = data.state ;
                    cities = data.city ;
                   // <option value="null">شهر محل سکونت</option>
                    state_select = '<option value="0" selected>استان محل سکونت</option>';
                    states.forEach(function(element,index){
                        state_select += '<option value="'+element.state_id+'">'+element.state_name+'</option>';
                    });
                    $("label#state select").append(state_select);
                    if(localStorage.getItem("user_info_temp") !== null) {
                        
                        $("#state select option[value="+user_info.state_id+"] ").prop('selected', true);
                        status_id = user_info.state_id;
                        arr = jQuery.grep(cities , function( st ) {
                            return st.state_id == status_id ;
                        });
                        var city_select = '<option value="0" selected>شهر محل سکونت</option>' ;
                    
                        arr.forEach(function(element,index){
                            city_select +='<option value="'+element.city_id+'">'+element.city_name+'</option>';
                        });
                        
                        $("label#city select").html(city_select);
                        $("#city select option[value="+user_info.city_id+"] ").prop('selected', true);
                    }
                   
                });
                user_data = JSON.parse(localStorage.getItem("user_info_temp"));
				/*====================================================*/
                $('.r2_name').val(user_data.name);
				/*====================================================*/
                $("label#state select").on("change",function(){
                    
                    status_id =  $(this).val();
                    arr = jQuery.grep(cities , function( st ) {
                        return st.state_id == status_id ;
                    });
                    var city_select = '<option value="0" selected>شهر محل سکونت</option>' ;
                    
                    arr.forEach(function(element,index){
                        city_select +='<option value="'+element.city_id+'">'+element.city_name+'</option>';
                    });
                    
                    $("label#city select").html(city_select);
                    
                });
				/*=====================reg_two submit===============================*/
                $('.reg_two_next').on("click",function(){
                    
                    name = $("#name input").val();
                    age = $("#age input").val();
                    gender = $("#gender select").val();
                    married = $("#married select").val();
                    grade = $("#grade select").val();
                    field = $("#field input").val();
                    state = $("#state select").val();
                    city = $("#city select").val();
                    
                    var errors_req = new Array();                        
                    $('#reg_two .req').each(function(index,element){
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

                    my_age = parseInt(now_year) - parseInt(age);
                    if( my_age < 16  || my_age > 71 )
                    {
                        $('body .alert .msg').text("سن شما باید بین 17 تا 70 سال باشد").parent('.alert').removeClass('none');
                        timeout = setTimeout(function(){ $('body .alert').addClass('none');},5000);
                        return false;
                    }
                    
                    if(state == 0 || city ==0 )
                    {
                        $('body .alert .msg').text("انتخاب شهر و استان اجباری است . ").parent('.alert').removeClass('none');
                        timeout = setTimeout(function(){ $('body .alert').addClass('none');},5000);
                        return false;
                    }
                    
                    if( gender == "null" )
                    {
                        $('body .alert .msg').text("لطفا جنسیت خود را انتخاب کنید").parent('.alert').removeClass('none');
                        timeout = setTimeout(function(){ $('body .alert').addClass('none');},5000);
                        return false;
                    }
                    
                    $('body .lpro').addClass("none");            
                    user_data.name = name ;
                    user_data.age = age ;
                    user_data.married = married ;
                    user_data.gender = gender ;
                    user_data.grade = grade ;
                    user_data.field = field ;
                    user_data.state_id = state;
                    user_data.state = $("#state select option:selected").text();
                    user_data.city_id = city ;
                    user_data.city = $("#city select option:selected").text();
                    localStorage.setItem("user_info_temp",JSON.stringify(user_data));
                    window.location.hash = "#/register_three" ;
                    
                });
				/*====================================================*/
				/*====================================================*/
				/*====================================================*/
				/*====================================================*/
            }/* end */
}});
