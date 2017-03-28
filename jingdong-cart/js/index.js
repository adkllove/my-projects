
window.onload=function(){
    //左侧菜单展开--------------------------------------------------------
    function menuExpansion(){
        var navList=document.getElementById("nav_list");
        var aLi=navList.getElementsByTagName("li");
        var oMenuCont=document.getElementById("popup");
        var a_cate_part=oMenuCont.getElementsByClassName("section");
        var leave_menu=null;//离开右侧，回到左侧
        //删除所有li上的ac
        function del_li_ac(){
            for(var i=0; i<aLi.length;i++){
                aLi[i].className="";
            }
        }
        //给所有的li绑定移入移出事件
        for(var i=0;i<aLi.length;i++){
            aLi[i].onmouseenter=function(){
                clearTimeout(leave_menu);
                oMenuCont.style.display="block";
                del_li_ac();
                this.className="ac";
                // 让所有的目标区块隐藏，让当前目标区块显示
                //得到自己的data-index自定义属性
                var show_id=this.getAttribute("data-index");
                for(var j=0;j<a_cate_part.length;j++){
                    a_cate_part[j].style.display="none";
                }
                document.getElementById("cate_item"+show_id).style.display="block";

            };

            aLi[i].onmouseleave=function(){
                clearTimeout(leave_menu);
                leave_menu=setTimeout(function(){
                    oMenuCont.style.display="none";
                    del_li_ac();
                },100);
            }
        }

        oMenuCont.onmouseenter=function(){
            clearTimeout(leave_menu);
        };
        oMenuCont.onmouseleave=function(){
            this.style.display="none";
            del_li_ac();
        }
    }
    menuExpansion();
    //轮播图--------------------------------------------------------
    function carouselFigure(){
        var oDiv=document.getElementById("banner");
        var oUl=oDiv.getElementsByTagName("ul")[0];
        var aLi=oUl.getElementsByTagName("li");
        var oOl=oDiv.getElementsByTagName("ol")[0];
        var aBtn=oOl.getElementsByTagName("li");
        var oArrow1=oDiv.getElementsByClassName("prevBtn")[0];
        var oArrow2=oDiv.getElementsByClassName("nextBtn")[0];
        var timer;
        var num=0;
//按钮的个数自动生成
        for(var i=1;i<=aLi.length;i++){
            oOl.innerHTML+="<li></li>";
        }
        aBtn[0].className="ac";
//按钮和图片可以自动切换,按钮和图片同步显示
        function start(){
            timer=setInterval(function(){
                setTab(num);
                num++;
                if(num==aLi.length){ num=0;}
            },1000);
        }
        start();
        function setTab(n){
            for(var i=0; i<aLi.length;i++){
                aLi[i].className="hide";
                aBtn[i].className="";
            }
            aLi[n].className="";
            aBtn[n].className="ac";
        }

//鼠标移入移出，移入停止切换，移出开始切换
        oDiv.onmouseover=function(){
            clearInterval(timer);
            oArrow1.style.display="block";
            oArrow2.style.display="block";
        };
        oDiv.onmouseout=function(){
            clearInterval(timer);
            start();
            oArrow1.style.display="none";
            oArrow2.style.display="none";
        };
//点击某按钮后，鼠标离开焦点图时，自动切换能顺延切换;
        for(var i=0;i<aBtn.length;i++){
            aBtn[i].index=i;
            aBtn[i].onclick=function(){
                setTab(this.index);
                num=this.index;
            }
        }
//点击左右的按钮，可以切换图片和按钮
        oArrow1.onclick=function(){
            var j = 0;
            for(var i=0;i<aLi.length;i++){
                if(aLi[i].className==""){
                    j=i;
                }
            }
            aLi[j].className="hide";
            aBtn[j].className="";
            if(j==0){
                aLi[aLi.length-1].className="";
                aBtn[aLi.length-1].className="ac";
            }else{
                aLi[j-1].className="";
                aBtn[j-1].className="ac";
            }
            num=j;
        };
        oArrow2.onclick=function(){
            var j = 0;
            for(var i=0;i<aLi.length;i++){
                if(aLi[i].className==""){
                    j=i;
                }
            }
            aLi[j].className="hide";
            aBtn[j].className="";
            if(j==aLi.length-1){
                j=0;
                aLi[0].className="";
                aBtn[0].className="ac";
            }else{
                aLi[j+1].className="";
                aBtn[j+1].className="ac";
            }
            num=j+1;
        }
    }
    carouselFigure();

//显示楼层--------------------------------------------------------
    function showFloor(){
        var LocationFloorList=getByClass(document,'LocationFloorList')[0];
        var aLi1=LocationFloorList.getElementsByTagName('li');
        var aFloor=getByClass(document,'floor');
        var arr=[];

        for(var i=0; i<aFloor.length; i++){
            var json={};
            json.name=i;
            json.offsetTop=aFloor[i].offsetTop;
            arr.push(json);
            //console.log(json.offsetTop);
        }


        window.onscroll=function(){
            //显示楼层编号
            var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
            if(scrolltop>1500){
                LocationFloorList.style.display='block';
            }else{
                LocationFloorList.style.display='none';
            }

            // 根据楼层滚动位置，定位编号
            var last_arr=[];
            for(var j=0; j<arr.length; j++){
                if(arr[j].offsetTop<scrolltop+200){//400为接近屏幕的敏感区
                    last_arr.push(arr[j].name);
                }
            }

            //console.log(last_arr);
            var li_index=last_arr[last_arr.length-1];

            for(var l=0; l<aFloor.length; l++){
                aLi1[l].className='';
            }
            //页面上部如果有内容，没有楼层会放入新数组，产生错误
            last_arr.length==0 ?aLi1[0].className='ac':aLi1[li_index].className='ac';
        };

        //点击编号，跳转到相对楼层
        for(var i=0; i<aFloor.length; i++){
            aLi1[i].index=i;
            aLi1[i].onclick=function(){
                var start=document.documentElement.scrollTop || document.body.scrollTop;
                var end=arr[this.index].offsetTop;
                move(start,end);
            }
        }
        //move
        var timer;
        function move(start,end){
            var dis=end-start;
            var count=parseInt(2000/30);
            var n=0;
            clearInterval(timer);
            timer=setInterval(function(){
                n++;
                var a=1-n/count;
                var step_dis=start+dis*(1-a*a*a*a);
                window.scrollTo(0,step_dis);
                if(n==count){
                    clearInterval(timer);
                }
            },30)
        }

        function getByClass(oParent,cls){
            if(document.getElementsByClassName) return oParent.getElementsByClassName(cls);
            else{
                var arr=[]; //容器
                var aEl=oParent.getElementsByTagName('*');//所有标签
                var re=new RegExp("\\b"+cls+"\\b");
                for(var i=0;i<aEl.length;i++){
                    if(re.test(aEl[i].className)) arr.push(aEl[i]);//向数组中添加
                }
                return arr;
            }
        }

    }
    showFloor();

//选项卡-------------------------------------------------------------------
    function tab(){
        var tab=document.getElementsByClassName("tab")[0];
        var oUl=tab.getElementsByClassName("nav")[0];
        var aLi=oUl.getElementsByTagName("li");
        var cont=tab.getElementsByClassName("tab_cont")[0];
        var aDiv=cont.getElementsByClassName("right");
        var timer;
        var num=0;
// 循环给所有的li做点击事件
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                // 关掉所有的li，打开当前li
                setTab(this.index);
                num=this.index;
            }
        }
