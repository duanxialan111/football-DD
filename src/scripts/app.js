//引入spa类库
require("./lib/spa.min");
//引入swiper类库
require("./lib/swiper-3.3.1.min");
//引入视图文件
require("./view/index");
require("./view/home");
require("./view/find");
require("./view/my");
require("./view/guide");
require("./view/detail");
require("./view/register");

//配置信息
SPA.config({
	indexView:"index"
})