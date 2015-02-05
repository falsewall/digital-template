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
    

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    game.load.spritesheet('monster', 'assets/sprites/metalslug_monster39x40.png', 39, 40);

}

var sprite;

function create() {

    sprite = game.add.sprite(300, 200, 'monster');

    sprite.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    sprite.animations.play('walk', 20, true);
    sprite.scale.set(4);
    sprite.smoothed = false;

    game.input.onDown.add(changeTexture, this);

}

function changeTexture() {

    if (sprite.key === 'monster')
    {
        sprite.loadTexture('mummy', 0, false);
    }
    else
    {
        sprite.loadTexture('monster', 0, false);
    }

    // sprite.smoothed = false;

}
};
