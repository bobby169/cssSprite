(function(window) {
winterpig_hunger = function() {
	this.initialize();
}
winterpig_hunger._SpriteSheet = new createjs.SpriteSheet({images: ["winterpig_hunger.png"], frames: [[0,0,336,429,0,-53.6,217.65],[336,0,336,429,0,-53.6,217.65],[672,0,336,429,0,-53.6,217.65],[0,429,336,429,0,-53.6,217.65],[336,429,336,429,0,-53.6,217.65]]});
var winterpig_hunger_p = winterpig_hunger.prototype = new createjs.Sprite();
winterpig_hunger_p.Sprite_initialize = winterpig_hunger_p.initialize;
winterpig_hunger_p.initialize = function() {
	this.Sprite_initialize(winterpig_hunger._SpriteSheet);
	this.paused = false;
}
window.winterpig_hunger = winterpig_hunger;
}(window));