// 定义函数--显示指定li，隐藏其它li
        function setTab(n){
            // 首先隐藏所有的li;
            for(var i=0;i<aLi.length;i++){
                aLi[i].className="";
                aDiv[i].className="right clearfix hide";
            }
            // 打开指定的li
            aLi[n].className="active";
            aDiv[n].className="right clearfix";
        }
// 选项卡可以进行自动切换;
        function start(){
            timer=setInterval(function(){
                setTab(num);
                num++;
                if(num==aLi.length){num=0}
            },1000);
        }
        start();
        tab.onmouseover=function(){
            clearInterval(timer);
        };
        tab.onmouseout=function(){
            start();
        };
    }
    tab();

    //滑动显示选项卡-------------------------------------------------------------------
    var iconList=document.getElementById("icon_list");
    var iconPopup=document.getElementById("icon_popup");
    var aLi=iconList.getElementsByClassName("icon_active");
    var iconPopup1=iconPopup.getElementsByClassName("icon_popup1");
    var close=iconPopup.getElementsByTagName("i");
    var old_arr=[aLi[0].innerHTML,aLi[1].innerHTML,aLi[2].innerHTML,aLi[3].innerHTML];
    var new_arr=["话费","机票","电影票","游戏"];
    for(var i=0;i<aLi.length;i++){
        aLi[i].index=i;
        aLi[i].onclick=function(){
            move1(iconPopup,{"top":-183});
            for(var j=0;j<iconPopup1.length;j++){
                aLi[j].innerHTML=new_arr[j];
                iconPopup1[j].style.display="none";
                if(j==this.index){
                    iconPopup1[j].style.display="block";
                    for(var k=0; k<close.length;k++){
                        close[k].onclick=function(){
                            move1(iconPopup,{"top":0});
                            for(var l=0;l<aLi.length;l++){
                                aLi[l].innerHTML=old_arr[l];
                            }
                        }
                    }
                }
            }
        }
    }

    //读取样式
    function getStyle(obj, styleName){
        var value=obj.currentStyle ? obj.currentStyle[styleName]:getComputedStyle(obj, false)[styleName];
        return parseInt(value);
    }
    function move1(obj,moveJson,fn,speed){//对象 json 速度（时间） 回调
        var def_speed={ //default
            veryslow:	3000,
            slow:		2000,
            normal:		1000,
            fast:		700,
            veryfast:	300
        };

        //如果输入预定速度的字符串，就进行转换
        if(speed){
            if(typeof speed=='string'){
                speed=def_speed[speed];
            }
        }else{
            speed=def_speed.normal;
        }

        var start={};//json
        var dis={};//json

        for(var key in moveJson){
            start[key]=getStyle(obj, key);
            dis[key]=moveJson[key]-start[key];//距离 distance
        }

        //分段
        var count=parseInt(speed/10);////次数
        var n=0;//步进

        //定时器
        clearInterval(obj.timer);//使用对象属性，定义计时器变量

        obj.timer=setInterval(function(){
            n++;

            for(var key in moveJson){
                var a=1-n/count;  //a的值会越来越小
                var step_dis=start[key]+dis[key]*(1-a*a*a);

                if(key=='opacity'){//透明
                    obj.style.filter='alpha(opacity:'+step_dis*100+')';
                    obj.style.opacity=step_dis;
                }
                else{//其他
                    obj.style[key]=step_dis+'px';
                }
            }

            //取消定时器
            if(n==count){
                clearInterval(obj.timer);
                fn && fn();
            }

        },10);
    }


};




