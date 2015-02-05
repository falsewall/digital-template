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
    

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create});

function preload() {

    //  Texture Atlas Method 2
    //
    //  In this example we assume that the TexturePacker JSON data is a real json object stored as a var
    //  (in this case botData)

    game.load.atlas('bot', 'assets/sprites/running_bot.png', null, botData);

}

var bot;

function create() {

    bot = game.add.sprite(game.world.centerX, 300, 'bot');

    bot.animations.add('run');
    bot.animations.play('run', 10, true);

}

var botData = {
    "frames": [

{
    "filename": "running bot.swf/0000",
    "frame": { "x": 34, "y": 128, "w": 56, "h": 60 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 0, "y": 2, "w": 56, "h": 60 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0001",
    "frame": { "x": 54, "y": 0, "w": 56, "h": 58 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 0, "y": 3, "w": 56, "h": 58 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0002",
    "frame": { "x": 54, "y": 58, "w": 56, "h": 58 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 0, "y": 3, "w": 56, "h": 58 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0003",
    "frame": { "x": 0, "y": 192, "w": 34, "h": 64 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 11, "y": 0, "w": 34, "h": 64 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0004",
    "frame": { "x": 0, "y": 64, "w": 54, "h": 64 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 1, "y": 0, "w": 54, "h": 64 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0005",
    "frame": { "x": 196, "y": 0, "w": 56, "h": 58 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 0, "y": 3, "w": 56, "h": 58 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0006",
    "frame": { "x": 0, "y": 0, "w": 54, "h": 64 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 1, "y": 0, "w": 54, "h": 64 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0007",
    "frame": { "x": 140, "y": 0, "w": 56, "h": 58 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 0, "y": 3, "w": 56, "h": 58 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0008",
    "frame": { "x": 34, "y": 188, "w": 50, "h": 60 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 3, "y": 2, "w": 50, "h": 60 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0009",
    "frame": { "x": 0, "y": 128, "w": 34, "h": 64 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 11, "y": 0, "w": 34, "h": 64 },
    "sourceSize": { "w": 56, "h": 64 }
},
{
    "filename": "running bot.swf/0010",
    "frame": { "x": 84, "y": 188, "w": 56, "h": 58 },
    "rotated": false,
    "trimmed": true,
    "spriteSourceSize": { "x": 0, "y": 3, "w": 56, "h": 58 },
    "sourceSize": { "w": 56, "h": 64 }
}],
    "meta": {
        "app": "http://www.texturepacker.com",
        "version": "1.0",
        "image": "running_bot.png",
        "format": "RGBA8888",
        "size": { "w": 252, "h": 256 },
        "scale": "0.2",
        "smartupdate": "$TexturePacker:SmartUpdate:fb56f261b1eb04e3215824426595f64c$"
    }
};

};
