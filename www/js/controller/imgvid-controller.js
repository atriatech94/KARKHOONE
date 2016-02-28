angular.module('myapp')
.controller('imgvidController', function($scope,$rootScope, $timeout) {
    $scope.base_url = base_url ;
    $scope.member_id = localStorage.getItem('user_id') ;
})
.directive('imgvidDir' , function ($rootScope, $timeout,$route){
		return {
			link: function(scope) {
                var post_one = Array();
                var ofset = 0;
                var is_req = 0;
                var time_one = 0;
				/*===============================================================================*/  
                var snapper = new Snap({ element: document.getElementById('content22'), disable: 'left'});
                $("body #content22").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
                /*===============================================================================*/
                if($rootScope.portfolio === undefined)
                {
                    load_p(ofset);
                }else{
                    scope.portfolio = $rootScope.portfolio ;
                    ofset = $rootScope.portfolio_ofset ;
                }
                  /*===============================================================================*/  
                 function load_p(){
                     show_anim(); 
                     $.get(base_url+"/api_upload/portfolio/UPLo-098UYH-ooeWu/"+localStorage.getItem("user_id")+"/20/"+ofset+"/"+localStorage.getItem("user_id"),function(datas){
                         hide_anim();

                         data = JSON.parse(datas);
                         console.log(data);
                         if(data.length == 0){
                             is_req = 1;
                             return false;
                         }
                         data.forEach(function(element,index){
                             element.p_id = parseInt(element.p_id);
                             element.dates =  moment(element.p_date).calendar();
                             element.cap = Math.round(parseInt(element.p_filesize)/1048576)/1024;
                             post_one.push(element);
                         });
                         scope.$apply(function(){
                             if(scope.portfolio === undefined){
                                 scope.portfolio = post_one ;
                                 $rootScope.portfolio = post_one ;
                                 $rootScope.portfolio_ofset = ofset;
                             }
                             
                             ofset+=20;
                             is_req = 0;
                             
                         }); 
                     }).fail(function(){
                         hide_anim();
                     }) 
                }
                /*===============================================================================*/
                $('.tool_bar_fix').on("scroll",function(){
                    win_height = $(window).height()+ 400 ;
                    var content = $('.tool_bar_fix') ;
                    var ones =  content.scrollTop()  + content.height();
                    var twoes =  $('.user_list').height() ;
                    console.log(ones- twoes,win_height );
                    if((   twoes - ones ) < win_height && is_req==0 ){is_req = 1;load_p(ofset);}
                });
                /*===============================================================================*/  
                var text ;
                function escapeTags( str ) {
                  return String( str )
                           .replace( /&/g, '&amp;' )
                           .replace( /"/g, '&quot;' )
                           .replace( /'/g, '&#39;' )
                           .replace( /</g, '&lt;' )
                           .replace( />/g, '&gt;' );
                }
                $('.full_center').click(function(){
                    $('.tool_bar_fix .submit_register').click();
                });
                $(function(){
                    var btn = document.getElementById('uploadBtn'),
                        progressBar = document.getElementById('progressBar'),
                        progressOuter = document.getElementById('progressOuter'),
                        form_upload = document.getElementById('mvd_img'),
                        msgBox = document.getElementById('msgBox');
                    
                    var uploader = new ss.SimpleUpload({
                        button : btn ,
                        autoSubmit:false,
                        
                        url: base_url+'api_upload/upload/UPLo-098UYH-oou/'+localStorage.getItem("user_id"),
                        sessionProgressUrl:base_url+'progressurl/uploadProgress.php',
                        name: 'uploadfile',
                        multipart: true,
                        form : form_upload ,
                        async:true,
                        maxSize: 102400,/*kb*/
                        data:{ text: $('.text_img_vid').val().replace( /(<([^>]+)>)/ig , "" ) },
                        crossDomain:true,
                        hoverClass: 'hover',
                        allowedExtensions: ['gif', 'png', 'jpg', 'jpeg', 'mp4', 'avi', 'mkv', 'mpeg', '3gp', 'wmv', 'flv' ,'ogg'],
                        focusClass: 'focus',
                        responseType: 'json',
                        
                        onProgress : function(darsad){
                           // $('.mvd_img').hide();
                            $('.percent_upload,.loading_uploading').show(0);
                            $('.percent_upload i').text(darsad);
                           
                        },
                        startXHR: function(filename, size) {
                            
                            progressOuter.style.display = 'block'; // make progress bar visible
                            
                        },
                        onChange: function(filename){
                           if(isImage(filename) || isVideo(filename))
                           {
                               $('.changable_text').text('برای ذخیره فایل دکمه ی ارسال را لمس کنید .');
                           }else{
                               $('.changable_text').text('فرمت فایل انتخابی نا معتبر است .');
                           }
                        },
                        onSubmit: function(filename, extension) {
                           
                            $('.ui-state-disabled').show();
                            $('.submit_register,.text_img_vid').hide();
                            this.setAbortBtn($('.ui-state-disabled'));
                            this.setData({ text: document.getElementById("text_img_vid").value });
                            this.setProgressBar(progressBar);
                            text = $('.text_img_vid').val();
                            $('.changable_text').text('در حال بارگذاری ... لطفا شکیبا باشید  ');
                            
                            
                        },
                        onComplete: function( filename, response ) {
                            
                            setTimeout(function(){
                                $('.mvd_img,.text_img_vid,.submit_register').show();
                                $('.percent_upload,.ui-state-disabled,.loading_uploading').hide(0);
                                progressOuter.style.display = 'none';
                            },100);
                            
                            $('.changable_text').text('ذخیره با موفقیت انجام شد ، یک فایل دیگر انتخاب کنید');
                                                             
                            if ( !response ) {
                                $('.changable_text').text('خطا در آپلود - لطفا دقایقی بعد مجدد تلاش نمایید');
                                return;
                            }
                            
                            if ( response.success === true ) {
                                if($rootScope.portfolio !== undefined)
                                {
                                    var new_por = {
                                        c_count: null,
                                        cap: Math.round(parseInt(response.filesize)/10240)/100 ,
                                        dates: moment(response.date).calendar(),
                                        duration: response.duration,
                                        l_count: null,
                                        member_do_like: null,
                                        member_id: localStorage.getItem("user_id"),
                                        p_active: "1",
                                        p_date: response.date,
                                        p_filesize: response.filesize,
                                        p_id: parseInt(response.p_id),
                                        p_name: response.name,
                                        p_text: text,
                                        p_type: response.type,
                                        v_count: "0",
                                    }
                                    console.log($rootScope.portfolio.length);
                                    scope.$apply(function(){
                                        $rootScope.portfolio.push(new_por);
                                        scope.portfolio = $rootScope.portfolio;
                                        console.log($rootScope.portfolio.length);
                                    });
                                    
                                }
                                //msgBox.innerHTML = '<strong>' + escapeTags( filename ) + '</strong>' + ' successfully uploaded.';
                                console.log(response);
                                

                            } else {
                                if ( response.msg )  {
                                    $('.changable_text').text(response.msg);
                                   
                                    
                                } else {
                                    $('.changable_text').text( 'خطایی در هنگام آپلود رخ داده است - لطفا دقایقی بعد مجدد تلاش نمایید' );
                                }
                                $('.mvd_img').show();
                                $('.percent_upload').hide(0);
                                $('.loading_uploading').hide(0);
                            }
                        },onAbort:function(e){

                            $('.changable_text').text('آپلود لغو شد - یک فایل دیگر انتخاب کنید .');
                            $('.submit_register,.mvd_img,.text_img_vid,.submit_register').show();
                            $('.percent_upload,.ui-state-disabled,.loading_uploading,#progressOuter').hide(0);
                        },
                        onError: function(e) {
                            console.log(e);
                            //progressOuter.style.display = 'none';
                            $('.changable_text').text('خطا در آپلود - لطفا ssدقایقی بعد مجدد تلاش نمایید');
                            $('.mvd_img').show();
                            $('.percent_upload').hide(0);
                            $('.loading_uploading').hide(0);
                        }
                    });
                    
                    $(".submit_register").click(function(){
                        uploader.submit();
                    });
                });
                /*===============================================================================*/ 
                $('.cv_list').on("click",".do_like",function(){
                    
                      var p_id = $(this).parents('.extra').prev(".photo_cv").attr('p_id');
                      var photo_cv = $(this);
                      //show_anim();
                        
                    if(photo_cv.hasClass("liked")){
                        /*you should unlinke*/
                        photo_cv.text((parseInt(photo_cv.text())-1).toString());
                        $rootScope.portfolio.forEach(function(a){
                            if( a.p_id == p_id){
                                a.l_count = parseInt(a.l_count)-1;
                            }
                        });
                        photo_cv.addClass("unliked").removeClass('liked');;
                             
                    }else if(photo_cv.hasClass("unliked")){
                        /*you should linke*/
                        photo_cv.text((parseInt(photo_cv.text())+1).toString());
                        $rootScope.portfolio.forEach(function(a){
                            if( a.p_id == p_id){
                                a.l_count = parseInt(a.l_count)+1;
                            }
                        });
                        photo_cv.addClass("liked").removeClass('unliked');
                    }
                    
                    $.get(base_url+"/api_upload/toggle_like/UPLo-09dfdfd8UYH-ooudfdfs/"+localStorage.getItem("user_id")+"/"+p_id);
                        
                        
                  });

                /*===============================================================================*/ 
                  $('.cv_list').on("click",".photo_cv",function(){
                      var p_id = $(this).attr('p_id');
                      var arr = $.grep(($rootScope.portfolio),function(a){
                            return a.p_id == p_id ;
                      });
                      $rootScope.p_detail = arr ;
                      console.log($rootScope.p_detail);
                      localStorage.setItem("p_detail",JSON.stringify($rootScope.p_detail));
                      window.location.hash = "#/portfolio_detail/"+p_id;
                  });
                  
                /*====================================================*/
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
                /*========================share============================*/
                $('.cv_list').on('click','.share_btn',function(){
                    var url = $(this).attr('share_url');
                    share_fn(url);// dar index.js hast
                });
                /*====================================================*/
                
            }/* end */
}})
.filter('timeing', function() {

  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input) {

      var s;
      var m;
      s = Math.floor( parseInt(input));    
      m = Math.floor( s / 60 );
      m = m >= 10 ? m : '0' + m;    
      s = Math.floor( s % 60 );
      s = s >= 10 ? s : '0' + s;    
      amin =  m + ':' + s;
      return amin;
    // Do filter work here

    //return output;

  }

})
.filter('create_link', function() {

  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input) {
     
      var d = new Date(input);
      var n = d.getTime();
     return n;
      
  }

});
