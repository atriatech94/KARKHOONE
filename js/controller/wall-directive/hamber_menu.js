var amin = 0 ;
angular.module('myapp')
.directive('hamberDir' , function (){
		return {
			link: function() {
                var user_data = (JSON.parse(localStorage.getItem('user_info')));
                console.log(user_data);
                $('.user_menu_info .name').text(user_data[0].name);
                if(user_data[0].picname != ""){
                    $('.user_menu_info .img').css('background-image','url("'+base_url+'uploads/user_img-medium/'+user_data[0].picname+'")');
                }
                else
                {
                    if(user_data[0].gender =="0"){
                        $('.user_menu_info .img').css('background-image','url("img/user_men.jpg")');
                    }
                    else if(user_data[0].gender =="1"){
                        $('.user_menu_info .img').css('background-image','url("img/user_women.jpg")');
                    }
                }
                var active = window.location.hash;
                $('.menu_hamber li').removeClass('active')
                $('.menu_hamber li a[href="'+active+'"]').parent('li').addClass('active');
                //$('')
            },/* end */
            templateUrl:"pages/hamber_menu/index.html",
}});
