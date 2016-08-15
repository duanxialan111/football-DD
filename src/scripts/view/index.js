//引入模板
var indexTpl=require("../templates/index.string");
//引入util
var util=require("../util/util");
var dataJson=null;
//定义视图
SPA.defineView("index",{
	//定义HTML
	html:indexTpl,
	//引入delegated插件，用于定义tap事件
	plugins:["delegated"],
	styles:{
		background:"transparents!important"
	},
	//定义子视图
	modules:[{
		name:"content",//子视图的名称，用于引用的句柄
		defaultTag:"home",//默认子视图
		views:["home","find","my"],//定义子视图集
		container:".m-wrapper"//将子视图中的内容渲染到主视图的容器中
	}],
	//绑定视图事件
	bindEvents:{
		//视图显示出来之前执行的回调函数
		beforeShow:function(){
		},
		//视图显示出来之后执行的回调函数
		show:function(){
		}
	},
	//绑定元素事件
	bindActions:{//动作
		"switch.tabs":function(e,datas){
			//当前高亮显示
			util.setFocus($(e.el));
			//this是对当前视图的一个引用  切换视图
			this.modules.content.launch(datas.tag);
			
		},
		"goto.find":function(){
			//this是对当前视图的一个引用  切换视图my
			SPA.open("find");			
		},
		"goto.my":function(){
			//this是对当前视图的一个引用  切换视图my
			SPA.open("my",{
				ani:{
					name:"dialog"
				}
			});	
			//console.log();		
		}
	}
})
