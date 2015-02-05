window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });



var map;
var layer;

function preload() {
	
    game.load.image('tileset', 'assets/tilesheets/Industrial-TileSheet.png');
    game.load.tilemap('map', 'assets/tilesheets/industrial.json', null, Phaser.Tilemap.TILED_JSON);


}

function create() {

	map= game.add.tilemap('map');
	map.addTilesetImage('tileset');
	layer = map.createLayer('Tile Layer 1');
	layer.resizeWorld();
	layer.debug = true;
	map.setCollisionBetween(0, 3);
	
   // game.physics.startSystem(Phaser.Physics.ARCADE);

    //game.physics.arcade.gravity.y = 200;



    //game.physics.enable([ ball, tilesprite ], Phaser.Physics.ARCADE);

    //ball.body.collideWorldBounds = true;
    //ball.body.bounce.set(1);

    //tilesprite.body.collideWorldBounds = true;
    //tilesprite.body.immovable = true;
    //tilesprite.body.allowGravity = false;

    //cursors = game.input.keyboard.createCursorKeys();

}



function render() {

    // game.debug.body(tilesprite);

}
};
