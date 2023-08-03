// JavaScript Document
//--------------- :: PreLoad Images :: ---------------//
this.addEventListener("DOMContentLoaded", preloadImages, true);
var loadedImages = 0;
var imageArray = new Array('frame2.jpg', 'spritesheet.png');

function preloadImages(e) {
    for (var i = 0; i < imageArray.length; i++) {
        var tempImage = new Image();
        tempImage.addEventListener("load", trackProgress, true);
        tempImage.src = imageArray[i];
    }
}

function trackProgress() {
    loadedImages++;
    if (loadedImages == imageArray.length) {
        imagesLoaded();
    }
}

//--------------- :: Set up variables :: ---------------//
var btnCTA;

//--------------- :: Initialize :: ---------------//
init_standard = function () {

    document.getElementById("frame2").style.backgroundImage = "url(frame2.jpg)";
    document.getElementById("logo_brand_standard").style.backgroundImage = "url(spritesheet.png)";
    document.getElementById("company_logo").style.backgroundImage = "url(spritesheet.png)";

    fadeFrame = document.getElementById('frame0');
    btnCTA = document.getElementById('btn_exit');

    //standard pi links
    piExit = document.getElementById('isi_PI_standard_std');
    piBodyExit = document.getElementById('isi_body_link_PI');



    addListeners_standard();
    tl_main.play();

    setTimeout(function () {
        tl1_isi.play();
    }, 5500)
};

//--------------- :: Interactivity :: ---------------//
addListeners_standard = function () {
    btnCTA.addEventListener('click', ctaExitHandler, false);
    piBodyExit.addEventListener('click', piExitHandler, false);
    piExit.addEventListener('click', piExitHandler, false);
};
ctaExitHandler = function (e) {
    //Call Exits
    console.log("clickTag1");
    Enabler.exit('clickTag1');
    turnOffTimeline();
};
piExitHandler = function (e) {
    //Call Exits
    console.log("clickTag2");
    Enabler.exit('clickTag2');
    turnOffTimeline();
};

//--------------- :: Loop Animation + counter :: ---------------//

var loopInt_standard = 0; // This variable tracks how many times the ad has played
var currSecond = 0; // This variable tracks seconds

loopAnimation = function () {

    loopInt_standard++;

    if (loopInt_standard < 2) {
        tl_main.play('start_animation');
        currSecond = 0;
    }

    if (loopInt_standard <= 1) {
        isi_standard.style.display = 'none';
    }

    if (loopInt_standard <= 1) {
        isi_PI_standard_std.style.display = 'none';
    }

    if (loopInt_standard >= 1) {
        fadeFrame.style.display = 'none';
    }

    if (loopInt_standard >= 1) {
        setTimeout(function () {
            tl2_isi.play();
        }, 5500)
    }

};


function runCounter() {
    currSecond++;
    //console.log(Math.round(currSecond / 60)); // turn off after QA. consider removing onUpdate event
}


//--------------- :: SCENE Animations :: ---------------//


//--------------- :: ISI Animations :: ---------------//
ScrollToPlugin.autoKillThreshold = 2;
var tl1_isi = new TimelineLite({ paused: true });
tl1_isi
    .to('#isi_scroll_std', 40, { scrollTo: { y: "max", autoKill: true }, ease: Linear.easeNone })

var tl2_isi = new TimelineLite({ paused: true });
tl2_isi
    .to('#isi_scroll_std', 35, { scrollTo: { y: "max", autoKill: true }, ease: Linear.easeNone })
    .to('#isi_scroll_std', 3, { scrollTo: { y: 0 }, ease: Power4.easeInOut }, '+=1');


//--------------- :: SCENE Animations :: ---------------//

var tl_main = new TimelineLite({ onUpdate: runCounter, paused: true });

tl_main
    .add('load_ad')

    .to('#container_standard', 0.25, { opacity: 1 }, 0.25)
    .to('#all_scenes_standard', 0.25, { opacity: 1, ease: 'Power2.easeOut' }, 0.25)
    .add('start_animation')

    //scene 1
    .to([scn1, scn0], 0.25, { opacity: 1, ease: 'Power4.easeIn' }, 0.25)

    //scene 2
    .to([scn1, scn0, frame1], 0.25, { opacity: 0, ease: 'Power1.easeIn' }, 2.75)
    //scene 3

    .to([scn2, scn3, frame2], 0.25, { opacity: 0, ease: 'Power1.easeIn' }, 5.25)
    //.to([scn2, scn3, frame2], 0.65, { x: '-300px', ease: 'Power1.easeIn' }, 5.5)
    .to([btn_exit], 0.01, { height: '160px' }, 5.25)
    .to([isi_PI_standard_std, isi_standard], 0.01, { display: 'block' }, 5.24)
    .to([isi_PI_standard_std, isi_standard], 0.25, { opacity: 1 }, 5.25)

    //scene 4
    //.to([scn4], 0.35, { top: '55px', ease: 'Power4.easeOut' }, 8.8)
    .to([scn4], 0.25, { opacity: 0, ease: 'Power4.easeOut' }, 8)
    .to([scn5], 0.25, { opacity: 1, ease: 'Power4.easeIn' }, 8)

    //scene 5
    .to([scn5], 0.25, { opacity: 0, ease: 'Power4.easeOut' }, 12.5)
    .to([scn7], 0.25, { opacity: 1, ease: 'Power4.easeIn' }, 12.5)
    .to([frame0], 0.25, { opacity: 1, ease: 'Power2.easeIn' }, 14.5)

    // loop
    .add(function () { console.log('loopAnimation = ' + loopInt_standard); }, 15)
    .add(function () { loopAnimation(); })
    .add(function () { console.log('Banner Completed'); })
    ;

//--------------- :: Stop All Animation :: ---------------//
turnOffTimeline = function () {
    tl1_isi.pause();
    TweenLite.set('#isi_scroll_std, #isi_scroll_rm', { scrollTo: { y: 0 } });
    fadeFrame.style.display = 'none';
    tl_main.pause('stopLastFrame');
};
tl_main.play();
//--------------- :: Preloader function :: ---------------//
function imagesLoaded() {
    // do something
    init_standard();
}
