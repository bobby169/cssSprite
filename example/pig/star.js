﻿(function(window) {
friend_donut_star = function() {
	this.initialize();
}
friend_donut_star._SpriteSheet = new createjs.SpriteSheet({images: ["star.png"], frames: [[0,0,118,92,0,-45.1,-1170.4],[118,0,118,92,0,-45.1,-1170.4],[236,0,118,92,0,-45.1,-1170.4],[354,0,118,92,0,-45.1,-1170.4],[0,92,118,92,0,-45.1,-1170.4],[118,92,118,92,0,-45.1,-1170.4],[236,92,118,92,0,-45.1,-1170.4],[354,92,118,92,0,-45.1,-1170.4],[0,184,118,92,0,-45.1,-1170.4],[118,184,118,92,0,-45.1,-1170.4],[236,184,118,92,0,-45.1,-1170.4],[354,184,118,92,0,-45.1,-1170.4],[0,276,118,92,0,-45.1,-1170.4],[118,276,118,92,0,-45.1,-1170.4],[236,276,118,92,0,-45.1,-1170.4],[354,276,118,92,0,-45.1,-1170.4],[0,368,118,92,0,-45.1,-1170.4],[118,368,118,92,0,-45.1,-1170.4],[236,368,118,92,0,-45.1,-1170.4],[354,368,118,92,0,-45.1,-1170.4],[0,460,118,92,0,-45.1,-1170.4],[118,460,118,92,0,-45.1,-1170.4],[236,460,118,92,0,-45.1,-1170.4],[354,460,118,92,0,-45.1,-1170.4],[0,552,118,92,0,-45.1,-1170.4],[118,552,118,92,0,-45.1,-1170.4],[236,552,118,92,0,-45.1,-1170.4],[354,552,118,92,0,-45.1,-1170.4],[0,644,118,92,0,-45.1,-1170.4],[118,644,118,92,0,-45.1,-1170.4],[236,644,118,92,0,-45.1,-1170.4]]});
var friend_donut_star_p = friend_donut_star.prototype = new createjs.Sprite();
friend_donut_star_p.Sprite_initialize = friend_donut_star_p.initialize;
friend_donut_star_p.initialize = function() {
	this.Sprite_initialize(friend_donut_star._SpriteSheet);
	this.paused = false;
}
window.friend_donut_star = friend_donut_star;
}(window));

