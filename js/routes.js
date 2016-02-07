angular.module('myapp')
    .config(function($routeProvider) {
        $routeProvider
		.when('/', {
            templateUrl: 'pages/select/index.html',
           /* controller: 'IndexController',*/
		})
        .when('/select', {
            templateUrl: 'pages/select/index.html',
            controller: 'SelectController',
		})
        .when('/login', {
            templateUrl: 'pages/login/index.html',
            controller: 'LoginController',
		})
        .when('/forget_pass', {
            templateUrl: 'pages/forget_pass/index.html',
            controller: 'ForgetpassController',
		})
        .when('/register_one', {
            templateUrl: 'pages/register/register_one.html',
            controller: 'RegisteroneController',
		})
        .when('/register_two', {
            templateUrl: 'pages/register/register_two.html',
            controller: 'RegistertwoController',
		})
        .when('/register_three', {
            templateUrl: 'pages/register/register_three.html',
            controller: 'RegisterthreeController',
		})
        .when('/wall', {
            templateUrl: 'pages/wall/index.html',
            controller: 'WallController',
		})
        .when('/profile/:user_id', {
            templateUrl: 'pages/profile/index.html',
            controller: 'ProfileController',
		})
		.when('/myprofile', {
            templateUrl: 'pages/myprofile/index.html',
            controller: 'myprofileController',
		})
        .when('/mycv', {
            templateUrl: 'pages/myprofile/my_cv.html',
            controller: 'MycvController',
		})
		.when('/edit_info', {
            templateUrl: 'pages/myprofile/edit_info.html',
            controller: 'EditinfoController',
		})
		.when('/follower', {
            templateUrl: 'pages/view_user/follower.html',
            controller: 'viewuserController',
		})
        .when('/follower/:user_id', {
            templateUrl: 'pages/view_user/user_follower.html',
            controller: 'viewuserflwController',
		})
		.when('/following', {
            templateUrl: 'pages/view_user/following.html',
            controller: 'viewuserController',
		})
		.when('/checked', {
            templateUrl: 'pages/view_user/checked.html',
            controller: 'viewuserController',
		})
		.when('/search', {
            templateUrl: 'pages/search/index.html',
            controller: 'SearchController',
		})
		.when('/search_result', {
            templateUrl: 'pages/search/result.html',
            controller: 'SearchresController',
		})
		.when('/msg', {
            templateUrl: 'pages/msg/index.html',
            controller: 'msgController',
		})
		.when('/msg_detail', {
            templateUrl: 'pages/msg/msg.html',
            controller: 'msgdetailController',
		})
        .when('/img_vid', {
            templateUrl: 'pages/img_vid/index.html',
            controller: 'imgvidController',
		})
        .when('/portfolio_detail/:p_id', {
            templateUrl: 'pages/img_vid/detail.html',
            controller: 'imgviddetailController',
		})
		.when('/test', {
            templateUrl: 'pages/test/index.html',
            controller: 'TestController',
		})
        .when('/settings', {
            templateUrl: 'pages/settings/index.html',
            controller: 'settingsController',
        })
        .when('/about', {
            templateUrl: 'pages/about_karkhaneh/index.html',
            controller: 'aboutController',
        })
        .when('/rule', {
            templateUrl: 'pages/rule_karkhaneh/index.html',
            controller: 'ruleController',
        })
        .when('/notification', {
            templateUrl: 'pages/notification/index.html',
            controller: 'notificationController',
        })
        .when('/exit', {
            templateUrl: 'pages/exit/index.html',
            controller: 'ExitController',
        })
        .when('/relaod', {
            templateUrl: 'pages/reload/index.html',
            controller: 'ReloadController',
        })
})
.run(function($rootScope, $window){
    $rootScope.$on("$routeChangeStart", function(event, next, current){
        if((next.templateUrl === "pages/select/index.html") || 
           (next.templateUrl === "pages/login/index.html")){
            if(localStorage.getItem('user_id')){
                
                $window.location.assign("#/wall");
                $window.location.reload();
                // $window.path("/wall");
            }
        }else if((next.templateUrl === 'pages/register/register_one.html') || 
           (next.templateUrl === 'pages/register/register_two.html') ||
           (next.templateUrl === 'pages/register/register_three.html')){
           if(localStorage.getItem('user_id')){
                
                $window.location.assign("#/wall");
                $window.location.reload();
                // $window.path("/wall");
            }
        }else{
            if(!localStorage.getItem('user_id')){
                
                $window.location.assign("#/select");
                $window.location.reload();
                // $window.path("/wall");
            }
        }
    });
});