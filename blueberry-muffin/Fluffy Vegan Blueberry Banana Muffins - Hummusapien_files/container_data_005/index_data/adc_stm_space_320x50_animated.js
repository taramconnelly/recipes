(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"adc_stm_space_320x50_animated_atlas_1", frames: [[0,0,1456,180]]}
];


(lib.AnMovieClip = function(){
	this.currentSoundStreamInMovieclip;
	this.actionFrames = [];
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(positionOrLabel);
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		var keys = this.soundStreamDuration.keys();
		for(var i = 0;i<this.soundStreamDuration.size; i++){
			var key = keys.next().value;
			key.instance.stop();
		}
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var keys = this.soundStreamDuration.keys();
			for(var i = 0; i< this.soundStreamDuration.size ; i++){
				var key = keys.next().value; 
				var value = this.soundStreamDuration.get(key);
				if((value.end) == currentFrame){
					key.instance.stop();
					if(this.currentSoundStreamInMovieclip == key) { this.currentSoundStreamInMovieclip = undefined; }
					this.soundStreamDuration.delete(key);
				}
			}
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			if(this.soundStreamDuration.size > 0){
				var keys = this.soundStreamDuration.keys();
				var maxDuration = 0;
				for(var i=0;i<this.soundStreamDuration.size;i++){
					var key = keys.next().value;
					var value = this.soundStreamDuration.get(key);
					if(value.end > maxDuration){
						maxDuration = value.end;
						this.currentSoundStreamInMovieclip = key;
					}
				}
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.stars = function() {
	this.initialize(ss["adc_stm_space_320x50_animated_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.stem_logo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("ABxEGIAAkKIALihIhZEdIhFAAIhZkdIALChIAAEKIhdAAIAAoLICDAAIAxCdIAbBoIBNkFIB/AAIAAILg");
	this.shape.setTransform(23.4504,23.4467,0.1499,0.1499);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ai2EGIAAoLIFtAAIAABWIkHAAIAACAIDhAAIAABWIjhAAIAACIIEHAAIAABXg");
	this.shape_1.setTransform(7.8017,23.4467,0.1499,0.1499);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgzEFIAAm0IisAAIAAhVIG/AAIAABVIitAAIAAG0g");
	this.shape_2.setTransform(23.4542,7.7942,0.1499,0.1499);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AiSDmQg6grAAhTIBjAAQADAqAZAUQAaAUA2ABQBkAAAAhGQAAgUgSgPQgQgMgfgMIh0gnQgygRgdgdQgiglAAg2QAAhIA3gpQA0gnBTABQBXgBAyAmQA3ApACBVIhjAAQgDgrgXgTQgWgRgugBQgrAAgYARQgYAQAAAcQACAqA4ATIB2AnQB4ApAABbQAABUg8AqQg1AlhcABQhdgBg1gog");
	this.shape_3.setTransform(7.7979,7.7942,0.1499,0.1499);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgOICIAAwDIAdAAIAAQDg");
	this.shape_4.setTransform(15.6104,23.3129,0.1498,0.1498);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AoBAPIAAgdIQDAAIAAAdg");
	this.shape_5.setTransform(23.3092,15.6104,0.1498,0.1498);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AoJIKIAAgeIP1AAIAAv1IAeAAIAAQTg");
	this.shape_6.setTransform(23.4215,23.4252,0.1498,0.1498);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AoBAPIAAgdIQDAAIAAAdg");
	this.shape_7.setTransform(7.908,15.6104,0.1498,0.1498);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AoJIKIAAwTIAeAAIAAP1IP1AAIAAAeg");
	this.shape_8.setTransform(7.7957,23.4252,0.1498,0.1498);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgOICIAAwDIAdAAIAAQDg");
	this.shape_9.setTransform(15.6104,7.9043,0.1498,0.1498);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AHsIKIAAv1Iv1AAIAAgeIQTAAIAAQTg");
	this.shape_10.setTransform(23.4215,7.7919,0.1498,0.1498);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AoJIKIAAwTIQTAAIAAAeIv1AAIAAP1g");
	this.shape_11.setTransform(7.7957,7.7919,0.1498,0.1498);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.stem_logo, new cjs.Rectangle(0,0,31.3,31.3), null);


(lib.stars_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.stars();
	this.instance.setTransform(0,0,0.3,0.3);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.stars_1, new cjs.Rectangle(0,0,436.8,54), null);


(lib.ClipGroup_5 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AgQDhIAAnCIAhAAIAAHCg");
	mask.setTransform(1.7,22.55);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAGAIIAAgFIADAAQABAAABAAQAAgBABAAQAAAAAAgBQABAAAAgBQAAAAgBAAQAAAAAAgBQgBAAAAAAQgBAAgBAAQgDAAgEAEQgFAFgFAAQgIAAAAgIQAAgHAIAAIACAAIAAAFIgCAAQgBAAAAAAQgBABAAAAQgBAAAAABQAAAAAAAAQAAAAAAABQAAABABAAQAAAAABABQAAAAABAAQADAAAFgEQAEgGAFAAQAIAAAAAHQAAAIgIAAg");
	this.shape.setTransform(1.7,44.325);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_5, new cjs.Rectangle(0,43.6,3.4,1.5), null);


(lib.ClipGroup_4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AgQDhIAAnCIAhAAIAAHCg");
	mask.setTransform(1.7,22.55);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgPAIIAAgIQgBgHAIAAIADAAQAFAAAAAEQACgEAFAAIAGAAIADAAIAAAFIgDABIgGAAQgEAAAAACIAAACIANAAIAAAFgAgLAAIAAADIAKAAIAAgCQAAgBAAAAQAAAAAAAAQgBgBAAAAQgBAAgBAAIgEAAQAAAAgBAAQAAAAgBAAQAAABAAAAQgBAAAAAAg");
	this.shape.setTransform(1.7,40.525);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_4, new cjs.Rectangle(0.1,39.7,3.3,1.6999999999999957), null);


(lib.ClipGroup_3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AgQDhIAAnCIAhAAIAAHCg");
	mask.setTransform(1.7,22.55);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AAGAIIAAgFIADAAQABAAABAAQAAgBABAAQAAAAAAgBQABAAAAgBQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAgBAAQgDAAgEAFQgFAFgFAAQgIAAAAgIQAAgHAIAAIACAAIAAAFIgCAAQgBAAAAAAQgBABAAAAQgBAAAAABQAAAAAAAAQAAAAAAABQAAAAABABQAAAAABAAQAAAAABAAQADAAAFgEQAEgFAFAAQAIAAAAAHQAAAIgIAAg");
	this.shape.setTransform(1.7,25.525);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_3, new cjs.Rectangle(0,24.8,3.4,1.5), null);


(lib.ClipGroup_2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AgQDhIAAnCIAhAAIAAHCg");
	mask.setTransform(1.7,22.55);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgPAIIAAgIQAAgHAHAAIAFAAQAIAAAAAHIAAADIALAAIAAAFgAgLAAIAAADIALAAIAAgDQAAAAAAAAQAAgBAAAAQgBAAAAgBQgBAAAAAAIgGAAQAAAAgBAAQAAABgBAAQAAAAAAABQgBAAAAAAg");
	this.shape.setTransform(1.7,15.825);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_2, new cjs.Rectangle(0.1,15.1,3.3,1.5000000000000018), null);


(lib.ClipGroup_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AgQDhIAAnCIAhAAIAAHCg");
	mask.setTransform(1.7,22.55);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgPAIIAAgHQgBgHAIAAIADAAQAFgBAAAEQACgEAFABIAGAAIADgBIAAAFIgDABIgGAAQgEAAAAACIAAACIANAAIAAAFgAgLABIAAACIAKAAIAAgCQAAgBAAAAQAAAAAAAAQgBgBAAAAQgBAAgBAAIgEAAQAAAAgBAAQAAAAgBABQAAAAAAAAQgBAAAAABg");
	this.shape.setTransform(1.7,7.2);

	var maskedShapeInstanceList = [this.shape];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_1, new cjs.Rectangle(0.1,6.4,3.3,1.5999999999999996), null);


(lib.ClipGroup = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	mask.graphics.p("AgQDhIAAnCIAhAAIAAHCg");
	mask.setTransform(1.7,22.55);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgIAIQgIAAAAgIQAAgHAIAAIAEAAIAAAFIgEAAQgBAAAAAAQgBABAAAAQgBAAAAABQAAAAAAAAQAAAAAAABQAAAAABABQAAAAABAAQAAAAABAAIARAAQABAAABAAQAAAAABAAQAAgBAAAAQABgBAAAAQAAAAgBAAQAAgBAAAAQgBAAAAgBQgBAAgBAAIgGAAIAAACIgEAAIAAgHIAKAAQAIAAAAAHQAAAIgIAAg");
	this.shape.setTransform(1.7,0.775);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgPAIIAAgIQgBgHAIABIADAAQAFAAAAADQACgDAFAAIAGAAIADgBIAAAFIgDAAIgGAAQgEABAAACIAAACIANAAIAAAFgAgLAAIAAADIAKAAIAAgCQAAgBAAAAQAAAAAAgBQgBAAAAAAQgBgBgBAAIgEAAQAAAAgBABQAAAAgBAAQAAABAAAAQgBAAAAAAg");
	this.shape_1.setTransform(1.7,2.6);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgIAIQgIAAAAgIQAAgHAIAAIARAAQAIAAAAAHQAAAIgIAAgAgLAAQAAABAAAAQAAABABAAQAAAAABAAQAAAAABAAIARAAQABAAABAAQAAAAABAAQAAAAAAgBQABAAAAgBQAAAAgBAAQAAgBAAAAQgBgBAAAAQgBAAgBAAIgRAAQgBAAAAAAQgBAAAAABQgBAAAAABQAAAAAAAAg");
	this.shape_2.setTransform(1.7,4.55);

	var maskedShapeInstanceList = [this.shape,this.shape_1,this.shape_2];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup, new cjs.Rectangle(0,0,3.4,5.4), null);


(lib.ClipGroup_6 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_2 (mask)
	var mask_1 = new cjs.Shape();
	mask_1._off = true;
	mask_1.graphics.p("AivCwIAAlfIFfAAIAAFfg");
	mask_1.setTransform(17.6,17.6);

	// Layer_3
	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgIAHIAAgNQAAgJAIABQAJgBAAAJIAAANQAAAJgJgBQgIABAAgJg");
	this.shape_3.setTransform(10.425,28);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AivCwIAAlfIFfAAIAAFfgAA/BSQgHAGAAAJIAAAOQAAAKAHAEQAFAFAJgBQAIAAAGgEQAGgEAAgIIAAgDIgLAAIAAACQgBAIgHgBQgJAAAAgIIAAgOQgBgJAJABQAJgBAAAIIAAABIALAAIAAgCQAAgJgHgEQgFgEgIAAQgJAAgFAEgAgrBvQAAASAVAAQAJAAAGgEQAGgFAAgKIAAgfIgNAAIAAAfQAAAJgHAAQgJAAAAgJIAAgfIgNAAgAhWBTQgGAFAAAJIAAAOQAAATAVgBQAJABAGgFQAHgFgBgKIAAgNQABgJgHgGQgGgEgJAAQgIAAgHAFgAiFBSQgGAGAAAJIAAAOQAAAKAGAEQAHAFAJgBQAHAAAGgEQAGgEAAgIIAAgDIgLAAIAAACQgBAIgHgBQgKAAABgIIAAgOQgBgJAKABQAHgBABAIIAAABIALAAIAAgCQAAgJgGgEQgGgEgIAAQgJAAgGAEgAB9CAIAbAAIAAgLIgPAAIAAgmIgMAAgABoCAIAMAAIAAgxIgMAAgAASBjIATAdIAMAAIAAgxIgMAAIAAAcIAAAAIgTgcIgMAAIAAAxIAMAAIAAgdgAAYhJQgTAPABAdIAAAiQAAAbAQAPQAQAPAZAAQAKAAAMgGQANgFAGgIIAAAAIAAAQIAhAAIAAjKIgiAAIAABIIgBAAQgOgRgXAAQgZAAgQAPgAh8gOQgRANAAATQAAAUAPAMQANAMAXAAQAPAAAJgDQAJgEAKgKIAAAAIACAOIAiAAQgDgFAAgbIAAhFQAAgug+AAQgYAAgPAJQgTALAAAXIAAADIAgAAIAAgFQAAgGAHgEQAIgFALAAQAcAAAAAXIAAANIgnAAQgWAAgPAMg");
	this.shape_4.setTransform(17.6,17.6);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgcAAQAAgRAYAAIAhAAIAAAHQAAANgGAGQgHAJgSAAQgaAAAAgSg");
	this.shape_5.setTransform(9.75,19.225);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgVAnQgJgIAAgNIAAgjQAAgOAKgIQAIgGAMAAQANAAAJAHQAJAIAAANIAAAiQAAAPgKAIQgIAGgNAAQgNAAgIgHg");
	this.shape_6.setTransform(24.775,16.225);

	var maskedShapeInstanceList = [this.shape_3,this.shape_4,this.shape_5,this.shape_6];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask_1;
	}

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ClipGroup_6, new cjs.Rectangle(0,0,35.2,35.2), null);


(lib.cta = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgkAnQgQgPAAgYQAAgWAPgQQAPgPAWAAQAXAAAPAPQAPAPAAAYIgBAGIhVAAQACAOALAIQAKAIAPABQATAAALgNIALAMQgPARgbAAQgYAAgQgPgAAigGQgBgOgJgIQgKgJgOAAQgMAAgKAJQgJAIgCAOIBDAAIAAAAg");
	this.shape.setTransform(121.025,20.1);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgbA1IAAhpIASAAIAAASQAKgTAcAAIAAATIgFAAQgPAAgJAJQgIAKAAAPIAAA1g");
	this.shape_1.setTransform(111.35,20.05);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgnAnQgPgPAAgYQAAgWAPgQQAQgPAXAAQAYAAAQAPQAPAQAAAWQAAAYgPAPQgQAPgYAAQgXAAgQgPgAgYgaQgKAKAAAQQAAARAKAKQAJAKAPABQAQgBAJgKQAKgKAAgRQAAgQgKgKQgJgKgQAAQgPAAgJAKg");
	this.shape_2.setTransform(100.35,20.1);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AA3BGIAAhlIgzBUIgIAAIgyhUIAABlIgTAAIAAiLIAQAAIA6BhIA5hhIAQAAIAACLg");
	this.shape_3.setTransform(84.45,18.4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAfA1IAAg5QAAgggcAAQgPABgJAIQgJAKAAARIAAA1IgTAAIAAhpIASAAIAAAQQAMgRAaAAQATAAAMAMQANAMAAAWIAAA8g");
	this.shape_4.setTransform(62.8,20.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgbA1IAAhpIASAAIAAASQAKgTAcAAIAAATIgFAAQgPAAgJAJQgIAKAAAPIAAA1g");
	this.shape_5.setTransform(52.4,20.05);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgiAuQgLgJAAgOQAAgeAqAAIAeAAIAAgEQAAgZgcAAQgTAAgOALIgIgPQARgNAaAAQAtAAAAArIAAA/IgSAAIAAgOQgKAPgYAAQgSAAgKgIgAgaAWQAAAIAGAFQAHAEAKAAQAWABAIgUIAAgOIgdAAQgYAAAAAQg");
	this.shape_6.setTransform(41.4,20.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgkAnQgQgPAAgYQAAgWAPgQQAPgPAWAAQAXAAAPAPQAPAPAAAYIgBAGIhVAAQACAOALAIQAKAIAPABQATAAALgNIALAMQgPARgbAAQgYAAgQgPgAAigGQgBgOgJgIQgKgJgOAAQgMAAgKAJQgJAIgCAOIBDAAIAAAAg");
	this.shape_7.setTransform(29.725,20.1);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgvBGIAAiLIAUAAIAAB6IBLAAIAAARg");
	this.shape_8.setTransform(18.65,18.4);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#FFFFFF").ss(2,1,1).p("AKoi7IAAF3I1PAAIAAl3Aqji7IVFAA");
	this.shape_9.setTransform(70,18.75);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1,-1,138,39.5);


(lib.copy = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AA4BXIAAhbIgtBKIgVAAIgthIIAABZIguAAIAAitIApAAIA9BkIA7hkIApAAIABCtg");
	this.shape.setTransform(188.575,17.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AhFBXIAAitICIAAIAAAmIhXAAIAAAdIBNAAIAAAkIhNAAIAAAhIBaAAIAAAlg");
	this.shape_1.setTransform(168.625,17.45);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgXBXIAAiGIg2AAIAAgnICbAAIAAAnIg1AAIAACGg");
	this.shape_2.setTransform(151.925,17.45);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgqBWQgUgFgNgJIARglQAaASAfgBQAcABAAgOQAAgKgQgFIghgIQgXgGgLgKQgPgLAAgWQAAgZATgQQAVgQAkAAQAlAAAbAPIgQAlQgZgNgXAAQgbAAAAAPQAAAJAPAFQAIACAZAGQAXAFALAJQAQANAAAVQAAAZgUAPQgVARgkAAQgVAAgUgFg");
	this.shape_3.setTransform(135.925,17.45);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AAqBXIhMhcIAABcIgwAAIAAitIAoAAIBNBcIAAhcIAwAAIAACtg");
	this.shape_4.setTransform(110.525,17.45);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AAyBXIgNgiIhJAAIgOAiIgzAAIBNitIAwAAIBOCtgAAWARIgWg3IgWA3IAsAAg");
	this.shape_5.setTransform(90.625,17.45);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("Ag5BCQgcgaAAgoQAAgnAcgaQAbgZAoAAQAxAAAbAhIggAcQgRgUgYAAQgVAAgNANQgOAOAAAWQAAAXAOANQANAOAVAAQAYAAARgUIAgAcQgbAhgxAAQgoAAgbgZg");
	this.shape_6.setTransform(71.775,17.45);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AhFBXIAAitICIAAIAAAmIhXAAIAAAdIBNAAIAAAkIhNAAIAAAhIBaAAIAAAlg");
	this.shape_7.setTransform(47.075,17.45);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AAiBXIAAhDIhDAAIAABDIgxAAIAAitIAxAAIAABBIBDAAIAAhBIAxAAIAACtg");
	this.shape_8.setTransform(28.225,17.45);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgqBWQgUgFgNgJIARglQAaASAfgBQAcABAAgOQAAgKgQgFIghgIQgXgGgLgKQgPgLAAgWQAAgZATgQQAVgQAkAAQAlAAAbAPIgQAlQgZgNgXAAQgbAAAAAPQAAAJAPAFQAIACAZAGQAXAFALAJQAQANAAAVQAAAZgUAPQgVARgkAAQgVAAgUgFg");
	this.shape_9.setTransform(10.075,17.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_9},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.copy, new cjs.Rectangle(0,0,202.7,34.5), null);


(lib.btn_green = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#FFFFFF").ss(1,1,1).p("A5Jj5MAyTAAAIAAHzMgyTAAAg");
	this.shape.setTransform(161,25);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#66FF00").s().p("A5JD6IAAnzMAyTAAAIAAHzg");
	this.shape_1.setTransform(161,25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},3).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,324,52);


(lib.credit = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.ClipGroup();
	this.instance.setTransform(1.7,-4.1,1,1,0,0,0,1.7,22.6);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgCADIAAgFIAFAAIAAAFg");
	this.shape.setTransform(3.1,-20.85);

	this.instance_1 = new lib.ClipGroup_1();
	this.instance_1.setTransform(1.7,-4.1,1,1,0,0,0,1.7,22.6);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("AgQAHIAAgNIAGAAIAAAIIAJAAIAAgGIADAAIAAAGIAKAAIAAgIIAFAAIAAANg");
	this.shape_1.setTransform(1.7,-17.65);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgQACIAAgDIAhAAIAAADg");
	this.shape_2.setTransform(1.7,-16.3);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AgQAHIAAgNIAGAAIAAAIIAKAAIAAgGIADAAIAAAGIAOAAIAAAFg");
	this.shape_3.setTransform(1.7,-15.1);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgQADIAAgFIAhAAIAAAFg");
	this.shape_4.setTransform(1.7,-13.75);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("AgQAHIAAgFIAcAAIAAgIIAFAAIAAANg");
	this.shape_5.setTransform(1.7,-12.575);

	this.instance_2 = new lib.ClipGroup_2();
	this.instance_2.setTransform(1.7,-4.1,1,1,0,0,0,1.7,22.6);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgQALIAAgHIAXgEIgXgDIAAgHIAhAAIAAAFIgXAAIAXAEIAAAEIgXADIAXAAIAAAFg");
	this.shape_6.setTransform(1.7,-8.625);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AgQAEIAAgHIAhgFIAAAFIgHABIAAAFIAHABIAAAFgAgJAAIAPADIAAgEg");
	this.shape_7.setTransform(1.7,-6.375);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AgBAIIAAgGIgGAAIAAgDIAGAAIAAgGIADAAIAAAGIAGAAIAAADIgGAAIAAAGg");
	this.shape_8.setTransform(1.725,-3.725);

	this.instance_3 = new lib.ClipGroup_3();
	this.instance_3.setTransform(1.7,-4.1,1,1,0,0,0,1.7,22.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFFFFF").s().p("AgQAEIAAgHIAhgFIAAAFIgHABIAAAFIAHABIAAAFgAgJAAIAPADIAAgEg");
	this.shape_9.setTransform(1.7,0.675);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgQALIAAgHIAXgEIgXgDIAAgHIAhAAIAAAFIgXAAIAXAEIAAADIgXAEIAXAAIAAAFg");
	this.shape_10.setTransform(1.7,2.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFFFFF").s().p("AgQAEIAAgHIAhgFIAAAFIgHABIAAAFIAHABIAAAFgAgJAAIAPADIAAgEg");
	this.shape_11.setTransform(1.7,5.175);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgQAHIAAgFIAcAAIAAgIIAFAAIAAANg");
	this.shape_12.setTransform(1.7,6.85);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFFFFF").s().p("AgQAHIAAgFIAcAAIAAgIIAFAAIAAANg");
	this.shape_13.setTransform(1.7,8.475);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgQADIAAgFIAhAAIAAAFg");
	this.shape_14.setTransform(1.7,10.525);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AgQAEIAAgHIAhgFIAAAFIgHABIAAAFIAHABIAAAFgAgJAAIAPADIAAgEg");
	this.shape_15.setTransform(1.7,11.95);

	this.instance_4 = new lib.ClipGroup_4();
	this.instance_4.setTransform(1.7,-4.1,1,1,0,0,0,1.7,22.6);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#FFFFFF").s().p("AgQAEIAAgHIAhgFIAAAFIgHABIAAAGIAHAAIAAAFgAgJAAIAPADIAAgEg");
	this.shape_16.setTransform(1.7,15.775);

	this.instance_5 = new lib.ClipGroup_5();
	this.instance_5.setTransform(1.7,-4.1,1,1,0,0,0,1.7,22.6);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.shape_16},{t:this.instance_4},{t:this.shape_15},{t:this.shape_14},{t:this.shape_13},{t:this.shape_12},{t:this.shape_11},{t:this.shape_10},{t:this.shape_9},{t:this.instance_3},{t:this.shape_8},{t:this.shape_7},{t:this.shape_6},{t:this.instance_2},{t:this.shape_5},{t:this.shape_4},{t:this.shape_3},{t:this.shape_2},{t:this.shape_1},{t:this.instance_1},{t:this.shape},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.credit, new cjs.Rectangle(0,-26.7,3.4,45.099999999999994), null);


(lib.ac_logo = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.ClipGroup_6();
	this.instance.setTransform(10.65,10.65,0.85,0.85,0,0,0,17.7,17.7);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.ac_logo, new cjs.Rectangle(-4.4,-4.4,29.9,29.9), null);


(lib.Tween4 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.stem_logo();
	this.instance.setTransform(-12.35,0.15,0.64,0.64,0,0,0,15.7,15.8);

	this.instance_1 = new lib.ac_logo();
	this.instance_1.setTransform(15.8,0.15,0.64,0.64,0,0,0,10.7,10.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.4,-10,47.7,20.1);


(lib.Tween3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.instance = new lib.stem_logo();
	this.instance.setTransform(-12.35,0.15,0.64,0.64,0,0,0,15.7,15.8);

	this.instance_1 = new lib.ac_logo();
	this.instance_1.setTransform(15.8,0.15,0.64,0.64,0,0,0,10.7,10.7);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-22.4,-10,47.7,20.1);


// stage content:
(lib.adc_stm_space_320x50_animated = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	this.actionFrames = [0];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		/* Click to Go to Web Page
		Clicking on the specified symbol instance loads the URL in a new browser window.
		
		Instructions:
		1. Replace http://www.adobe.com with the desired URL address.
		   Keep the quotation marks ("").
		*/
		
		this.btn_green.addEventListener("click", fl_ClickToGoToWebPage);
		
		function fl_ClickToGoToWebPage() {
			window.open(window.clickTag);
		}
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(125));

	// click_tag
	this.btn_green = new lib.btn_green();
	this.btn_green.name = "btn_green";
	this.btn_green.setTransform(160,24.05,1,1,0,0,0,161,25);
	new cjs.ButtonHelper(this.btn_green, 0, 1, 2, false, new lib.btn_green(), 3);

	this.timeline.addTween(cjs.Tween.get(this.btn_green).wait(125));

	// credit
	this.instance = new lib.credit();
	this.instance.setTransform(310.05,46.5,0.7999,0.7999,0,0,0,1.8,22.7);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(109).to({_off:false},0).to({alpha:1},15,cjs.Ease.cubicOut).wait(1));

	// logos
	this.instance_1 = new lib.Tween3("synched",0);
	this.instance_1.setTransform(276.95,24.9);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween4("synched",0);
	this.instance_2.setTransform(276.95,24.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_1}]},109).to({state:[{t:this.instance_2}]},15).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(109).to({_off:false},0).to({_off:true,alpha:1},15,cjs.Ease.cubicOut).wait(1));

	// cta
	this.cta = new lib.cta();
	this.cta.name = "cta";
	this.cta.setTransform(188.95,25.5,0.7,0.7,0,0,0,69,18.8);
	this.cta.alpha = 0;
	this.cta._off = true;
	new cjs.ButtonHelper(this.cta, 0, 1, 1);

	this.timeline.addTween(cjs.Tween.get(this.cta).wait(79).to({_off:false},0).to({alpha:1},20,cjs.Ease.cubicOut).wait(26));

	// copy
	this.instance_3 = new lib.copy();
	this.instance_3.setTransform(160.05,24.95,1,1,0,0,0,101.4,17.2);
	this.instance_3.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).to({alpha:1},39,cjs.Ease.cubicOut).wait(20).to({regY:17.4,scaleX:0.6,scaleY:0.6,x:73,y:25.05},20,cjs.Ease.sineInOut).wait(46));

	// stars
	this.instance_4 = new lib.stars_1();
	this.instance_4.setTransform(150.3,25,1,1,0,0,0,218.3,27);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(125));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(92,23,276.8,29);
// library properties:
lib.properties = {
	id: '4D47C595936F4CD4BF2E6FDE46EF7FAC',
	width: 320,
	height: 50,
	fps: 24,
	color: "#111723",
	opacity: 1.00,
	manifest: [
		{src:"images/adc_stm_space_320x50_animated_atlas_1.png", id:"adc_stm_space_320x50_animated_atlas_1"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['4D47C595936F4CD4BF2E6FDE46EF7FAC'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}			
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;			
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});			
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;			
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused){
			stageChild.syncStreamSounds();
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;