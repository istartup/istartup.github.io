// Created by Taras Serevann
// my email: serewann@gmail.com
// my vk page: vk.com/taras_serevann

// Sorry for my code, i am newbie in javascript and phaser.
// And sorry for my english, it's not my native language, but i'm trying :)

window.onload = function() {

		var aMovable = true;
		var kaboom;
		var updateEnable = false;
		var GameStart = false;
		var timeout;
		var exit = false;
		var gameWidth = window.innerWidth;
		if (gameWidth > 1920) { gameWidth = 1920; }
		var gameHeight = window.innerHeight;
		var score = 1;
		var bestScore = 1;
		var t;
		var t1;
		var t2;
		var t3;

		var background;
		var spaceship;

			// Height and width of our spaceship sprite
			var spaceshipWidth = 140;
			var spaceshipHeight = 125;

			// Speed of spaceship and acceleration
			var SPEED = 2.5;
			var spaceshipSpeed = SPEED;
			var spaceshipAcceleration = 0;

			// spaceship rotation
			var rotated = false;
			var rotation = 0.25;

			var sH; // for collide detect
			var sW; // for collide detect

		var cursors;
		var asteroids;
		var asteroid = [];
			var aW; // asteroid half width (for collide detect)
			var aH; // asteroid half height (for collide detect)

        var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update });
        
        function preload () {
	    	game.load.image('space', 'assets/deep-space.jpg');
	    	game.load.image('spaceship', 'assets/spaceship.png');
	    	game.load.spritesheet('kaboom', 'assets/explode.png', 256, 256);
	    	game.load.image('button', 'assets/button_sprite.png');

	    	// load asteroids

	    	// big type of asteroids
		    	game.load.image('a1', 'assets/asteroid1.png');
		    	game.load.image('a2', 'assets/asteroid2.png');
		    	game.load.image('a3', 'assets/asteroid3.png');
	    	
	    	// small type of asteroids
		    	game.load.image('a4', 'assets/asteroid4.png');
		    	game.load.image('a5', 'assets/asteroid5.png');


        }

        function getRandomAsteroid (typeAsteroid) {
        	
        	if (typeAsteroid == 'big') {
         		var asteroidsArray = ['a1', 'a2', 'a3'];
         	} else { // small
         		var asteroidsArray = ['a4', 'a5'];
         	}

        	return asteroidsArray[Math.floor(Math.random()*asteroidsArray.length)];
        }

  

        function addAsteroids (typeAsteroid, amount, frequency) {
        	var typeAsteroid = typeAsteroid;

        	if (amount == null && frequency != null)  {
	        	amount = game.world.width/frequency;
        	} else if (amount == null && frequency == null) {
        		console.log('Error in AddAsteroids(): need frequency or amount');
        		return 'Error in AddAsteroids(): need frequency or amount';
        	}

        	for (var i = 0; i < amount; i++) {
	       		asteroid[i] = game.add.sprite(game.world.randomX, game.world.randomY - game.world.height - (i * 200), getRandomAsteroid(typeAsteroid) );
	    		asteroid[i].anchor.x = 0.5;
	        	asteroid[i].anchor.y = 0.5;

	        	if (Math.random() > 0.5) {
	        		asteroid[i].rotationWay = -1;
	        	} else {
	        		asteroid[i].rotationWay = 1;
	        	} 

	    		// add asteroid to group
	    		asteroids.add(asteroid[i]);
	    		game.physics.enable(asteroid[i], Phaser.Physics.ARCADE);
    		}
        }

       

        // show score and reset position
        function startNewGame (text, text2) {
        	// show score 
    		t = game.add.text(game.world.centerX, game.world.centerY-100, '', { font: "60px Arial", fill: "#ffffff", align: "center" });
    		t.text = text;
	  	    t.x -= t._width/2;
	  	    t.y -= t._height/2;

	  	    t1 = game.add.text(game.world.centerX, game.world.centerY-100+t._height, '', { font: "30px Arial", fill: "#ffffff", align: "center" });
	  	    t1.text = text2;
	  	    t1.x -= t1._width/2;
	  	    t1.y -= t1._height/2;

	  	    t2 = game.add.text(game.world.centerX, game.world.centerY-110+t1._height*2+t._height, '', { font: "20px Arial", fill: "#ffffff", align: "center" });
	  	    t2.text = 'Game will restart after 5 seconds';
	  	    t2.x -= t2._width/2;
	  	    t2.y -= t2._height/2;

	  	    t3 = game.add.text(game.world.centerX, game.world.height, '', { font: "15px Arial", fill: "#ffffff", align: "center" });
	  	    t3.text = 'Created by Taras Serevann (serewann@gmail.com) \n vk.com/taras_serevann';
	  	    t3.x -= t3._width/2;
	  	    t3.y -= t3._height+10;
	  	    t3.alpha = 0.9;


	  	    background.alpha = 0.5;
	  	  	asteroids.visible = false;
	  	    spaceship.visible = false;
	  	    game.paused = true;

	 

	  	    

	  	    // it didn't work with loop 
	  	    setTimeout(function() {
				  	t2.text = 'Game will restart after 4 seconds';
			}, 1000);

			setTimeout(function() {
				  	t2.text = 'Game will restart after 3 seconds';
			}, 2000);

			setTimeout(function() {
				  	t2.text = 'Game will restart after 2 seconds';
			}, 3000);

			setTimeout(function() {
				  	t2.text = 'Game will restart after 1 seconds';
			}, 4000);

	  	    setTimeout(function() {
					game.world.remove(t);
					game.world.remove(t1);
	        		game.world.remove(t2);
	        		game.world.remove(t3);
	        		game.paused = false;
	        		asteroids.visible = true;
	  	    		spaceship.visible = true;
	  	    		background.alpha = 1;
				}, 5000);



        	// reset for asteroid's
        	for (var i = 0; i < asteroid.length; i++) {
	       		asteroid[i].x = game.world.randomX;
	       		asteroid[i].y = game.world.randomY - game.world.height - (i * 200);
    		}
  			
  			// reset player ship
        	spaceship.x = game.world.centerX
        	spaceship.y = game.world.height - spaceshipHeight - 10;

        	score = 1;

        	exit = false;

        }


        function create () { 
        	game.physics.startSystem(Phaser.Physics.ARCADE);

	        // Add the scrolling starfield background
	    	background = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'space');

	    		var text1 = game.add.text(game.world.centerX, game.world.centerY-150, 'Game about strange asteroids', { font: "50px Arial", fill: "#ffffff", align: "center" });
	  	    	text1.x -= 672/2;

	  	    
	  	    	var text2 = game.add.text(game.world.centerX, game.world.centerY-85, 'some of them will hit you, but some of them - no\ndraw aside the ship from the asteroids using the arrow keys', { font: "25px Arial", fill: "#ffffff", align: "center" });
	  	    	text2.x -= 668/2;
	  	
	  	    	
	  	    	var button = game.add.sprite(game.world.centerX - 219/2, game.world.centerY+30, 'button');
	  	    	button.inputEnabled = true;
	  	    	button.events.onInputDown.add(actionOnClick, this);


	  	    	var text3 = game.add.text(game.world.centerX-316/2, game.world.height-40, 'Created by Taras Serevann :) \n serewann@gmail.com, vk.com/taras_serevann', { font: "15px Arial", fill: "#ffffff", align: "center" });
	  	    	text3.alpha = 0.9;
	    		background.alpha = 0.5;



	    		// any key
	    		this.game.input.keyboard.onDownCallback = function(e) {
	    			if (updateEnable == false) {
	    			actionOnClick();
	    		}
	    		}

 
	    		
	    		function actionOnClick () {
	    		text1.destroy();
	    		text2.destroy();
	    		text3.destroy();
	    		button.destroy();
	    		background.alpha = 1;
	    		updateEnable = true;

	    	

				

	    		
	    	

        	// Add big and small asteroids
        	asteroids = game.add.group();
        	addAsteroids('big', null, 100);
        	addAsteroids('small', 2);
        	game.physics.enable(asteroids, Phaser.Physics.ARCADE);
  			
  			// Add our player ship and make it centralize in width
        	spaceship = game.add.sprite(game.world.centerX, game.world.height - spaceshipHeight - 10, 'spaceship');
        	
        	game.physics.enable(spaceship, Phaser.Physics.ARCADE);
        	spaceship.body.collideWorldBounds = true;
        	spaceship.anchor.x = 0.5;
        	spaceship.anchor.y = 0.5;

        	// for collide detect
        	sW = spaceship.body.width;
			sH = spaceship.body.height;


		    //  Game input
		    cursors = game.input.keyboard.createCursorKeys();
		    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.S ]);
		    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.W ]);
		    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.A ]);
		    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.D ]);

		    // boom
		    kaboom = game.add.sprite(300, 200, 'kaboom');
		    kaboom.visible = false;
		    kaboom.animations.add('kaboom');
		}


        }

        function update () {
        	if (updateEnable == true) {

	        //  Scroll the background
	    	background.tilePosition.y += 2;

	    	// Make our spaceship movabe
			if (cursors.up.isDown || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
				
				if (spaceship.y > 80) {
		        spaceship.y -= spaceshipSpeed;
		    	} else {
		    		//  Scroll the background faster
	    			background.tilePosition.y += 2;
		    	}

		        spaceshipAcceleration += spaceshipSpeed;
		        spaceship.rotation = 0;
		        rotated = false;

		    } else if (cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) {

		    	if ((game.world.height - 100) > spaceship.y) {
		    	spaceship.y += spaceshipSpeed + 0.5;
		    	}
		    	spaceship.rotation = 0;
		    	rotated = false;

		    } else {

		    	// Return to default settings 
		    	spaceshipAcceleration = 0;
		    	spaceshipSpeed = SPEED;
		    	spaceship.rotation = 0;
		    	rotated = false;
		    }

		    if (cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
		        
		        spaceship.x -= spaceshipSpeed; 

		        if (!rotated) {
		        spaceship.rotation = 0;
		        spaceship.rotation -= rotation;
		        rotated = true;

		        } 
		    } else if (cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
		        
		        spaceship.x += spaceshipSpeed;

		        if (!rotated) {
		        spaceship.rotation = 0;
		        spaceship.rotation += rotation;
		        rotated = true;
		        } 
		    }

		    if ((game.world.height - 150) > spaceship.y) {
		    spaceship.y += 0.5;
			}
	

		    // Hand-made acceleration
		    if (spaceshipAcceleration > spaceshipSpeed*5 && spaceshipSpeed < 6) {
				spaceshipSpeed += 0.05;
			}

		    if (spaceshipAcceleration > 0) {
		    	spaceshipAcceleration -= spaceshipSpeed/2;
			}

			// I didn't understand how handle asteroids in the whole group, so I handle each element separately
	    	if (aMovable) {
	    	for (i = 0; i < asteroid.length; i++) {
	    		aW = asteroid[i].body.width;
	    		aH = asteroid[i].body.height;

	    		// collide check
	    		if ( ( (asteroid[i].y > spaceship.y - sH && asteroid[i].y < spaceship.y + sH) && (spaceship.y > asteroid[i].y - aH && spaceship.y < asteroid[i].y + aH) ) && ( (asteroid[i].x > spaceship.x - sW && asteroid[i].x < spaceship.x + sW) && (spaceship.x > asteroid[i].x - aW && spaceship.y < asteroid[i].x + aW) ) ) {
					if (score > bestScore) {
						bestScore = score;
					}
					aMovable = false;
					kaboom.x = spaceship.x-sW;
					kaboom.y = spaceship.y-sH;
					kaboom.visible = true;
					spaceship.visible = false;
					kaboom.animations.play('kaboom', 30, false);

					if (timeout == false) {
					setTimeout(function() {
					kaboom.visible = false;
					aMovable = true;
					exit = true;
					}, 500);
					timeout = true;
					}




					if (exit) {
						exit = false;
						startNewGame('Your score: ' + Math.floor(score), 'Your best score: ' + Math.floor(bestScore));
					}
				} else {
				timeout = false;
	    		asteroid[i].rotation += 0.006 * asteroid[i].rotationWay;
	    		asteroid[i].y += 5;
	    		score += 0.001;
	 


	    		// return asteroids if they gone beyond
	    		if (asteroid[i].y > game.world.height + 144) {
	    			asteroid[i].x = game.world.randomX;
	    			asteroid[i].y = game.world.randomY - game.world.height - (i * 150);
	    		} 
	    	}
	    }
	    	}

			
	    }
		}

	

  
    };