
$(function(){
    //左侧菜单展开--------------------------------------------------------
    $("#nav_list ul").find("li").each(function(index){
        $(this).hover(
            //鼠标移入菜单li
            function(){
                $(this).addClass("ac");
                $("#popup").show();
                $("#popup").find(".section").eq(index).show().siblings().hide();
            },
            //鼠标离开菜单li
            function(){
                $(this).removeClass("ac");
                $("#popup").hide();
            });
    });

    $("#popup").find(".section").each(function(index){
        $(this).hover(
            //鼠标移入弹出的子菜单section
            function(){
                $("#popup").show();
                $("#nav_list ul").find("li").eq(index).addClass("ac");
            },
            //鼠标移出弹出的子菜单section
            function(){
                $("#popup").hide();
                $("#nav_list ul").find("li").eq(index).removeClass("ac");
            });
    });

    //轮播图--------------------------------------------------------
    var currentZIndex = 1;   // 代表当前最大的z-index
    var currentPicIndex = 0; // 代表当前焦点图片的索引
    var timer;          // 保存定时器变量
    var delay = 3000;   // 图片切换的延时
    carousel();
    function carousel() {
        // 初始化banner
        // 将第一张图片放在最上面
        $("#banner-pic").find("li").first().css("zIndex", currentZIndex);

        /****************以下为增加鼠标悬停事件响应********************/
        // 添加鼠标悬停事件响应
        $("#banner").hover(
            function () {
                // 停止图片播放-清除定时器
                clearInterval(timer);

                $("#prevBtn,#nextBtn").show();
            },
            function () {
                playBanner();   // 继续播放
                $("#prevBtn,#nextBtn").hide();
            });

        /****************以下为动态生成导航按钮********************/
            // 动态生成导航按钮
        var navContent = "";
        $("#banner-pic").find("li").each(function (i) {
            navContent += '<li>' + (i + 1) + '</li>';
        });
        // 将生成的5个li添加到banner-nav中，并为第一个li设置class=ac
        $("#banner-nav").html(navContent).children().first().addClass("ac");

        /****************以下为导航按钮添加鼠标移入事件响应********************/
        // 遍历按钮集合，为每个按钮添加鼠标移入事件响应
        $("#banner-nav").find("li").each(function () {
            $(this).on("mouseenter", function (e) {
                // 1)将当前按钮的样式设为.ac;
                $(this).addClass("ac").siblings().removeClass();
                //获取哪个按钮被点击，也就是找到被点击按钮的索引值
                var index = $(this).index();

                //3)将对应位置的图片，动态滑入;向右偏移730px,将该图片的z-index值提升
                $("#banner-pic").find("li").eq(index).css({left: "730px", zIndex: currentZIndex++})
                    .animate({left: "0px"});

                // 将刚滑入的图片的索引设为当前焦点图片的索引
                currentPicIndex = index;
                e.stopPropagation();    // 阻止事件传播
            });
        });

        /****************以下为执行图片播放********************/
        playBanner();       //开始执行图片幻灯切换

        $("#nextBtn").on("click",function(){
            var picNum = $("#banner-pic").find("li").length;
            var nextIndex = currentPicIndex + 1;
            if (nextIndex == picNum) {
                nextIndex = 0;
            }
            $("#banner-nav").find("li").eq(nextIndex).trigger("mouseenter");
        });
        $("#prevBtn").on("click",function(){
            var picNum = $("#banner-pic").find("li").length;
            var nextIndex = currentPicIndex - 1;
            if (nextIndex == -1) {
                nextIndex = picNum-1;
            }
            $("#banner-nav").find("li").eq(nextIndex).trigger("mouseenter");
        });

    }
    // 轮播图片的方法
    function playBanner() {
        var picNum = $("#banner-pic").find("li").length;

        clearInterval(timer);
        timer = setInterval(anim, delay);

        function anim() {
            // 选取下一张图片
            var nextIndex = currentPicIndex + 1;
            if (nextIndex == picNum) {
                nextIndex = 0;
            }

            //模拟触发数字按钮的mouseover - 在匹配的对象上触发指定的事件
            $("#banner-nav").find("li").eq(nextIndex).trigger("mouseenter");
        }
    }

    //选项卡-------------------------------------------------------------------
    $("#no1 .nav").find("li").on("mouseenter",function(){
        $(this).addClass("active").siblings().removeClass("active");
        var index=$(this).index();
        $("#tab_cont").find(".right").eq(index).show().siblings(".right").hide();
    });


    //显示楼层--------------------------------------------------------
    $(window).on("scroll",function(){
        if($(window).scrollTop()>1500){
            $("#LocationFloorList").show();
        }else{
            $("#LocationFloorList").hide();
        }
        $("#LocationFloorList").find("li").each(function(){
            if($($(this).find("a").data("floor")).offset().top<$(window).scrollTop()+200){
                $(this).addClass("ac").siblings().removeClass("ac");
            }
        });

    });

    $("#LocationFloorList a").on("click",function(e){
        var id= $(this).data("floor");
        $("html,body").animate({
            scrollTop:$(id).offset().top
        },600);
        e.preventDefault();
    });

    //在线客服弹窗-------------------------------------------------------------------------
    var timer1;
    $("#service-menu>a").hover(
        function(){
            $(".dropdown-menu").show();
        },
        function(){
            timer1=setTimeout(function(){
                $(".dropdown-menu").hide();
            },400);
        });

    $(".dropdown-menu").hover(
        function(){
           clearTimeout(timer1);
        },
        function(){
            $(".dropdown-menu").hide();
        });


});
