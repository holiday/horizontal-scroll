$(function(){

	var currentPageClass = 'section.home';
	var currentPageIndex = 0;

	function animateTo(pageIndex){

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

        var w = $(window).width();

        $("section").each(function(i) {
            $(this).css({'left': (i * w) - (currentPageIndex * w)});          
        }); 
    
    }

    //each time the window resizes we need to set the section offsets again
	$(window).bind('resize', function(){
		setSections();
	});

	//listen for menu clicks and slide to the specified section
	$('.navbar ul li a').click(function(){
		var page = $(this).attr('class');

		var w = window.innerWidth;

		if(page == 'page1'){
			currentPageIndex = 0;
			animateTo(0);
		}

		if(page == 'page2'){
			currentPageIndex = 1;
			animateTo(1);
		}

		if(page == 'page3'){
			currentPageIndex = 2;
			animateTo(2);
		}
	});

	$('section.about').scroll(function(){
		var x = $(this).scrollTop();
	});

	//first time section offset setup
	setSections();
});
