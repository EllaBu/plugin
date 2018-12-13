/*
*selfWindow组建，主要是用于模拟移动网站的alert(),confirm()窗口点解某一按钮跳转到某一个页面的效果,
*因为给予移动web，所以没有兼容低版本ie
*调用方法：var win = new SelfWinsow({
*                    types : "confirm",//这里可以选择的参数有，alert,confirm,confirm2,link
*                    slefTitle : "香送网温馨提示",//弹窗标题
*                    selfInfo : "Are you really to remove this tool?",//弹窗信息
*                    selfOk : "YES",//自定义确定按钮文字
*                    selfNo : "NO",//自定义否认按钮文字
*                    callback:fn,//当types为confirm,confirm2或者是talk时的回调函数，confirm为模拟传统的confirm弹窗，confirm2根据只需要一个按钮的需求定制的，talk则是模拟传统的prompt窗口
*                    linkTo1:"http://blog.sina.com.cn/s/blog_a261421801017wgo.html",//当types为link时第一个按钮的链接
*                    linkTo1:"http://blog.sina.com.cn/s/blog_a261421801017wgo.html",//当types为link时第二个按钮的链接
*            })
*如果不传任何参数，或者配置直接为一个字符串，将默认调用alert,如 new selfWinson() 或者 new selfWinsow("你确定要离开吗？")
*组建还有很多需要改进的地方，欢迎提出改进建议
*开发者：农的传人
*开发者邮箱：546066468@qq.com
*/

