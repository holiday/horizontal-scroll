$(function(){


	var currentPageIndex = 0;

	/**
	*	Offsets each section tag so they are side by side
	*/
	function setSections() {

        var w = $(window).width();

        $("section").each(function(i) {
            $(this).css({'left': (i * w) - (currentPageIndex * w)});          
        }); 
    
    }

    //each time the window resizes we need to set the section offsets again
	$(window).bind('resize', function(){
		//setSections();
	});

	//listen for menu clicks and slide to the specified section
	$('.navbar ul li a').click(function(){
		var page = $(this).attr('class');


		var w = window.innerWidth;

		if(page == 'page1'){
			currentPageIndex = 0;
			TweenLite.to($('section.home'), 0.5, {left: 0});
			TweenLite.to($('section.about'), 0.5, {left: w});
			TweenLite.to($('section.blog'), 0.5, {left: 2 * w});
		}

		if(page == 'page2'){
			currentPageIndex = 1;
			TweenLite.to($('section.home'), 0.5, {left: -w});
			TweenLite.to($('section.about'), 0.5, {left: 0});
			TweenLite.to($('section.blog'), 0.5, {left: w});
		}

		if(page == 'page3'){
			currentPageIndex = 2;
			TweenLite.to($('section.home'), 0.5, {left: -2 * w});
			TweenLite.to($('section.about'), 0.5, {left: -w});
			TweenLite.to($('section.blog'), 0.5, {left: 0});
		}
	})

	//first time section offset setup
	setSections();
});
