var homeTpl=require("../templates/home.string");
// 引入util
var util = require("../util/util");
SPA.defineView("home",{
	html:homeTpl,//Dom结构
	//引入delegated插件，用于定义tap事件
	plugins:[
		"delegated",
		{
			name:"avalon",//引入avalon
			options:function(vm){//参数随意写
				vm.livedata=[];
			}
		}
	],
	//初始化
	init:{
		vm:null, 
		livelistArr:[],
		hotSlider:null,
		homeSlider:null,
		//一维数组变为二维数组
		formatData:function(data){
			var tempArr=[];
			for(var i=0; i<Math.ceil(data.length/2); i++){
				tempArr[i]=[];
				tempArr[i].push(data[2*i],data[2*i+1]);
			}
			return tempArr;	
		}		
	},
	//绑定视图事件
	bindEvents:{
		//视图显示出来之前执行的回调函数
		beforeShow:function(){
			//获取视图
			var that=this;
			//获取vm
			that.vm=this.getVM();
			$.ajax({
				//url:"mork/livelist.json",
				url:"/api/getLivelist.php",
				type:"get",
				data:{
					rtype:"origin"//刷新
				},
				success:function(rs){
					//console.log(rs.data);
					//将rs.data挂在vm上 //中间桥梁
					// http://avalonjs.github.io/  
                    // http://cn.vuejs.org/
                    // https://angularjs.org/
                    that.livelistArr = rs.data;
					that.vm.livedata=that.formatData(rs.data);
				},
				error:function(){
					console.log("请求错误");
				}
			})
		},
		//视图显示出来之后执行的回调函数
		show:function(){
			var that = this;
			//引用swiper  热点和关注
			this.hotSlider=new Swiper("#hot-container",{
				loop:false,
				onSlideChangeStart:function(swiper){//swiper滑动之前的回调函数
					//swiper这个参数是对new Swiper出来的实例的引用
			       var index = swiper.activeIndex;
			       util.setFocus($("#hot-gun li").eq(index));
			    }
			});
			//引用swiper 足球现场和足球生活和足球美女
			this.homeSlider=new Swiper("#swiper-slide",{
				loop:false,
				onSlideChangeStart:function(swiper){//swiper滑动之前的回调函数
					//swiper这个参数是对new Swiper出来的实例的引用
			       var index = swiper.activeIndex;
			       util.setFocus($(".m-home nav li").eq(index));
			    }
			});
			//上拉下拉
			var myScroll = this.widgets.homeListScroll;
            var scrollSize = 30;
            myScroll.scrollBy(0,-scrollSize);
            var head=$(".head img"),
                topImgHasClass=head.hasClass("up");
            var foot=$(".foot img"),
                bottomImgHasClass=head.hasClass("down");
            myScroll.on("scroll",function(){
		        var y=this.y,
		            maxY=this.maxScrollY-y;
		            if(y>=0){
		                 !topImgHasClass && head.addClass("up");
		                 return "";
		            }
		            if(maxY>=0){
		                 !bottomImgHasClass && foot.addClass("down");
		                 return "";
		            }
		    })
		   	myScroll.on("scrollEnd",function(){
		        if(this.y>=-scrollSize && this.y<0){
		              myScroll.scrollTo(0,-scrollSize);
		              head.removeClass("up");
		        }else if(this.y>=0){
		              head.attr("src","images/ajax-loader.gif");
		              // 请求加载数据
		              $.ajax({
		                  //url:"mork/livelist-more.json",  //mork数据
		                  url:"/api/getLivelist.php",
		                  type:"get",
		                  data:{
		                     rtype:"refresh"
		                  },
		                  success:function(rs){
		                   /*  var arr = that.livelistArr.concat(rs.data);
		                     that.vm.livedata = that.formatData(arr);
		                     that.livelistArr = arr;*/
		                     that.livelistArr = rs.data.concat(that.livelistArr);
		                     that.vm.livedata = that.formatData(that.livelistArr);   
		                     //console.log(that.vm.livedata);
		                     myScroll.refresh();
		                     myScroll.scrollTo(0,-scrollSize);
		                     foot.removeClass("up");
		                     foot.attr("src","images/arrow.png");
		                  }
		              })		            
		        }
		        var maxY=this.maxScrollY-this.y;
		        var self=this;
		        if(maxY>-scrollSize && maxY<0){
		              myScroll.scrollTo(0,self.maxScrollY+scrollSize);
		              foot.removeClass("down");
		              console.log("refresh");
		        }else if(maxY>=0){
		            foot.attr("src","images/ajax-loader.gif");
		              // 请求加载数据
		              $.ajax({
		                  //url:"mork/livelist-more.json",  //mork数据
		                  url:"/api/getLivelist.php",
		                  type:"get",
		                  data:{
		                     rtype:"more"
		                  },
		                  success:function(rs){
		                   /*  var arr = that.livelistArr.concat(rs.data);
		                     that.vm.livedata = that.formatData(arr);
		                     that.livelistArr = arr;*/
		                     that.livelistArr = that.livelistArr.concat(rs.data);
		                     that.vm.livedata = that.formatData(that.livelistArr);   
		                     //console.log(that.vm.livedata);
		                     myScroll.refresh();
		                     myScroll.scrollTo(0,self.y+maxY);
		                     foot.removeClass("down");
		                     foot.attr("src","images/arrow.png");
		                  }
		              })
		        	}
		      })			
		}
	},
	//绑定元素事件
	bindActions:{//动作
		"hot.slide":function(e){
			//mySwiper.slideTo(index,speed,runClaabacks)
			var index=$(e.el).index();
			this.hotSlider.slideTo(index,1000,true);//切换到哪个slide
		},
		"tap.slide":function(e){
			//mySwiper.slideTo(index,speed,runClaabacks)
			var index=$(e.el).index();
			this.homeSlider.slideTo(index,1000,true);//切换到哪个slide
		},
		"goto.detail":function(e,data){
			//this是对当前视图的一个引用  切换视图detail
			SPA.open("detail",{
				param:data//跳转视图时传递参数
			});		
		}
	}
})