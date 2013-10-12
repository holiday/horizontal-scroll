$(function(){

	var navSelector = '.navbar'; //selector for  your navigation
	var sections = $('section'); //select all sections that will slide
	var currentPageIndex = getSectionIndex(window.location.hash.substring(1)); //stores the current section index so that page can be kept in the window
	var currentHash = window.location.hash;
	var htmlBody = $('html,body'); //cache html and body elements for later use
	var mobile = isMobile(); //detect whether we are starting in mobile or not

	/**
	*	Animate a page based on its index (first page is index 0 etc..)
	*/
	function animatePage(hash){
		//remove hash tag to get class name
    	var sectionClassName = hash.substring(1);
		//find the section with that class and get its index
    	currentPageIndex = getSectionIndex(sectionClassName);
    	currentHash = hash;

		var w = window.innerWidth;

		//horizontal animation
		if (!isMobile()) {
			sections.each(function(i){
				$(this).animate({'left': (i * w) - (currentPageIndex * w)}, 300); 	
			});
		}
	}

	function animateToAnchor(id){
		htmlBody.animate({scrollTop: $( id ).offset().top},'fast');
	}

	/**
	*	Offsets each section tag so they are side by side
	*/
	function setSections() {

        if(!isMobile()){
        	var w = window.innerWidth;
        	sections.each(function(i) {
        		//check if were going from mobile to a larger screen
        		if(mobile){
        			$('body').scrollTop(0);
        			$(this).css({'top': 0});
        			mobile = false;
        		}
            	$(this).css({'left': (i * w) - (currentPageIndex * w)});          
        	}); 
        }else{
        	mobile = true;
        	sections.each(function(i) {
        		$(this).css({'left': 0});        
        	}); 
        }
    }

    /**
    *	Return the <section> element index based on its
    *	order on the page
    */
    function getSectionIndex(clazz){
    	var i;
  		var len = sections.length;
    	for(i=0; i < len; i++){
    		if($(sections[i]).attr('id') == clazz){
    			return i;
    		}
    	}
    	return null;
    }

    /**
    *	Determine whether were on a mobile or some 
    *	other device
    */
    function isMobile(){
    	var pageWidth = $(window).width();
    	if(pageWidth >= 768){
    		return false;
    	}
    	return true;
    }

    //each time the window resizes we need to set the section offsets again
	$(window).bind('resize', function(){
		setSections();
	});

	//listen for hash changes
	$(window).on('hashchange', function(){
		//animate to that page
    	animatePage(window.location.hash);
	});

	
	$('nav ul li a').click(function(e){
		if(isMobile()){
			currentHash = $(this).attr('href');
			animateToAnchor(currentHash);
            window.location.hash = currentHash;
			return false;
		}
	});
	
	//set the default positions of the sections
	setSections();

    //if were in mobile view and we loaded on a hash, scroll to that location
	if(isMobile() && currentHash){ animateToAnchor(currentHash); }
});
