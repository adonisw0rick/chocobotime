
        var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

        function preload() {

            //game.load.spritesheet('chocobo', 'choco60x65x9v2correr3.png', 64, 63);
            game.load.spritesheet('chocobito', 'choco60x65x9v2correr3.png', 64, 63);
            game.load.image('chocobolife', 'chocobo_life.png');
            game.load.image('wall', 'muro.png');
            game.load.image('column', 'columna.png');
            game.load.image('curve', 'curva.png');
            game.load.image('field', 'rio.png');
            

        }

        //var player;
        var chocobos;
        var chocobito;
        var field;
        var score = 0;
        var scoreString = '';
        var scoreText;
        var lives;
        var suelo;
        var columna;
        var curva;
        var velocidad = 2;
        var stateText;
        var livingEnemies = [];

        //salto
        var jumpTimer = 0;
        var cursors;
        var jumpButton;

        function create() {

            game.physics.startSystem(Phaser.Physics.ARCADE);
            game.physics.arcade.checkCollision.left = false;
            game.physics.arcade.checkCollision.right = false;
            
            //  El Fondo.
            field = game.add.tileSprite(0, 0, 800, 600, 'field');
            //Primera plataforma
            suelo = game.add.sprite(300,250, 'wall');
            suelo.name = 'suelo';
            game.physics.enable(suelo, Phaser.Physics.ARCADE);
            suelo.body.collideWorldBounds = true;
            suelo.body.immovable = true;
            
            columna = game.add.sprite(900, 450, 'column');
            columna.name = 'columna';
            game.physics.enable(columna, Phaser.Physics.ARCADE);
            columna.body.collideWorldBounds = true;
            columna.body.immovable = true;

            curva = game.add.sprite(900, 500, 'curve');
            curva.name = 'curva';
            game.physics.enable(curva, Phaser.Physics.ARCADE);
            curva.body.collideWorldBounds = true;
            curva.body.immovable = true;
            //  The hero!
            /**/
            /*chocobito.body.bounce.y = 0.2;
            chocobito.body.collideWorldBounds = true;
            chocobito.body.setSize(20, 32, 5, 16);
            chocobito.animations.add('right', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);
    /*
            player = game.add.sprite(400, 500, 'chocobolife');
            player.anchor.setTo(0.5, 0.5);
            game.physics.enable(player, Phaser.Physics.ARCADE);
            */
            //  The baddies!
            game.physics.arcade.gravity.y = 980;

            chocobito = game.add.sprite(100, 200, 'chocobito', 2);
            chocobito.name = 'chocobito';
            game.physics.enable(chocobito, Phaser.Physics.ARCADE);
            chocobito.body.collideWorldBounds = true;
            //chocobito.body.bounce.setTo(1, 1);
            chocobos = game.add.group();
            chocobos.enableBody = true;
            game.physics.enable(chocobos, Phaser.Physics.ARCADE);
            chocobos.physicsBodyType = Phaser.Physics.ARCADE;
           

            //startChocobo();
            
            //  The score
            scoreString = 'Score : ';
            scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

            //  Lives
            lives = game.add.group();
            game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

            //  Text
            stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', { font: '84px Arial', fill: '#fff' });
            stateText.anchor.setTo(0.5, 0.5);
            stateText.visible = false;

            for (var i = 0; i <3; i++) {
                var chocobolife = lives.create(game.world.width - 100 + (30 * i), 60, 'chocobolife');
                chocobolife.anchor.setTo(0, 0.5);
                chocobolife.scale.setTo(0.25);
            }

            //  And some controls to play the game with
            this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.X = game.input.keyboard.addKey(Phaser.Keyboard.X);
            game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
            game.input.keyboard.addKeyCapture([Phaser.Keyboard.X]);
            cursors = game.input.keyboard.createCursorKeys();
            jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            

        }

        function startChocobo() {

                    var chocobo = chocobos.create(140, 470, 'chocobo');
                    chocobo.animations.add('fly', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 20, true);
                    chocobo.play('fly');
                    chocobo.body.moves = false;
                    chocobo.body.bounce.y = 0.2;
                    chocobo.body.collideWorldBounds = true;
                    chocobo.body.setSize(20, 32, 5, 16);
                    chocobo.body.acceleration.x = 2222;
        }



        function update() {
            //game.physics.arcade.collide(chocobito, suelo);
            game.physics.arcade.overlap(chocobito, suelo, thisDestroyChocobo, null, this);
            game.physics.arcade.overlap(chocobito, columna, thisDestroyChocobo, null, this);
            game.physics.arcade.overlap(chocobito, curva, thisDestroyChocobo, null, this);
            //game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
            //chocobito.body.velocity.x += 20;
            // if (jumpButton.isDown && game.time.now > jumpTimer) {
            //     chocobito.body.velocity.y = -250;
            //     jumpTimer = game.time.now + 750;
            // }
            //  Scroll the background
            if (!suelo.alive){
                console.log('revive');
                 suelo.revive();
                 suelo.x = 1200;
            }
            if (!columna.alive) {
                console.log('revive');
                columna.revive();
                columna.x = 1200;
            }
            if (!curva.alive) {
                console.log('revive');
                curva.revive();
                curva.x = 1200;
            }
            if (suelo.x > 0){
                suelo.body.velocity.x -= velocidad;
            }
            if (suelo.x < 0){
                columna.x -= velocidad;
                if (columna.x < 0){
                    curva.x -= velocidad;
                }
            }
            if(curva.x < 0 && columna.x < 0 && suelo.x < 0){
                suelo.x = 899;
                curva.x = 899;
                columna.x = 899;
            }
            field.tilePosition.y = -1000;
            field.tilePosition.x -= velocidad;
            //console.log(chocobos.y);
                if (cursors.up.isDown && chocobos.y >= -400) {
                    //chocobos.body.velocity.y = -250;
                    //jumpTimer = game.time.now + 750;
                    //chocobos.body.velocity.y = 10;
                    chocobito.body.velocity.y = -230;
                    chocobos.y -= 1*velocidad;
                    //chocobo.body.velocity.y = -200;
                }
                else if (cursors.up.isDown && chocobito.y >= -400) {
                    chocobito.body.velocity.y = -230;
                }
                if (this.spaceKey.isDown) {
                chocobito.body.velocity.y = 65;}
                if (this.X.isDown) {
                chocobito.body.velocity.y = 65;
            }
                
        
            

            compruebasichocaborde(chocobito);
            if (compruebasichocaborde(chocobito) == true){
                live = lives.getFirstAlive();

                if (live) {
                    live.kill();
                }
            }
            console.log(lives.length);
            velocidad += 0.01;
            score += velocidad * 0.1;
            scoreText.text = scoreString + score;
        }

        function thisHitsChocobo(chocobito, enemigo) {

                //  When a bullet hits an alien we kill them both
                //suelo.kill();
                enemigo.kill();

                //  Increase the score
                score += 200;
                scoreText.text = scoreString + score;

                //  And create an explosion :)
            live = lives.getFirstAlive();

            if (live) {
                live.kill();
            }
                // if (aliens.countLiving() == 0) {
                //     score += 1000;
                //     scoreText.text = scoreString + score;

                //     enemyBullets.callAll('kill', this);
                //     stateText.text = " You Won, \n Click to restart";
                //     stateText.visible = true;

                //     //the "click to restart" handler
                //     game.input.onTap.addOnce(restart, this);
                // }

            }

            function thisDestroyChocobo(chocobito, enemigo) {

                    //  When a bullet hits an alien we kill them both
                    //suelo.kill();
                    enemigo.kill();

                    //  Increase the score
                    score += 200;
                    scoreText.text = scoreString + score;

                    //  And create an explosion :)
                    live = lives.getFirstAlive();

                    if (live) {
                        live.kill();
                    }
                    live = lives.getFirstAlive();

                if (live) {
                    live.kill();
                }
                live = lives.getFirstAlive();

                if (live) {
                    live.kill();
                }

                if (lives.countLiving() < 1) {
                    chocobito.kill();

                    stateText.text = " GAME OVER \n Click to restart";
                    stateText.visible = true;

                    //the "click to restart" handler
                    //game.input.onTap.addOnce(restart, this);
                }
                    
                    // if (aliens.countLiving() == 0) {
                    //     score += 1000;
                    //     scoreText.text = scoreString + score;

                    //     enemyBullets.callAll('kill', this);
                    //     stateText.text = " You Won, \n Click to restart";
                    //     stateText.visible = true;

                    //     //the "click to restart" handler
                        game.input.onTap.addOnce(restart, this);
                    // }

                }
        function restart() {

            //  A new level starts

            //resets the life count
            lives.callAll('revive');
            //  And brings the chocobos back from the dead :)
            //chocobos.removeAll();
            //startChocobo();

            //revives the player
            suelo.body.velocity.x = 0;
            columna.body.velocity.x = 0;
            velocidad = 0.5;
            chocobito.revive();
            score = 0;
            suelo.revive();
            suelo.x = 900;
            columna.revive();
            columna.x = 900;
            curva.revive();
            curva.x = 900;
            //hides the text
            stateText.visible = false;

        }

        function compruebasichocaborde(elemento){
            if (((elemento.body.x > 735) && (elemento.body.x < 801)) || elemento.body.x == 0) {
                console.log('hi');
                return true;
            }
            if (((elemento.body.y > 535) && (elemento.body.y < 601)) || elemento.body.y == 0) {
                console.log('hi');
                return true;
            }
            return false;
        }