$(function(){

	var currentPageIndex = 0;

	function animateXTo(pageIndex){

		setActive("#nav-bar", pageIndex);

		var offsets = [];

		var w = $(window).width();

		$('section').each(function(i){
			offsets.push((i * w) - (pageIndex * w));
		});
		
		TweenLite.to($('section.home'), 0.5, {left: offsets[0]});
		TweenLite.to($('section.about'), 0.5, {left: offsets[1]});
		TweenLite.to($('section.blog'), 0.5, {left: offsets[2]});
	}

	/**
	*	Offsets each section tag so they are side by side
	*/
	function setSections() {
		console.log("setting sections")
        var w = $(window).width();
        var h = $(window).height();

        if(w >= 768){
        	$("section").each(function(i) {
        		$(this).css({'top': 0});
            	$(this).css({'left': (i * w) - (currentPageIndex * w)});          
        	}); 
        }else{
        	$("section").each(function(i) {
        		$(this).css({'left': 0});
            	//$(this).css({'top': (i * h) - (currentPageIndex * h)});          
        	}); 
        }
    }

    //each time the window resizes we need to set the section offsets again
	$(window).bind('resize', function(){
		setSections();
	});

	//listen for menu clicks and slide to the specified section
	$('.navbar ul li a').click(function(){
		var page = $(this).attr('class');

		var w = window.innerWidth;

		if (w < 768) {

			var clzz = $(this).attr('class');

			var aTag = $("a[name='"+ clzz + "']");

			$('html,body').animate({scrollTop: aTag.offset().top},'fast');

		}else{
			if(page == 'page1'){
				currentPageIndex = 0;
				animateXTo(0);
			}

			if(page == 'page2'){
				currentPageIndex = 1;
				animateXTo(1);
			}

			if(page == 'page3'){
				currentPageIndex = 2;
				animateXTo(2);
			}
		}
	});

	setSections();





	// Nav Style
	function setActive(nav_id, current_index){
		var link = $(nav_id + " li");
		for(var i = 0; i < link.length; i++){
			if(i == current_index)
				link.eq(i).addClass("active");
			else
				link.eq(i).removeClass("active");
		}
	}

	
});
