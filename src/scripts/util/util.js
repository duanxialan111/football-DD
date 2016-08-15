var util={
	setFocus:function(el){//添加高亮
		el.addClass("active").siblings().removeClass("active");
	}
}
//使用module.exports这个方法将util对象暴漏出去
module.exports=util;//util为对象名