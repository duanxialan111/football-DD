var detailTpl=require("../templates/detail.string");
SPA.defineView("detail",{
	html:detailTpl,//Dom结构
	//引入delegated插件，用于定义tap事件
	plugins:["delegated",{
		name:"avalon",
		options:function(vm){
			vm.imgsrc=null;
			vm.title=null;
			vm.description=null;
			vm.isShowLoading=true;//第三方变量
		}
	}],
	//绑定视图事件
	bindEvents:{
		//视图显示出来之前执行的回调函数
		beforeShow:function(){			
		},
		//视图显示出来之后执行的回调函数
		show:function(){
			var vm=this.getVM();
			var id =this.param.id;
			$.ajax({
				//url:"mork/livedetail.json",
				url:"/api/getLiveDetail.php",
				data:{
					id:id
				},
				success:function(rs){
					//console.log(rs.data);
					vm.imgsrc=rs.data.imgsrc;
					vm.title=rs.data.title;
					vm.description=rs.data.description;	
					setTimeout(function(){
						vm.isShowLoading=false;
					},1000)
				}
			})			
		}
	},
	bindActions:{
		"goto.back":function(){
			//this是对当前视图的一个引用  切换视图index
			SPA.open("index");
		}
	}
})
