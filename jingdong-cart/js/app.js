/**
 * Created by hxsd on 2017/3/3.
 */
// 创建主模块，并添加对路由模块的依赖
var myapp = angular.module("myapp", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider
        // 处理默认首页
            .when("/", {templateUrl: "pages/productList.html", controller: "productsCtrl"})
            .when("/productList", {templateUrl: "pages/productList.html", controller: "productsCtrl"})
            .when("/detail", {templateUrl: "pages/detail.html", controller: "detailCtrl"})
            .when("/detail?:name", {templateUrl: "pages/detail.html", controller: "detailCtrl"})
            .when("/shopCart", {templateUrl: "pages/shopCart.html", controller: "cartCtrl"})
            // 如果请求的路由不存在
            .otherwise({templateUrl: "pages/productList.html", controller: "productsCtrl"});
    })
    // 创建一个代表购物车的service
    .factory("cartService", function () {
        // 容器：相当于购物车的购物筐
        var cart = [];

        return {
            // 添加商品到购物车:商品对象{name:"方便面",price:8.00}
            // 需要判断购物车的数组中，之前是否已经加入过该商品
            // 如果之前已经加入过，则只需要修改购买数量
            add: function (product,num) {
                // 遍历数组，判断数组中是否有product
                // item:{product:product,number:3}
                for (var i = 0; i < cart.length; i++) {
                    var item = cart[i];
                    if (product.name == item.product.name) {
                        // 说明之前添加过，这里只修改购买数量
                        item.number+=num;
                        return;
                    }
                }

                // 如果能执行到这里，说明在购物车中没有找到该商品-新商品
                cart.push({product: product, number: num});
            },
            // 从购物车中删除商品的方法
            remove: function (name) {
                // 遍历数组，判断数组中是否有product
                // item:{product:product,number:3}
                for (var i = 0; i < cart.length; i++) {
                    var item = cart[i];
                    if (name == item.product.name) {
                        // 说明找到了要删除的商品，从数组中删除它
                        cart.splice(i, 1);
                        return;
                    }
                }
            },
            // 查询购物车中所有商品的方法
            findAll: function () {
                return cart;
            },
            // 清空购物车
            clear: function () {
                cart.length = 0;
            }
        };
    })
    // step2: 向主模块注册一个控制器
    // 依赖注入: $http service，以及购物车service
    // 商品列表显示子页面的控制器
    .controller("productsCtrl", function ($scope, $http, cartService) {
        var url = "data/products.json";
        $http.get(url).success(function (data) {
            $scope.products = data;
        });

        // 购买商品按钮事件
        $scope.add = function (product) {
            // 将商品对象加入到购物车中
            cartService.add(product);
        };
    })
    // 商品详情子页面的控制器
    .controller("detailCtrl", function ($http,$scope,$routeParams,cartService) {
        $scope.load = function (){
            effect();
        };
        var url1 = "data/productImg.json";
        $http.get(url1).success(function (data) {
            $scope.productImg = data;
        });
        var name = $routeParams["name"] || "华为";
        $scope.name1 = $routeParams["name"] || "华为";

        var productList = {
            华为:{"name":"华为","price":1999,"os":"android","quantity":2,"date":"2016-05-03","imgsrc":"phone11.jpg","desc":"华为 HUAWEI nova 4GB+64GB版 玫瑰金 移动联通电信4G手机 双卡双待"},
            小米:{"name":"小米","price":1799,"os":"android","quantity":2,"date":"2016-05-03","imgsrc":"phone12.jpg","desc":"【定位套装】小米5s 全网通 高配版 3GB内存 64GB ROM 哑光金 移动联通"},
            一加3T:{"name":"一加3T","price":2699,"os":"android","quantity":2,"date":"2016-05-03","imgsrc":"phone13.jpg","desc":"一加手机3T (A3010) 6GB+64GB 枪灰版 全网通 双卡双待 移动联通电信"},
            三星:{"name":"三星","price":3599,"os":"android","quantity":2,"date":"2016-05-03","imgsrc":"phone14.jpg","desc":"三星 Galaxy Note5（N9200）4GB+32GB 铂光金 全网通4G手机"},
            中兴:{"name":"中兴","price":999,"os":"android","quantity":2,"date":"2016-05-03","imgsrc":"phone15.jpg","desc":"中兴(ZTE) A2 Plus 4GB+32GB高配 流光金 全网通4G双卡双待"}
        };

        // 根据传递的参数(商品名称)获取对应的商品信息
        $scope.product = productList[name];

        $scope.inval=1;
        //数量加1
        $scope.plus=function(){
            $scope.inval++;
        };
        //数量减1
        $scope.minus=function(){
            $scope.inval--;
            if($scope.inval<1){
                $scope.inval=1;
            }
        };
        // 购买商品按钮事件
        $scope.add = function () {
            // 将商品对象加入到购物车中
            cartService.add($scope.product,$scope.inval);
        };

    })
    // 依赖注入单例的购物车对象
    // 购物车子页面的控制器
    .controller("cartCtrl", function ($scope, cartService) {
        // 拿到购物筐中的所有商品
        $scope.cart = cartService.findAll();

        // 删除购物车中商品的方法
        $scope.remove = function (name) {
            cartService.remove(name);
        };

        // 统计购买总数量
        $scope.count = function () {
            var total = 0;
            angular.forEach($scope.cart, function (item) {
                total += item.number;
            });
            return total;
        };

        // 计算购买总金额
        $scope.money = function () {
            var total = 0;
            angular.forEach($scope.cart, function (item) {
                total += item.number * item.product.price;
            });
            return total;
        };
    });