$(function () {
		// 轮播图
	var swiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        spaceBetween: 0,
	        autoplay : 3000,
	        loop:true,
	});	

	// search
	var $indexSearch = $("#index-search");
	var $closeSearch = $("#close-search");
	$(".search-page").hide();
	$indexSearch.on("click",function () {
		$(".search-page").show();
	})
	$closeSearch.on("click",function () {
		$(".search-page").hide();
	})

	// 点击回到顶部
	var $goUp = $("#go-Up");
	var $indexBody = $(".index-body");
	$goUp.hide();
	$goUp.on("click",function(){
		$indexBody.scrollTop(0);
	})
	$indexBody.scroll(function() {
	 	if ($indexBody.scrollTop()>=1200) {
	 		$goUp.show();
	 	}else{
	 		$goUp.hide();
	 	}
	});

	//延时加载图
		$("img.lazy").lazyload({
			container:$indexBody,
			effect: "fadeIn",
			effectspeed:2000,
			event:"scroll"
		});
		

	//下拉加载更多
	//手机端，不能滚轮
	// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	var myScroll;
	var frequ = 0;//加载次数
	 window.setTimeout(function () {
		myScroll = new IScroll('#wrapper', { 
			bounceEasing: 'elastic',
			bounceTime: 1200,
		});
		//拉动结束的时候
		myScroll.on('scrollEnd', onScrollMove);
	},100)
	 function onScrollMove () {
	 	//判断是否到达最后
	 	if (myScroll.maxScrollY <= myScroll.y) {
	 		return false;
	 	}
	 	frequ++;
		//ajax
		//判断是否有缓存、第一次拉倒下面
		if (window.localStorage.getItem("indexTheme") == null) {
			$.get('libs/data/index1.txt', function(data) {
				window.localStorage.setItem("indexTheme",data);
				var jsonTieme = JSON.parse(window.localStorage.getItem("indexTheme")).theme;
				var themeLength = jsonTieme.length;//主题的长度			
				createThemeEle(frequ,jsonTieme,themeLength);
			});
		}else{
			var jsonTieme = JSON.parse(window.localStorage.getItem("indexTheme")).theme;
			var themeLength = jsonTieme.length;//主题的长度
			createThemeEle(frequ,jsonTieme,themeLength);
		}
	}

	function createThemeEle(frequ,jsonTieme,themeLength) {
		if (frequ <= themeLength) {
			$(jsonTieme).eq(frequ-1).each(function(index, el) {
				console.log(frequ);
				console.log(el);
				for(var i = 0; i<el.theme.length; i++){
					createTheme(el.theme[i]);
				}
			});
			myScroll.refresh();
		}
		function createTheme(el) {
			console.log(el);
			console.log(el.src);
			var _html = '';
			_html += '<div class="col-xs-12"><img class="lazy" data-original="'+el.src;
			_html += '" src="libs/images/loading/1392662628672.gif"></div><div class="col-xs-8"><p>'+el.exp;
			_html += '</p><b>¥</b><span>'+el.price+'</span></div>';
			$('<div class="row index-theme"></div>').appendTo('.index-panel').html(_html);			
		}

	}
})

