
$(function(){
    //商品预览--------------------------------------------------------------------------
    $("#smallpic").find("li").on("mouseenter",function(){
        var smpic=$(this).find("img").attr("src");
        var bigpic=smpic.replace("(0)","(1)");
        $("#box1").find("img").attr("src",bigpic);
        $(this).addClass("ac").siblings().removeClass("ac");
    });

    //数量加减--------------------------------------------------------------------------
    $("#plus").on("click",function(){
        $("#input1").val(parseInt($("#input1").val())+1);
    });
    $("#minus").on("click",function(){
        var result=parseInt($("#input1").val());
        $("#input1").val(result-1);
        if(result<=1){
            $("#input1").val(1);
        }
    });

    //切换样式--------------------------------------------------------------------------
    $("#choose_list").find("li").on("click",function(){
        $(this).addClass("changecolor").siblings().removeClass("changecolor");
    });

    //选项卡--------------------------------------------------------------------------
    $("#tab ul").find("li").on("mouseenter",function(){
        $(this).addClass("ac").siblings().removeClass("ac");
        var index=$(this).index();
        $("#tab .cont").find("div").eq(index).show().siblings().hide();
    });

});

