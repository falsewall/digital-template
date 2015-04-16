var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {
<<<<<<< HEAD


	game.load.spritesheet('boater', 'assets/sprites/boatman.png', 128, 128, 2);//128
	game.load.audio('miss', 'assets/sounds/effects/lightning.ogg');
	game.load.audio('hit', 'assets/sounds/effects/lightdeath.ogg');
	game.load.image('background', 'assets/sprites/ocean.png');
	game.load.spritesheet('lightning', 'assets/sprites/lightning.png', 100, 250, 1);


}
var back;
var winnerText;
var player1;
var player2;
var boater;
var cursors;
var leftKey1;
var rightKey1;
var leftKey2;
var rightKey2;
var qKey;
var ctrlKey;
var ATTACK_RANGE = 50;
var COOLDOWN=1000;
var SLOWLEVEL=100;
var CLOSELIMIT=40;

var p1Cool = 0;
var p2Cool = 0;
var slowTimer = 0;
var b1, b2, b3, b4, b5, b6;
var bolts
var death;
var missed;
var won=0;


function create() {
game.physics.startSystem(Phaser.Physics.ARCADE);
game.world.setBounds(0,0,8000,600);
back=game.add.tileSprite(0, 0, 8000, 600, 'background');
    game.stage.backgroundColor = '#2d2d2d';

	boater = new Boater(200);
	b1 = new Bolt(1000, 4000);
	b2 = new Bolt(1900, 4000);
	b3 = new Bolt(3250, 4000);
	b4 = new Bolt(4000, 4000);
	b5 = new Bolt(5080, 4000);
	b6 = new Bolt(5120, 3000);
	bolts=[b1, b2, b3, b4, b5, b6];
=======

    game.load.spritesheet('phaser1', 'assets/sprites/fighter3_64X128.png', 64, 128, 4);
	game.load.spritesheet('phaser2', 'assets/sprites/fighter2_64X128.png', 64, 128, 4);
	game.load.audio('miss', 'assets/sounds/effects/PunchQuick.ogg');
	game.load.audio('hit', 'assets/sounds/effects/Punch.ogg');
	game.load.image('background', 'assets/sprites/Backdrop.png');


}
var back;
var winnerText;
var player1;
var player2;
var cursors;
var leftKey1;
var rightKey1;
var leftKey2;
var rightKey2;
var qKey;
var ctrlKey;
var ATTACK_RANGE = 50;
var COOLDOWN=1000;
var WALKCYCLE=300;
var CLOSELIMIT=40;

var p1Cool = 0;
var p2Cool = 0;

var punchHit;
var punchMiss;
var won=0;


function create() {

back=game.add.tileSprite(0, 0, 800, 600, 'background');
    game.stage.backgroundColor = '#2d2d2d';
	player1= new Person(200, '1');
	player2= new Person(500, '2');
>>>>>>> origin/gh-pages
	leftKey1 = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
	rightKey1 = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
	leftKey2 = game.input.keyboard.addKey(Phaser.Keyboard.A);
	rightKey2 = game.input.keyboard.addKey(Phaser.Keyboard.D);
	qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
	ctrlKey = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
<<<<<<< HEAD
	winnerText= game.add.text(300, 300, '');
	game.camera.follow(boater.sprite);
	death=game.add.audio('hit');
	miss=game.add.audio('miss');


}
var Bolt = function (x, striketime) {

this.sprite= game.add.sprite(x, 315, ('lightning'));
this.sprite.frame=0;
this.sprite.physicsBodyType = Phaser.Physics.ARCADE;
game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
this.state="off";
this.delay=striketime;
this.timer=0;
this.sprite.visible=false;
this.onScreenTimer=500;
};
var Boater = function (x) {

this.sprite= game.add.sprite(x, 450, ('boater'));
this.sprite.frame=1;
this.sprite.physicsBodyType = Phaser.Physics.ARCADE;
game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
this.state="left";
};

function lightIt()
{
	var i;
	var x;
	
		for(i=0; i<bolts.length;i++)
		{
			x=bolts[i].sprite.x;
			if(bolts[i].timer<game.time.now)
			{
				bolts[i].sprite.visible=true;
				miss.play();
				bolts[i].timer=game.time.now+bolts[i].delay;
				bolts[i].onScreenTimer=game.time.now+500;
				

			}
			if((bolts[i].sprite.visible===true)&&(bolts[i].onScreenTimer<game.time.now))
			{
				bolts[i].sprite.visible=false;
			}
			if((bolts[i].sprite.visible===true)&& (boater.sprite.x+100>x) && (boater.sprite.x<(x+100)))
			{
				won=2;
				death.play();
			}
		}
	

		
}
function update() {
	if(boater.sprite.x>7500)
	{

		boater.sprite.body.velocity.x=0;
		won=1;
		winnerText.text="You Made it the the pier!"
		winnerText.x= boater.sprite.x;
	}
		
	if (won===0)
	{
		lightIt();
		swim(boater);
	}
	if(won===2)
	{
		boater.sprite.body.velocity.x=0;
		winnerText.text="You were killed by lightning."
		winnerText.x= boater.sprite.x;
		boater.sprite.body.velocity.y=90;
	}
}

