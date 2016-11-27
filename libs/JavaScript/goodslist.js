$(function function_name() {
	var indexMain = $(".index-main")
		//延时加载图
		$("img.lazy").lazyload({
			container:indexMain,
			effect: "fadeIn",
			effectspeed:2000,
			event:"scroll"
		});
	var clsMenu = $("#cls-menu");
	var headMenu = $(".head-menu");
	var history = $("#cls-history");
	headMenu.hide();
	//隐藏显示菜单
	clsMenu.on("touchstart",function () {
		headMenu.toggle();
	})
	//返回上一页
	history.on("touchstart",function () {
		window.history.go(-1);
	})
		// 跳转到商品列表
	$(".index-main .col-xs-6").on("click",function () {
		window.location.href="goods.html"; 
	})
})