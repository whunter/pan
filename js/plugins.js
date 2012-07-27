// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};

// make it safe to use console.log always
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------

$(document).ready(function() { //when the document is ready...

	//save selectors as variables to increase performance
	var $window = $(window);
	var $hyrule = $('#hyrule');
	var hyruleSize = {};
	hyruleSize.initWidth = parseInt($hyrule.css('width'));
	hyruleSize.initHeight = parseInt($hyrule.css('height'));

	//setDivSize($hyrule);

	$window.resize(function(){ //if the user resizes the window...
		handleScroll(); //move the background images in relation to the movement of the scrollbar
		//setDivSize($hyrule);
	});		
	
	$window.bind('scroll', function(){ //when the user is scrolling...
		handleScroll(); //move the background images in relation to the movement of the scrollbar
	});

	function setDivSize(elem){
		var $elem = $(elem);
		$elem.css({"width": $window.width()});
		$elem.css({"height": $window.width});
	}

	//function to be called whenever the window is scrolled or resized
	function handleScroll(){ 
		var pos = $window.scrollTop(); //position of the scrollbar

		var middle = {};
		middle.x = parseInt(3000 - ($window.width() / 2));
		middle.y = parseInt(1030 - ($window.height()/ 2));
		
		if(pos >= 0 && pos <= 1500) {
			moveDivOnScrollLinear($hyrule, 0, 0, 2036, 1152, 0, 1500, pos);
		}
		else if(pos > 1500 && pos <= 3000) {
			moveDivOnScrollLinear($hyrule, 2036, 1152, 3800, 0, 1501, 3000, pos);
		}
		else if(pos > 3000 && pos <= 4000) {
			moveDivOnScrollLinear($hyrule, 3800, 0, 4095, 0, 3001, 4000, pos);
		}
		else if(pos > 4000 && pos <= 5000) {
			moveDivOnScrollLinear($hyrule, 4095, 0, 4095, 1186, 4001, 5000, pos);
		}
		else if(pos > 5000 && pos <= 6500) {
			moveDivOnScrollLinear($hyrule, 4095, 1186, middle.x, middle.y, 5001, 6500, pos);
		}
		else if(pos > 6500 && pos <= 8000) {
			if($hyrule.css('position') != 'fixed') {
				$hyrule.css({'position': 'fixed'});
			}
			scaleImage($hyrule, hyruleSize.initWidth, hyruleSize.initHeight, middle, 6501, pos, 1);
		}

	}
	
	function scaleImage(elem, initWidth, initHeight, middle, initScrollPos, currentScrollPos, speed) {
		$elem = elem;
		//if(parseInt($elem.css('width')) > $window.width()) {
			var dimension = getScaledDivDimensions(initWidth, initHeight, initScrollPos, currentScrollPos, speed);
			var dx = Math.abs(dimension.width - hyruleSize.initWidth);
			var xpos = -middle.x + (dx / 2);
			var dy =  Math.abs(dimension.height - hyruleSize.initHeight);
			var ypos = -middle.y + (dy / 2);
			/*
			$elem.css({'background-position-x': xpos + 'px', 
				'background-position-y': ypos + 'px',
				'background-size': dimension.width + 'px ' + dimension.height + 'px'
			});
			*/
			
			$elem.animate({
				left: xpos,
				top: ypos,
				width: dimension.width,
				height: dimension.height
			}, 20, function(){
				// response
			});
			
		//}
	}

	function getScaledDivDimensions(initWidth, initHeight, initScrollPos, currentScrollPos, speed) {
		var ratio = getWidthByHeightRatio(initWidth, initHeight);
		var adjustedPos = (currentScrollPos - initScrollPos) / speed;
		var dimension = {};
		if (initWidth > initHeight) {
			dimension.width = initWidth - parseInt(ratio * adjustedPos);
			dimension.height = initHeight - parseInt(adjustedPos);
		}
		else if (initWidth < initHeight) {
			dimension.width = initWidth - parseInt(adjustedPos);
			dimension.height = initHeight - parseInt(ration * adjustedPos);
		}
		return dimension
	}

	function getNewDivWidth(initWidth, initHeight, initScrollPos, currentScrollPos) {
		var ratio = getWidthByHeightRatio(initWidth, initHeight);
		var adjustedPos = (currentScrollPos - initScrollPos) / 10;
		return initWidth - parseInt(ratio * adjustedPos);
	}

	function getWidthByHeightRatio(width, height) {
		if(!isNaN(width) && !isNaN(height)) {
			return parseFloat(width) / parseFloat(height);
		}
		return false;
	}

	function moveDivOnScrollLinear(elem, initX, initY, finalX, finalY, initScrollPos, finalScrollPos, currentScrollPos) {
		var $elem = elem;
		var horiz;
		var vert;
		var adjustedPos = currentScrollPos - initScrollPos;
		var scrollDelta = finalScrollPos - initScrollPos;

		// all of this stuff is handled by margins 
		// so if you want to move something as expected in the xy plane then the x's and y's need to be negated.
		initX = -initX;
		initY = -initY;
		finalX = -finalX;
		finalY = -finalY;

		var dx = Math.abs(finalX - initX);
		var dy = Math.abs(finalY - initY);

		// moving right
		if(finalX > initX) {
			horiz = parseInt(initX + (adjustedPos * (dx / scrollDelta)));
		}
		// moving left
		else if(finalX < initX) {
			horiz = parseInt(initX + (-1 * (adjustedPos * (dx / scrollDelta))));
		}

		// moving down
		if(finalY > initY) {
			vert = parseInt(initY + (adjustedPos * (dy / scrollDelta)));
		}
		// moving up
		else if(finalY < initY) {
			vert = parseInt(initY + (-1 * (adjustedPos * (dy / scrollDelta))));
		}

		$elem.animate({
			left: horiz,
			top: vert	
			//'background-position-x': horiz + 'px',
			//'background-position-y': vert + 'px'
		}, 20, function(){
			// response
		});
	}

});





 



