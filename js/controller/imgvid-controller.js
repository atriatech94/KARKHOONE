angular.module('myapp')
.controller('imgvidController', function($scope,$rootScope, $timeout) {
    $scope.base_url = base_url ;
    $scope.member_id = localStorage.getItem('user_id') ;
})
.directive('imgvidDir' , function ($rootScope, $timeout){
		return {
			link: function(scope) {
                var post_one = Array();
                var ofset = 0;
				/*===============================================================================*/  
                var snapper = new Snap({ element: document.getElementById('content22'), disable: 'left'});
                $("body #content22").on('click','#open-right',function(){if( snapper.state().state=="right" ){snapper.close();}else{snapper.open('right');}});
                /*===============================================================================*/
                if($rootScope.portfolio === undefined)
                {
                    show_anim();
                     $.get(base_url+"/api_upload/portfolio/UPLo-098UYH-ooeWu/"+localStorage.getItem("user_id")+"/20/"+ofset+"/"+localStorage.getItem("user_id"),function(datas){
                         hide_anim();
                         
                         data = JSON.parse(datas);
                         console.log(data);
                         
                         data.forEach(function(element,index){
                             element.dates =  moment(element.p_date).calendar();
                             element.cap = Math.round(parseInt(element.p_filesize)/1048576)/1024;
                             post_one.push(element);
                         });
                         scope.$apply(function(){
                             scope.portfolio = post_one ;
                           //  scope.portfolio[0].p_date = moment(scope.portfolio[0].p_date).calendar();
                             $rootScope.portfolio = post_one ;
                             $rootScope.portfolio_ofset = ofset;
                         }); 

                     }); 
                }else{
                    scope.portfolio = $rootScope.portfolio ;
                    ofset = $rootScope.portfolio_ofset ;
                }
                
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
                $(function(){
                    var btn = document.getElementById('uploadBtn'),
                        progressBar = document.getElementById('progressBar'),
                        progressOuter = document.getElementById('progressOuter'),
                        msgBox = document.getElementById('msgBox');
                    var uploader = new ss.SimpleUpload({
                        button: btn,
                        url: base_url+'api_upload/upload/UPLo-098UYH-oou/'+localStorage.getItem("user_id"),
                        name: 'uploadfile',
                        multipart: true,
                        async:true,
                        maxSize: 102400,/*kb*/
                        data:{ text: $('.text_img_vid').val() },
                        crossDomain:true,
                        hoverClass: 'hover',
                        allowedExtensions: ['gif', 'png', 'jpg', 'jpeg', 'mp4', 'avi', 'mkv', 'mpeg', '3gp', 'wmv', 'flv'],
                        focusClass: 'focus',
                        responseType: 'json',
                        onProgress : function( darsad ){
                            $('.mvd_img').hide();
                            $('.percent_upload,.loading_uploading').show(0);
                            $('.percent_upload span').text(darsad);
                           
                        },
                        startXHR: function(filename, size) {
                            progressOuter.style.display = 'block'; // make progress bar visible
                            this.setProgressBar(progressBar);
                        },
                        onSubmit: function() {
                            
                            msgBox.innerHTML = ''; // empty the message box
                            btn.innerHTML = 'Uploading...'; // change button text to "Uploading..."
                            this.setData({ text: document.getElementById("text_img_vid").value });
                            text = $('.text_img_vid').val();
                            
                        },
                        onComplete: function( filename, response ) {
                            
                            setTimeout(function(){
                                $('.mvd_img').show();
                                $('.percent_upload').hide(0);
                                $('.loading_uploading').hide(0);
                                progressOuter.style.display = 'none';
                            },400);
                            btn.innerHTML = 'یک فایل دیگر انتخاب کنید';
                             // hide progress bar when upload is completed
                                
                            if ( !response ) {
                                msgBox.innerHTML = 'خطا در آپلود - لطفا دقایقی بعد مجدد تلاش نمایید';
                                return;
                            }

                            if ( response.success === true ) {
                                //msgBox.innerHTML = '<strong>' + escapeTags( filename ) + '</strong>' + ' successfully uploaded.';
                                console.log(response);
                              var res = '<div class="cv_one">';
                                res += '<div class="photo_cv">';
                                if(response.type=="0")
                                {res += '<div class="img" style="background-image:url('+base_url+'uploads/portfolio/images-small/'+response.name+')"></div>';}
                                else
                                {  res += '<div class="img" style="background-image:url(img/video-player.jpg)"></div>';}
                                res += '<span class="date">'+moment(response.date).calendar()+'<span class="share_btn" share_url="'+base_url+'api_show_portfolio/'+response.p_id+'"><i class="fa fa-share-alt"></i></span></span>';
                                res += '<span class="type type-'+response.type+' orimage"><span class="value">'+Math.round(parseInt(response.filesize)/10240)/100+'MB</span></span>';
                                res += '</div>';
                                res += '<div class="extra bs">';
                                res += '<span class="text">'+text+'</span>';
                                res += '<ul class="count">';
                                res += '<li class="like">0</li>';
                                res += '<li class="comment">0</li>';
                                res += '<li class="view">0</li>';
                                res += '<li class="more">&zwnj;<div class="porfolio_spam remove_portfolio" p_id="'+response.p_id+'"><span>حذف</span></div><li>';
                                res += '</ul></div></div>';
                                $(".cv_list").prepend(res);

                            } else {
                                if ( response.msg )  {
                                    msgBox.innerHTML = escapeTags( response.msg );
                                    
                                } else {
                                    msgBox.innerHTML = 'خطایی در هنگام آپلود رخ داده است - لطفا دقایقی بعد مجدد تلاش نمایید';
                                }
                                $('.mvd_img').show();
                                $('.percent_upload').hide(0);
                                $('.loading_uploading').hide(0);
                            }
                        },
                        onError: function(e) {
                            console.log(e);
                            progressOuter.style.display = 'none';
                            msgBox.innerHTML = 'خطا در آپلود - لطفا دقایقی بعد مجدد تلاش نمایید';
                            $('.mvd_img').show();
                            $('.percent_upload').hide(0);
                            $('.loading_uploading').hide(0);
                        }
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
                    window.plugins.socialsharing.share('اشتراک گزاری شده توسط اپلیکیشن کارخونه', null,  url, base_url+'file/logo_share.png' );
                });
                /*====================================================*/
                
            }/* end */
}});
