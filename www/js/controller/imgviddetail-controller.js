angular.module('myapp')
.controller('imgviddetailController', function($scope,$rootScope,$routeParams,$http) {
    show_anim();
    $scope.base_url = base_url ;
    if($rootScope.p_one_detail !== undefined)
    $scope.p_one_detail = $rootScope.p_one_detail ;
    else{
        show_anim();

        $http.get(base_url+"/api_upload/portfolio_one/UPsdfLo-098UYdfdsH-ooesdfWu/"+$routeParams.p_id)
        .success(function(data){
            hide_anim();
            data.forEach(function(element,index){
                element.dates =  moment(element.p_date).calendar();
                element.cap = Math.round(parseInt(element.p_filesize)/1048576)/100;
                
            });
            $scope.p_one_detail = data;
        });
    }
   $http.get(base_url+"/api_upload/portfolio_data/UPLo-098UYH-ooeWu/"+$routeParams.p_id+"/"+localStorage.getItem("user_id"))
   .success(function(response){
       hide_anim();
       $scope.commnet = response;
      //console.log($scope.commnet);
   });
})
.directive('imgviddetailDir' , function ($timeout,$rootScope,$routeParams){
		return {
			link: function(scope) {
                /*===============================================================================*/  
                var snapper = new Snap({ element: document.getElementById('content123'), disable: 'left'});
                $("body #content123").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
                /*===============================================================================*/
              $timeout(function(){
                  $('.cv_list').on("click",'.do_like',function(){
                      show_anim();
                        $.get(base_url+"/api_upload/toggle_like/UPLo-09dfdfd8UYH-ooudfdfs/"+localStorage.getItem("user_id")+"/"+$('.photo_cv').attr('p_id'))
                        .success(function(response){
                            hide_anim();
                            if(JSON.parse(response) == "liked"){
                                $('.do_like').text((parseInt($('.do_like').text())+1).toString());
                                if($rootScope.portfolio !== undefined){
                                    $rootScope.portfolio.forEach(function(a){
                                        if( a.p_id == $('.photo_cv').attr('p_id')){
                                            a.l_count = parseInt(a.l_count)+1;
                                            console.log(1);
                                        }
                                    });
                                }
                                photo_cv.addClass("liked");
                            }else if(JSON.parse(response) == "unliked"){
                                $('.do_like').text((parseInt($('.do_like').text())-1).toString());
                                if($rootScope.portfolio !== undefined){
                                    $rootScope.portfolio.forEach(function(a){
                                        if( a.p_id == $('.photo_cv').attr('p_id')){
                                            a.l_count = parseInt(a.l_count)-1;
                                            console.log(1);
                                        }
                                    });
                                }
                                photo_cv.removeClass("liked");
                                
                            }
                        });
                        
                  });
              /*============================================================================================*/    
                  var user_info = JSON.parse(localStorage.getItem("user_info"));
                  //console.log(user_info);
                  $('.cv_list').on("click",'.do_comment', function(){
                    
                     if($('.comment_text').val().trim() == "")
                      {$('.comment_text').val("").focus();return;}
                      $('.loading_text').css("display","flex");
                      var ser = $('.form_cm1').serialize();
                      var txt = $('.comment_text').val();
                      txt =  txt.replace( /(<([^>]+)>)/ig , "" );
                      txt2 = txt.replace(/(?:\r\n|\r|\n)/g, '<br />');

                      $.post(base_url+"/api_upload/comment/UPLo-098UYH-oou/"+localStorage.getItem("user_id")+"/"+$routeParams.p_id,ser)
                      .success(function(response){
                          $('.loading_text').css("display","none");
                          var data_new = {comment:txt,
                                           is_active: "1",
                                           p_id:$routeParams.p_id,
                                           gender:user_info[0].gender,
                                           name:user_info[0].name,
                                           member_id:user_info[0].member_id,
                                           picname:user_info[0].picname,
                                           date : response.date,
                                           id:response.id
                                          };
                        
                          if(scope.commnet !== undefined){
                            scope.$apply(function(){scope.commnet.push(data_new);scope.p_one_detail[0].c_count = parseInt(scope.p_one_detail[0].c_count)+1; });
                          }else{
                              scope.$apply(function(){scope.commnet = array(data_new);scope.p_one_detail[0].c_count = parseInt(scope.p_one_detail[0].c_count)+1;});
                          }
                         
                          $('.comment_text').val("").focus();
                      }).fail(function(){
                          $('.loading_text').css("display","none");
                          $('body .alert .msg').text("خطا در اتصال - مجدد تلاش نمایید ").parent('.alert').removeClass('none');
                      });
                  });
              /*============================================================================================*/    
              });  
                /*====================================================*/
                $('.cv_list').on('click','.remove_portfolio',function(){
                    var p_id = $(this).attr('p_id');
                    var contain = $(this);
                    $('body .lpro').removeClass("none");
                    $.get("http://atriaweb.ir/karkhaneh/api_upload/delete_portfolio/UP234Lo-09dfdfd8sdf34-ooudfdsdffs/"+p_id+"/"+localStorage.getItem('user_id'),function(){
                        $('body .lpro').addClass("none");
                        var pp_id = $.grep($rootScope.portfolio,function(element){
                            return element.p_id != p_id;
                        });
                        $rootScope.portfolio = pp_id;
                        contain.parents('.cv_one ').slideUp(100);
                    }).fail(function(){
                        $('body .alert .msg').text("خطا در اتصال - مجدد تلاش نمایید ").parent('.alert').removeClass('none');
                        $('body .lpro').addClass("none");
                    });
                });
                /*====================================================*/
                $('.cv_list').on("click",".video_play",function(){
                    url = $(this).attr('video_address');
                    VideoPlayer.play(url);
                });
                /*====================================================*/
            }/* end */
}}) 
.filter('fromNow', function() {
        return function(date) {
        return moment(date).calendar();
        }
});