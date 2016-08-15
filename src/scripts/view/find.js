var findTpl=require("../templates/find.string");
SPA.defineView("find",{
	html:findTpl,//Dom结构
	plugins:["delegated"],
	bindEvents:{
		"show":function(){
			var fxScroll=this.widgets.fixedScroll;
			fxScroll.on("scroll",function(){
				// 如果menu滑到顶部
				if(Math.abs(this.y)>=200){
                    if($(".m-search").siblings(".m-search-menu").length>0){
                      ;
                	}else{
                   	    $(".m-search").after($(".m-search-menu").clone(true).addClass("fixed")); 
                    } 
                }else{
                	$(".m-search-menu.fixed").remove();
                }
			})
		}
	},
	bindActions:{
		
	}
})