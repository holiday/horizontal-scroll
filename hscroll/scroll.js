$(function(){

	function isAppleMobile() {
        if (navigator && navigator.userAgent && navigator.userAgent != null) {
            var strUserAgent = navigator.userAgent.toLowerCase();
            var arrMatches = strUserAgent.match(/(iphone|ipod|ipad)/);
            if (arrMatches) 
                 return true;
        } 

        return false;
    }

	var isAppleMobile = isAppleMobile(), wWidth = $(window).width(), mobileRes = 0;

	/**
	*	Offsets each section tag so they are side by side
	*/
	function setSections() {
        var sections = $("section"),
            wWidth = $(window).width(),
            wHeight = $(window).height(),
            wCounter = 0;

            $.each(sections, function(eq) {
                $(this).css({'left': eq * wWidth});           
            }); 
    
    }

    //each time the window resizes we need to set the section offsets again
	$(window).bind('resize', function(){
		setSections();
	});

	//listen for menu clicks and slide to the specified section
	$('.navbar ul li a').click(function(){
		var page = $(this).attr('class');

		var t1 = new TimelineLite();

		var w = window.innerWidth;

		if(page == 'page1'){
			$('section').each(function(i){
				t1.to($(this), 1, {left: i * w});
			});
			t1.play();
		}

		if(page == 'page2'){
			$('section').each(function(i){
				t1.to($(this), 1, {left: (i * w) - w});
			});
			t1.play();
		}

		if(page == 'page3'){
			$('section').each(function(i){
				t1.to($(this), 1, {left: (i * w) - (2 * w)});
			});
			t1.play();
		}
	})

	//first time section offset setup
	setSections();
});
