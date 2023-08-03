var glade = new TimelineMax;

function init() { 
    main_animation();
}

function main_animation (){

    glade.to (whiteFrame, 1, {delay:0, opacity:0, ease:Power1.easeOut}, "part1");

    glade.staggerFrom(".copy1", 1, {delay:0, x:-10, opacity:0, stagger:.75, ease:Power2.easeInOut}, "part1");

    glade.from (CTA, 1.5, {delay:4, opacity:0, ease:Power1.easeOut}, "part1");

}