var SelfWinsow = function(settings){this.init(settings)};
SelfWinsow.prototype = {
    init:function(settings){
        this.opts = {
            types : "alert",
            slefTitle : "香送网温馨提示",
            selfInfo : typeof settings == "string" ? settings : "相送网温馨提示",
            selfOk : "确定",
            selfNo : "不"
        };

        this.setting(settings);
        if(typeof settings == "string"){
            this.opts.selfInfo == settings;
        }
        if(settings == "" || settings == undefined || settings == null){
            this.selfAlert();
        }else if(settings.types == "confirm"){
            this.selfConfirm();
        }else if(settings.types == "confirm2"){
            this.selfConfirm2();
        }else if(settings.types == "link"){
            this.selfLink();
        }else if(settings.types=="talk"){
            this.selfMobileTalk();
        }else{
            this.selfAlert();
        }
    },
    //confirm窗口
    selfConfirm:function(){
        var _this = this;
        var html="<div id='selfWinsow'><div id='slefClose'><\/div><h2 id='slefTitle'>"+_this.opts.slefTitle+"<\/h2><p id='selInfo'>"+_this.opts.selfInfo+"<\/p><div id='selfOk' class='selfBt selfBtDouble'>"+_this.opts.selfOk+"<\/div><div id='selfNo' class='selfBt selfBtDouble'>"+_this.opts.selfNo+"<\/div><\/div>";
        this.createMask(html);
        this.selfEvents();
    },

    //alert窗口
    selfAlert:function(){
        var _this = this;
        var html="<div id='selfWinsow'><div id='slefClose'><\/div><h2 id='slefTitle'>"+_this.opts.slefTitle+"<\/h2><p id='selInfo'>"+_this.opts.selfInfo+"<\/p><div id='selfOk' class='selfBt selfBtSingle'>"+_this.opts.selfOk+"<\/div><\/div>";
        this.createMask(html);
        this.selfEvents();
    },
    selfConfirm2:function(){
        var _this = this;
        var html="<div id='selfWinsow'><div id='slefClose'><\/div><h2 id='slefTitle'>"+_this.opts.slefTitle+"<\/h2><p id='selInfo'>"+_this.opts.selfInfo+"<\/p><div id='selfOk' class='selfBt selfBtSingle'>"+_this.opts.selfOk+"<\/div><\/div>";
        this.createMask(html);
        this.selfEvents();
    },
    //带链接窗口
    selfLink:function(){
        var _this = this;
        var html="<div id='selfWinsow'><div id='slefClose'><\/div><h2 id='slefTitle'>"+_this.opts.slefTitle+"<\/h2><p id='selInfo'>"+_this.opts.selfInfo+"<\/p><a id='selfOk' href='"+_this.opts.linkTo1+"' class='selfBt selfBtDouble'>"+_this.opts.selfOk+"<\/a><a id='linkTo2' href='"+_this.opts.linkTo2+"' class='selfBt selfBtDouble'>"+_this.opts.selfNo+"<\/div><\/div>";
        this.createMask(html);
        this.selfEvents();
    },

    selfMobileTalk:function(){
        var _this = this;
        var html="<div id='selfWinsow' style='width:100%;margin:0px;top:0;left:0;padding:0; background:none;border:none;font-size:16px'><h2 style='text-align:center; background:#fff' id='slefTitle'><span id='selfNo' style='background:#fff;cursor: pointer;' class='selftalkNo'>"+_this.opts.selfNo+"<\/span>"+_this.opts.slefTitle+"<b id='selfOk' style='background:#fff;color:#ff0028;cursor: pointer;' class='selftalkOk'>"+_this.opts.selfOk+"<\/b><\/h2><textarea style='width:90%; border:1px solid #ccc; font-size:14px; display:block; margin:10px auto; height:120px' id='selfTextarea' placeholder='请填写您的特殊要求'><\/textarea><\/div>";
        this.createMask(html);
        var selfBack = document.getElementById("selfBack");
        selfBack.style.backgroundColor="#eee";
        this.selfEvents();
    },

    //事件处理
    selfEvents:function(){
        this.selfOk();
        var selfNo = document.getElementById('selfNo');
        selfNo && this.slefNo();
    },

    //确定按钮事件
    selfOk:function(){
        var _this = this;
        var type = this.opts.types;
        var bt=true;
        var selfOk = document.getElementById("selfOk");
        function selfOkFun(e){
            var e = e || window.event;
            var el = e.scrElement || e.target;
            if (el.id == "selfOk" || el.tagName=="IMG") {
                if(type == "alert"){
                    _this.selfRemoveBack();
                }else if(type == "confirm" || type == "talk" || "confirm2"){
                    if(bt){
                        _this.opts.callback();
                    }else{
                        return false;
                    }
                    _this.selfRemoveBack();
                    bt=false;
                }

            }
        }

        document.removeEventListener('click',selfOkFun,false);
        document.addEventListener('click',selfOkFun,false);

    },
    //创建背景遮罩
    createMask:function(html){
        var selfBack = document.getElementById("selfBack");

        if(selfBack){
            return false;
        }else{
            var selfBack=document.createElement('div');
            selfBack.id = "selfBack";
            selfBack.style.position = "fixed",
                selfBack.style.top = "0",
                selfBack.style.left = "0",
                selfBack.style.right = "0",
                selfBack.style.bottom = "0",
                document.body.appendChild(selfBack);
            selfBack.innerHTML = html;
            this.slefClose();
        }
    },

    //关闭按钮事件
    slefClose:function(){
        var _this = this;
        document.addEventListener('click',function(e){
            var e = e || window.event;
            var el = e.scrElement || e.target;
            if(el.id == "slefClose"){
                if(_this.opts.callback){
                    _this.opts.callback = function(){};
                    _this.selfRemoveBack();
                    return;
                }
                _this.selfRemoveBack();
            }

        });
    },

    //拒绝或者否认按钮事件
    slefNo:function(){
        var _this = this;
        document.addEventListener('click',function(e){
            var e = e || window.event;
            var el = e.scrElement || e.target;
            if(el.id == "selfNo" ||el.tagName == "IMG"){
                if(_this.opts.callback){
                    _this.opts.callback = function(){};
                    _this.selfRemoveBack();
                    return;
                }
                _this.selfRemoveBack();
            }
        })
    },
    //移除窗口功能
    selfRemoveBack:function(){
        try{
            var selfBack = document.getElementById('selfBack')
            document.body.removeChild(selfBack);
        }catch(e){}
    },

    //参数配置功能函数
    exetends:function(a,b){
        for( var attr in b){
            a[attr] = b[attr];
        }
    },

    //参数配置以及重写
    setting:function(settings){
        this.exetends(this.opts,settings)
    },
}