function swim(man)
{
	if ((man.state==='right')&&(leftKey1.isDown)&&(!(rightKey1.isDown)))
	{
		man.sprite.frame=0;
		man.sprite.body.velocity.x+=60;
		man.state='left';
	}
	if ((man.state==='left')&&(rightKey1.isDown)&&(!(leftKey1.isDown)))
	{
		man.sprite.frame=1; 
		man.sprite.body.velocity.x+=60;
		man.state='right';
	}
	if(slowTimer<game.time.now){
		slowTimer = (game.time.now+SLOWLEVEL);
		if(man.sprite.body.velocity.x>1)
			man.sprite.body.velocity.x-=20;
	}
}



=======
	punchHit=game.add.audio('hit');
	punchMiss=game.add.audio('miss');
	winnerText= game.add.text(300, 300, '');
	
	


}
var Person = function (x, name) {
  this.HP=100;
  this.NAME=name;
  this.sprite= game.add.sprite(x, 450, ('phaser'+this.NAME));
  this.sprite.frame=0;
  this.sprite.physicsBodyType = Phaser.Physics.ARCADE;
  game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  this.state=0;
  this.nameText= game.add.text(x-150, 20, 'Player '+this.NAME)
  this.healthText= game.add.text(x, 20, this.HP+'%')
  this.walkCool=0;
  this.punchAnimationCool=0;
};

function update() {
	if (won===0)
	{

		if(player1.HP<=0)
		{
			winnerText.text='Player 2 Wins!';
			player1.sprite.body.velocity.y=500;
			won=1;
		}
		if(player2.HP<=0)
		{
			winnerText.text='Player 1 Wins!';
			player2.sprite.body.velocity.y=500;
			won=1;
		}
		player1.sprite.body.velocity.x = 0;
		player2.sprite.body.velocity.x = 0;


		if (leftKey1.isDown)
		{
		   player1.sprite.body.velocity.x = -150;
		   walkCycle(player1);
		}
		if(noFarther())
		{
			if (rightKey1.isDown)
			{
			   player1.sprite.body.velocity.x= 150;
			   walkCycle(player1);
			}
			if (leftKey2.isDown)
			{
			   player2.sprite.body.velocity.x = -150;
			   walkCycle(player2);
			}
		}
		if (rightKey2.isDown)
		{
		   player2.sprite.body.velocity.x= 150;
		   walkCycle(player2);
		}
		if (qKey.isDown)
		{
			punch2();
		}
		if (ctrlKey.isDown)
		{
			punch1();
		}
		if((player2.sprite.body.velocity.x===0)&&(game.time.now>p2Cool-500))
			player2.sprite.frame=0;
		if((player1.sprite.body.velocity.x===0)&&(game.time.now>p1Cool-500))
			player1.sprite.frame=0;
	}
}
function walkCycle(guy)
{
	if (game.time.now > guy.walkCool)
	{
		if((guy.sprite.frame!==2))
			guy.sprite.frame=2;
		else
			guy.sprite.frame=1;
		guy.walkCool=game.time.now+WALKCYCLE;
	}
}
function punch1 () {

    if (game.time.now > p1Cool)
    {
		player1.sprite.frame=3;
		p1Cool=game.time.now+COOLDOWN;
        if(rangeCheck())
		{
			punchHit.play();
			player2.HP-=10;
			player2.healthText.text=player2.HP+'%'
		}
		else{punchMiss.play();}

    }
}

function punch2 () {

    if (game.time.now > p2Cool)
    {
		player2.sprite.frame=3;
		p2Cool=game.time.now+COOLDOWN;
        if(rangeCheck())
		{	
			player1.HP-=10;
			punchHit.play();
			player1.healthText.text=player1.HP+'%'
		}
		else{punchMiss.play();}
    }
	
}
>>>>>>> origin/gh-pages

function rangeCheck () {
	if((Math.abs(player1.sprite.body.x - player2.sprite.body.x)<ATTACK_RANGE)||(Math.abs(player2.sprite.body.x - player1.sprite.body.x)<ATTACK_RANGE))
		{return true;}
	return false;
}
function noFarther()
{//return false if players are too close.
	if((Math.abs(player1.sprite.body.x - player2.sprite.body.x)<CLOSELIMIT))
		return false;
	return true;
}

<<<<<<< HEAD

=======
>>>>>>> origin/gh-pages
