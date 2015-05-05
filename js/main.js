var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render  });

function preload() {

game.load.image('foyerDoor', 'assets/sprites/DOOR.png');

game.load.image('portal_o', 'assets/portal_o.png');
game.load.image('portal_g', 'assets/portal_g.png');
game.load.image('portal_r', 'assets/portal_r.png');
game.load.image('portal_y', 'assets/portal_y.png');
game.load.image('portal_b', 'assets/portal_b.png');

game.load.image('green', 'assets/GREEN.png');
game.load.image('purple', 'assets/purple.png');
game.load.image('orange', 'assets/ORANGE.png');
game.load.image('yellow', 'assets/YELLOW.png');
game.load.image('blue', 'assets/BLUE.png');
game.load.image('red', 'assets/RED.png');

game.load.image('feet', 'assets/FEET.png');
game.load.image('book', 'assets/BOOKS.png');
game.load.image('fish', 'assets/FISH.png');
game.load.image('key', 'assets/KEY.png');
game.load.image('plant', 'assets/RADISHS.png');
game.load.image('drops', 'assets/EYEDROPS.png');
game.load.image('yell', 'assets/YELL.png');
game.load.audio('yellowNoise', 'assets/sounds/yellow.mp3');


}
//Inventory
var hasFish = false;
var hasDrops = false;
var hasRadish= false;
var hasBook = false;
var hasKey = false;

var doorSprite;
var fishSprite;
var dropsSprite;
var bookSprite;
var keySprite;
var radishSprite;

var kDrop;
var fDrop;
var bedDrop;
var bathdrop;
var endDrop;
var feetDrop;
var libDrop;

var portal_b;
var portal_y;
var portal_o;
var portal_r;
var portal_g;
var eyeCon;

var backButton;
var background;
var text;
var moist= false;
var yell;
var on=false;

var yellowNoise;

function create() {

game.stage.backgroundColor = '#2d2d2d';
yellowNoise= game.add.audio('yellowNoise');




initFeet();
initKitchen();
initLibrary();
initBathroom();
initEnd();
initBedroom();
initFoyer();

foyer();


 text = game.add.text(10, 16, 'You wake up.', { fill: '#000000' });
	//drops
 	eyeCon= game.add.sprite(100, 500, 'drops');
	eyeCon.scale.set(.5, .5);
	eyeCon.exists=false;
	//Key
	keySprite=game.add.sprite(400, 500, 'key');
	keySprite.exists=false;
	//Radish
	radishSprite=game.add.sprite(250, 500, 'plant')
	radishSprite.exists=false;	
	//Book
	bookSprite= game.add.sprite(600, 450, 'book');
	bookSprite.scale.set(.5,.5);
	bookSprite.exists=false;
	
	//Fish Inventory
	fishSprite = game.add.sprite(400, 480, 'fish');
	fishSprite.scale.set(.5, .5);
	fishSprite.exists=false;
	
	



}
function goBack (r) {
	  if (r.input.pointerOver()) {
		if(r.loc!=='drops'){stopExist();}
		if(r.loc==='blue'){bathroom();portal_g.exists=true;}
		else if(r.loc==='red'){bedroom();portal_g.exists=true;}
		else if(r.loc==='yellow'){
			library();
			portal_g.exists=true;
		}
		else if(r.loc==='green'){foyer();}
		else if(r.loc==='orange'){
			kitchen();
			portal_g.exists=true;
			}
		else if(r.loc==='feet'){
			feet(); 
			text.text= 'You try the door, but it was locked.  \nYou gaze at your feet in thought.';
			portal_g.exists=true;
			}
		else if(r.loc==='drops'){text.text= 'You pick up the bottle at your feet.  \nThey appear to be eye drops.';
			hasDrops=true;
			dropsSprite.exists=false;
			eyeCon.exists=true;
		}
		else if(r.loc==='end'){end();}
  }

}


function initPortals(){
	portal_b= game.add.sprite(0, 250, 'portal_b');
	portal_b.scale.set(0.5,0.5);
	portal_b.inputEnabled = true;
	portal_b.input.pixelPerfectClick= true;
	portal_b.input.useHandCursor = true;
	portal_b.events.onInputDown.add(goBack, this);
	portal_b.loc='blue';
	
	portal_y= game.add.sprite(575, 290, 'portal_y');
	portal_y.scale.set(0.5,0.5);
	portal_y.inputEnabled = true;
	portal_y.input.pixelPerfectClick= true;
	portal_y.input.useHandCursor = true;
	portal_y.events.onInputDown.add(goBack, this);
	portal_y.loc='yellow';
	
	portal_o= game.add.sprite(150, 260, 'portal_o');
	portal_o.scale.set(0.5,0.5);
	portal_o.inputEnabled = true;
	portal_o.input.pixelPerfectClick= true;
	portal_o.input.useHandCursor = true;
	portal_o.events.onInputDown.add(goBack, this);
	portal_o.loc='orange';
	
	portal_r= game.add.sprite(400, 250, 'portal_r');
	portal_r.scale.set(0.5,0.5);
	portal_r.inputEnabled = true;
	portal_r.input.pixelPerfectClick= true;
	portal_r.input.useHandCursor = true;
	portal_r.events.onInputDown.add(goBack, this);
	portal_r.loc='red';
	
	portal_g= game.add.sprite(650, -40, 'portal_g');
	portal_g.scale.set(0.5,0.5);
	portal_g.inputEnabled = true;
	portal_g.input.pixelPerfectClick= true;
	portal_g.input.useHandCursor = true;
	portal_g.events.onInputDown.add(goBack, this);
	portal_g.loc='green';
	portal_g.exists=false;
}
function initFoyer(){
fDrop= game.add.sprite(0, 0, 'green');
initPortals();
door= game.add.sprite(300, 200, 'foyerDoor');
door.loc='feet';
door.scale.set(.5,.5);
door.inputEnabled = true;
door.input.pixelPerfectClick = true;
door.input.useHandCursor = true;
door.events.onInputDown.add(goBack, this)
fDrop.exists=false;	
door.exists=false;

}

