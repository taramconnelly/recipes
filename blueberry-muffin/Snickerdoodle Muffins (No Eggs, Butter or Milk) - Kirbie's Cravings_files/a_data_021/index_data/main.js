// JS animation
animateMe = function() {
	var endAd = false;
	var playTimes = 2;
	var t1=new TimelineLite(
	{onComplete:function(){
		if (playTimes > 1) {
			playTimes -= 1;
			//this.restart();
			} else {
				TweenLite.delayedCall(.5,addListeners);
			}
		}
	})
	
// f1
	t1.addLabel("f1");
	
	//t1, 2, and 3 enter from the right
	t1.to('.footer', .0, {autoAlpha:100, x:0, delay:.0}, "f1");
	t1.from('.slide1', .0, {autoAlpha:0, x:0, delay:.0}, "f1");
	
	
	//t1, 2, and 3 exit left
	t1.from('.swipe', .9, {autoAlpha:100, x:1028, delay:3.1}, "f1");
	t1.to('.slide1', .6, {width:0, delay:3.1}, "f1");
	t1.to('.footer', .0, {autoAlpha:0, x:0, delay:3.4}, "f1");
	t1.from('.slide2', .3, {autoAlpha:100, x:0, delay:2.0}, "f1");
	
	//t5 moves and t6 enters
	t1.from('.swipe2', .9, {autoAlpha:100, x:1028, delay:6.8}, "f1");
	t1.to('.slide2', .7, {width:0, delay:6.8}, "f1");
	
	//Glimmer
	t1.to('.glimmer', .75, {x:190, delay:2},);
	

};


// glimmer listeners
addListeners = function() {
		rolloverCatch.addEventListener('mouseover', doGlimmer, false);
};
doGlimmer = function() {
		TweenLite.set('#glimmer-cta',{left:-120});
		TweenLite.to('#glimmer-cta', .5,{left:200, ease:Quad.easeOut, delay:.1});
};


// init
init_ad = function() {
	animateMe();
};

