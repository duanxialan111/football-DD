var guideTpl=require("../templates/guide.string");
//定义视图
SPA.defineView("guide",{
	//定义HTML
	html:guideTpl,
	//引入delegated插件，用于定义tap事件
	plugins:["delegated"],
	//绑定视图事件
	bindEvents:{
		//视图显示出来之后执行的回调函数
		show:function(){
			var mySwiper=new Swiper(".swiper-container",{
				loop:false,
				autoplay:3000
			});				
		}
	},
	//绑定元素事件
	bindActions:{//动作
		"go.home":function(e){
			SPA.open("index");
		}
	}
})
