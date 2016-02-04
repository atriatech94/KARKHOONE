angular.module('myapp')
.controller('SearchController', function() {
          
})
.directive('searchDir' , function ($rootScope){
		return {
			link: function(scope) {
                /*====================================================*/
             
               
				/*====================================================*/
                var snapper = new Snap({ element: document.getElementById('content18'), disable: 'left'});
                $("body #content18").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
				/*====================================================*/
                states = JSON.parse(localStorage.getItem("state"));
                cities = JSON.parse(localStorage.getItem("city")) ;
                state_select = '<option value="null" selected>استان محل سکونت</option>';
                states.forEach(function(element,index){state_select += '<option value="'+element.state_id+'" >'+element.state_name+'</option>';});
                $("label#state select").append(state_select);
                /*====================================================*/
                $("label#state select").on("change",function(){
                    status_id =  $(this).val();
                    arr = jQuery.grep(cities , function( st ) {return st.state_id == status_id ;});
                    var city_select = '<option value="null" selected>شهر محل سکونت</option>' ;
                    arr.forEach(function(element,index){city_select +='<option value="'+element.city_id+'">'+element.city_name+'</option>';});
                    $("label#city select").html(city_select);
                });
                /*====================================================*/
                if($rootScope.search_data !== undefined){
                    $.each($rootScope.search_data.split('&'), function (index, elem) {
                        var vals = elem.split('=');
                        if(vals[0]=="search"){ scope.q = decodeURIComponent( vals[1].replace(/\+/g, ' ') ) }
                    });
                    $(".search_one").deserialize($rootScope.search_data,function() {});
                }
                now_year = moment().format('jYYYY');
                $(function(){
                    $(".search_one").submit(function(){
                        
                        $rootScope.search_data = $(".search_one").serialize() ;
                        $rootScope.search_address = 'search_one/AtS3tmi3-HS2EW20Rch3-9854NPPsIHY' ;
                        window.location.hash ="#/search_result/" ;
                        return false;
                        
                    });
                    /*====================================================*/               
                });
                /*=================================================*/
                $('.search_pro').click(function(){
                    $('.search_field').slideToggle(300)
                });
                /*=================================================*/
                $(".check_btn").on("change",function(){
                    form = $(this);
                    if($(this).children('input').is(":checked")){
                        form.children("span").addClass("cheched");
                    }else{
                        form.children("span").removeClass("cheched");
                    }
                });
				
            }/* end */
}})
.controller('SearchresController', function() {
          
})
.directive('searchresDir' , function ($rootScope){
		return {
			link: function(scope) {
                /*====================================================*/
                $rootScope.search = "";
                var snapper = new Snap({ element: document.getElementById('content19'), disable: 'left'});
                $("body #content19").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
				/*====================================================*/
                $('.of_list .user_list').html("");
                var ofset = 0
                var is_req = 0;
                var post_one = Array();
                if( $rootScope.search_data !== undefined && $rootScope.search_address !== undefined )
                {
                    if( $rootScope.search_data != "" && $rootScope.search_address != "" ){
                        
                        $('body .lpro').removeClass("none");
                        console.log( $rootScope.search_data,$rootScope.search_address );
                        fetch_serche_one($rootScope.search_data,$rootScope.search_address);
                    }
                    else{window.location.hash = "#/search"}
                }//endif
                else{window.location.hash = "#/search"}
                /*====================================================*/
                function fetch_serche_one(form_data,func){
                    $(".follower").next('.loading_users').show();
                    $(".follower").next('.refresh_loading').hide();
                   
                    $.post(base_url+"/api_search/"+func+"/"+ofset+"/"+localStorage.getItem("user_id"),form_data,function(datas){
                        $(".follower").next('.loading_users').hide();
                        data = new Object();
                        $('body .lpro').addClass("none");
                             
                        data = JSON.parse(datas);
                        if(data.length > 0 )
                        {
                            data.forEach(function(element,index){
                                var result ='<div class="user_one" user_id="'+element.member_id+'" scope="postone" >';
                                if(element.picname == "")
                                {
                                    if(element.gender == "0")
                                        result += '<div class="user_one_image"><span style="background-image:url(img/user_men.jpg)"></span></div>';
                                    if(element.gender == "1")
                                        result += '<div class="user_one_image"><span style="background-image:url(img/user_women.jpg)"></span></div>';
                                }
                                else
                                { result += '<div class="user_one_image"><span style="background-image:url('+base_url+'uploads/user_img-small/'+element.picname+');"></span></div>'; }
                                result +='<div class="user_one_info">';
                                result +='<h3>'+element.name+'</h3>';
                                result +='<h5>'+element.field+'</h5>';
                                result +='<span class="vline">'+(now_year - parseInt(element.age) ) +' ساله </span>';
                                result +='<span>'+element.state+'، '+element.city+' </span>';
                                result +='</div>';
                                result +='<div class="user_one_options">';
                                result +='</div>';
                                result +='<div class="clear"></div>';
                                result +='</div>';
                                $('.search_view .user_list').append(result);
                                post_one.push(element);
                            });
                           
                            $rootScope.search = post_one ;
                            $rootScope.search_ofset = ofset;
                            ofset += 20 ;
                            is_req = 0;
                          
                             
                        }
                        else if(ofset == 0){
                            $(".one_ids").next('.refresh_loading').show();
                            var result ='<div class="search_none">نتیجه ای یافت نشد.</div>';
                            $('.search_view .user_list').append(result);
                        }


                    }).fail(function(){
                        $(".one_ids").next('.refresh_loading').show();
                    });
                    return false;
                }//end function
               /*====================================================*/
                $('#content19 .of_list').on("scroll",function(){
                    var content = $('#content19 .of_list') ;
                    var ones = ( content.scrollTop() - content.height() ) + $(window).height();
                    var twoes =  $('#content19 .follower').height() ;
                    console.log(twoes - ones);
                    if((  twoes - ones) < 600 && is_req==0 ){ is_req = 1; fetch_serche_one($rootScope.search_data,$rootScope.search_address); }
                });
               /*====================================================*/
            }/* end */
}})