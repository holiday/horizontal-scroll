$(function(){

	var currentPageIndex = 0;
	var navSelector = '.navbar';

	/**
	*	Animate a page based on its index (first page is index 0 etc..)
	*/
	function animateXTo(pageIndex){

		pageIndex--;
		currentPageIndex = pageIndex;

		setActive("#nav-bar", pageIndex);

		var w = window.innerWidth;

		if (w < 768) {
			$('.navbar-toggle').click();
			var aTag = $("a[name='page-"+ (pageIndex + 1) + "']");
			$('html,body').animate({scrollTop: aTag.offset().top},'fast');
		}else{
			$('section').each(function(i){
				$(this).animate({ left: (i * w) - (pageIndex * w)}, 300);
			});
		}		
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

    /**
    *	Animate to a page based on the hash in the URL
    */
    function forceSectionPosition(hash){
    	//remove hash tag to get class name
    	var sectionClassName = hash.substring(1);
    	//find the section with that class and get its index
    	var pageIndex = $('section.' + sectionClassName).index();
    	//animate to that page
    	animateXTo(pageIndex);
    }

    //each time the window resizes we need to set the section offsets again
	$(window).bind('resize', function(){
		setSections();
	});

	//listen for hash changes
	$(window).on('hashchange', function(){
		forceSectionPosition(window.location.hash);
	})

	//listen for menu clicks and slide to the specified section
	$(navSelector).find('ul li').click(function(){
		var pageIndex = $(this).attr('class').split('-')[1];
		animateXTo(pageIndex);
	});

	//set the default positions of the sections
	setSections();
	forceSectionPosition(window.location.hash);
	
	/**
	*	Removes current active styles and appends active
	*	to the correct li element.
	*/
	var rootname = window.location.pathname;
	var pathname = $(location).attr('href');
});
