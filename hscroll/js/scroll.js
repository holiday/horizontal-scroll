$(function(){

	var currentPageIndex = 0;

	function animateXTo(pageIndex){

		setActive("#nav-bar", pageIndex);

		var w = $(window).width();

		$('section').each(function(i){
			$(this).animate({ left: (i * w) - (pageIndex * w)}, 300);
		});
	}

	/**
	*	Nav Active Style..
	*	Removes current active styles and appends active
	*	to the correct li element.
	*/
	function setActive(nav_id, current_index){
		var link = $(nav_id + " li");
		for(var i = 0; i < link.length; i++){
			if(i == current_index){
				link.eq(i).addClass("active");
			}else{
				link.eq(i).removeClass("active");
			}
		}
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
        		$('body').scrollTop(0);
        		$(this).css({'top': 0});
            	$(this).css({'left': (i * w) - (currentPageIndex * w)});          
        	}); 
        }else{
        	$("section").each(function(i) {
        		$(this).css({'left': 0});          
        	}); 
        }
    }

    //each time the window resizes we need to set the section offsets again
	$(window).bind('resize', function(){
		setSections();
	});

	//listen for menu clicks and slide to the specified section
	$('.navbar ul li').click(function(){

		$('.navbar-toggle').click();

		var pageNum = $(this).attr('class').split('-')[1];

		var w = window.innerWidth;

		if (w < 768) {
			var aTag = $("a[name='page-"+ pageNum + "']");
			$('html,body').animate({scrollTop: aTag.offset().top},'fast');
		}else{

			currentPageIndex = pageNum - 1;
			animateXTo(currentPageIndex);
		}


	});

	setSections();
	
	/**
	*	
	*	Removes current active styles and appends active
	*	to the correct li element.
	*/
	var rootname = window.location.pathname;
	var pathname = $(location).attr('href');
});
