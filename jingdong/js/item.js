/**
 * Created by hxsd on 2017/1/18.
 */

window.onload=function(){
//放大镜--------------------------------------------------------------------------
    var bigpic =["images/5608b908Ncb4e9b0d (1).jpg","images/5608b909N91c137e1 (1).jpg","images/5608b909Ncb8997c4 (1).jpg","images/5608b909Ne2c4679f (1).jpg","images/5608b90aNc00ec01f (1).jpg"] ;
    var biggerpic = ["images/5608b908Ncb4e9b0d2.jpg","images/5608b909N91c137e12.jpg","images/5608b909Ncb8997c4 (2).jpg","images/5608b909Ne2c4679f (2).jpg","images/5608b90aNc00ec01f (2).jpg"];
    function magnifier(){
        var tab=document.getElementsByClassName("info_left")[0];
        var oUl=tab.getElementsByTagName("ul")[0];
        var aLi=oUl.getElementsByTagName("li");
        var bigimg= document.getElementById("box1");
        var biggerimg = document.getElementById("box2");

// 1 循环给所有的li做移入事件
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onmouseover=function(){
                // 关掉所有的li，打开当前li
                setTab(this.index);
                bigimg.getElementsByTagName("img")[0].setAttribute("src",bigpic[this.index]);
                biggerimg.getElementsByTagName("img")[0].setAttribute("src",biggerpic[this.index]);
            }
        }
// 2 定义函数--显示指定li，隐藏其它li
        function setTab(n){
            // 首先隐藏所有的li;
            for(var i=0;i<aLi.length;i++){
                aLi[i].className="no2";
            }
            // 打开指定的li
            aLi[n].className="no1 ac";
        }

        //放大效果
        var oBox1=document.getElementById("box1");
        var oBox2=document.getElementById("box2");
        var oSpan=oBox1.getElementsByTagName("span")[0];
        var bigImg=oBox2.getElementsByTagName("img")[0];
        oBox1.onmousemove=function(ev){
            ev=ev||event;
            var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
            oSpan.style.display="block";
            oBox2.style.display="block";
            //先显示才能获取尺寸 oSpan尺寸
            var sW=oSpan.offsetWidth;
            var sH=oSpan.offsetHeight;
            //console.log(sW,sH);

            //oBox1尺寸
            var bW=oBox1.offsetWidth;
            var bH=oBox1.offsetHeight;
            var maxX=bW-sW;
            var maxY=bH-sH;

            //滑块坐标=鼠标坐标-oBox1左偏移-滑块宽度/2
            var x=ev.clientX+scrollLeft-this.offsetLeft-sW/2;
            var y=ev.clientY+scrollTop-this.offsetTop-sH/2;
            //限定坐标区域范围
            if(x<=0){x=0;}
            if(x>=maxX){x=maxX;}
            if(y<=0){ y=0;}
            if(y>=maxY){y=maxY;}

            //对span进行坐标定位
            oSpan.style.left=x+"px";
            oSpan.style.top=y+"px";
            var rateX=x/maxX;
            var rateY=y/maxY;
            //对大图进行定位=最大偏移距离*比例
            bigImg.style.left=-(bigImg.offsetWidth-oBox2.offsetWidth)*rateX+"px";
            bigImg.style.top=-(bigImg.offsetHeight-oBox2.offsetHeight)*rateY+"px";
        };
        oBox1.onmouseout=function(){
            oSpan.style.display="none";
            oBox2.style.display="none";
        }
    }
    magnifier();

//切换样式--------------------------------------------------------------------------
    function changeStyle(){
        var chooseList=document.getElementById("choose_list");
        var aLi=chooseList.getElementsByTagName("li");
        for(var i=0;i<aLi.length;i++){
            aLi[i].onclick=function(){
                for(var j=0;j<aLi.length;j++){
                    aLi[j].className="";
                }
                this.className="changecolor";
            }
        }
    }
    changeStyle();

//数量加减--------------------------------------------------------------------------
    function plusMinus(n){
        var oInput=document.getElementById("input1");
        oInput.value=parseInt(oInput.value)+parseInt(n);
        if(oInput.value<1){
            oInput.value=1;
        }
    }
    document.getElementById("plus").onclick=function(){plusMinus(1)};
    document.getElementById("minus").onclick=function(){plusMinus(-1)};


//选项卡--------------------------------------------------------------------------
    function tab(){
        var tab=document.getElementsByClassName("recomm_inner")[0];
        var oUl=tab.getElementsByTagName("ul")[0];
        var aLi=oUl.getElementsByTagName("li");
        var cont=tab.getElementsByClassName("cont")[0];
        var aDiv=cont.getElementsByTagName("div");
        var timer;
        var num=0;
// 1 循环给所有的li做点击事件
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onclick=function(){
                // 关掉所有的li，打开当前li
                setTab(this.index);
                num=this.index;
            }
        }
// 2 定义函数--显示指定li，隐藏其它li
        function setTab(n){
            // 首先隐藏所有的li;
            for(var i=0;i<aLi.length;i++){
                aLi[i].className="";
                aDiv[i].className="hide";
            }
            // 打开指定的li
            aLi[n].className="ac";
            aDiv[n].className="";
        }
// 3 选项卡可以进行自动切换;
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

};


