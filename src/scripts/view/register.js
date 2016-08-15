var registerTpl=require("../templates/register.string");
SPA.defineView("register",{
	html:registerTpl,//Dom结构
	plugins:["delegated"],
	bindEvents:{
		show:function(){

		}
	},
	bindActions:{
		"tap.cancel":function(){
			this.hide();
		}
	}
})