function initFeet(){//gives eyedropper
	feetDrop= game.add.sprite(0, 0, 'feet');
	dropsSprite= game.add.sprite(400, 50, 'drops');

	dropsSprite.inputEnabled = true;
	dropsSprite.loc='drops'
dropsSprite.input.pixelPerfectClick = true;
dropsSprite.input.useHandCursor = true;
dropsSprite.events.onInputDown.add(goBack, this)
feetDrop.exists=false;
dropsSprite.exists=false;

}
function initBedroom(){
	bedDrop=game.add.sprite(0,0, 'red');
	bedDrop.exists=false;
}
function initEnd(){
	endDrop = game.add.sprite(0,0, 'purple');
	endDrop.exists=false;
}

function initBathroom(){//gives plant takes fish
	bathDrop=game.add.sprite(0, 0, 'blue');
	bathDrop.exists=false;
}



function initKitchen(){//Gives fish takes eyedropper
	
	kDrop= game.add.sprite(0, 0, 'orange');
	kDrop.exists=false;
	

}

function initLibrary(){//gives book takes plant
	libDrop= game.add.sprite(0, 0, 'yellow');
	yell= game.add.sprite(0,0,'yell');
	yell.exists=false;
	libDrop.exists=false;

	
}

////////////////////////////////////
function foyer() {		
	fDrop.exists=true;	
	door.exists=true;
	portal_b.exists=true;
	portal_y.exists=true;
	portal_o.exists=true;
	portal_r.exists=true;	
}
function kitchen() {
	kDrop.exists=true;
	if(hasFish===true){
		text.text='The eyes look at you less menacingly then normal.';
	}
	else if(hasDrops===true){
		hasFish=true;
		fishSprite.exists=true;
		text.text='The eyes gaze darts to your pocket, then settle on you\n with a bloodshot glare.\n\n You feel them taking control of your consiousness and are\n mentally coerced into applying the drops to the eye.\n\n One of them releases a smelly squid from their grasp.\n\n Gross.. You shove it into your pocket and wonder about your\n life choices.';
	}
	else{text.text='They eyes gaze at you menacingly.\n One of them is having difficulty glaring at you.';}
}
function bathroom() {
	bathDrop.exists=true;
	if(hasRadish===true){
		text.text='The vortex seems to be calmer than usual.';
	}
	else if(hasFish===true){
		hasRadish=true;//give player the radish
		radishSprite.exists=true;
		text.text='The squid in your pocket is sucked out of your into the vortex.\n  It slaps you in the face with a radish it had been hiding hell\n knows where on its way up.';
	}
	else{text.text='A watery vortex swirls around you ascending into the sky.';}
}
function library() {
	if(moist)
		yell.exists=true;
	else
		libDrop.exists=true;
	if(hasBook===true){
		text.text='The wierdo murmurs words to himself from a language long\n lost';
	}
	else if(hasRadish===true){
		hasBook = true;
		bookSprite.exists= true;
		moist=true;
		text.text='Thank you so much,  here is a book I was reading to help\n forget I was hungry.';
		yellowNoise.play('',0, 1, true);
	}
	else{text.text='I am so hungry.';}
	
}


function bedroom(){
	bedDrop.exists=true;
		if(hasKey===true){
		text.text='The female face is silently engrossed in reading.  \nThe husband looks happier than when you first met him.';
	}
	else if(hasBook===true){
		hasKey = true;
		portal_g.loc='end';
		text.text='The female face ruffles through your pocket with frightening\n speed yanking the book from you.\n "Thank you very much!" she says.\n\n You see her husband sigh with relief as silence sets in.\n He tosses a key at you with the tip of his knitting needles.';
	}
	else{text.text='Hello, I am Mar. Whats your name?. Do you have any friends?\n What are you in to?  I am into books! I wish I had one!\n \n What you can only assume in her husband looks at you \nsilently with pleeding eyes.';}

}
function feet(){
	feetDrop.exists=true;
	if(hasDrops===false){
		dropsSprite.exists=true;
	}
}
function stopExist (){//Makes all backgrounds and portals stop existing
	portal_b.exists=false;
	portal_y.exists=false;
	portal_o.exists=false;
	portal_r.exists=false;
	portal_g.exists=false;
	door.exists=false;
	
	fDrop.exists=false;
	bathDrop.exists=false;
	bedDrop.exists=false;
	kDrop.exists=false;
	libDrop.exists=false;
	feetDrop.exists=false;
	endDrop.exists=false;
	yell.exists= false;
	text.text='';
	
}

function update() {


		//winnerText.text="You Made it the the pier!"
		//winnerText.x= boater.sprite.x;

}

function end(){
	endDrop.exists=true;
	text.text="When you head back through the portal, you find your key has\n vanished and you are in a foggy void with an undulating\n presence of great power before you. \nYou feel it searching your consciousness.. not like the eyes,\n in fact you almost want it.\n Your vision begins to fade, when suddenly you are\n jarred awake by a feeling of falling.\n\n In the blink of an eye you find yourself in a white hexagonal\n room without an exit with a your head resting on the leg of a\n dusty hospital bed. \n\n Suddenly you here a faint knocking from one of the walls.\n\n(Fin)";
}
function render() {

    //game.debug.spriteInputInfo(dropsSprite, 32, 32);
    //game.debug.geom(door.input._tempPoint);

}








