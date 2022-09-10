var fondo;
var carro;
var cursores;
var enemigos;
var timer;
var gasolinas;
var timerGasolina;
var puntos;
var txtPuntos;
var vidas;
var txtVidas;
var a;
let sonidoPuntos = new Audio('sonido/puntos.mp3');
let sonidoColision = new Audio('sonido/colision.mp3');

var Juego = {

	preload: function(){
		juego.load.image('bg','img/bg.png');
		juego.load.image('carro','img/carro.png');
		juego.load.image('carroMalo','img/carroMalo.png');
		juego.load.image('gasolina','img/gas.png');
		juego.forceSingleUpdate = true;
		a = 0;
	},

	create: function(){
		// Fondo del juego
		fondo=juego.add.tileSprite(0,0,290,540,'bg');

		// Signar recursos al carro
		carro = juego.add.sprite(juego.width/2,496,'carro');
		carro.anchor.setTo(0.5);
		// Habilitar mecanicas para carro
		juego.physics.arcade.enable(carro,true);

		// Crear grupo para enemigos con mecanica ARCADE
		enemigos=juego.add.group();
		juego.physics.arcade.enable(enemigos,true);
		enemigos.enableBody=true;
		enemigos.createMultiple(20,'carroMalo');
		enemigos.setAll('anchor.x',0.5);
		enemigos.setAll('anchor.y',0.5);
		enemigos.setAll('outOfBoundsKill',true);
		enemigos.setAll('checkWorldBounds',true);

		// Crear grupo para gasolina con mecanica ARCADE
		gasolinas=juego.add.group();
		juego.physics.arcade.enable(gasolinas,true);
		gasolinas.enableBody=true;
		gasolinas.createMultiple(20,'gasolina');
		gasolinas.setAll('anchor.x',0.5);
		gasolinas.setAll('anchor.y',0.5);
		gasolinas.setAll('outOfBoundsKill',true);
		gasolinas.setAll('checkWorldBounds',true);

		// Timer para el tiempo de aparicion de los enemigos
		timer=juego.time.events.loop(1500,this.crearCarroMalo, this);

		timerGasolina=juego.time.events.loop(2000,this.crearGasolina, this);

		// Deteccion de movimientos
		cursores=juego.input.keyboard.createCursorKeys();

		// Puntaje en pantalla 
		puntos=0;
		juego.add.text(20,20,"Puntos: ",{font:"14px Arial", fill:"#FFF"});
		txtPuntos=juego.add.text(80,20,"0",{font:"14px Arial", fill:"#FFF"});

		// Contador de vidas
		vidas=3;
		juego.add.text(200,20,"Vidas: ",{font:"14px Arial", fill:"#FFF"});
		txtVidas=juego.add.text(255,20,"3",{font:"14px Arial", fill:"#FFF"});
	},

	update: function(){
		// Movimiento en eje Y
		fondo.tilePosition.y += 3;
		if(cursores.right.isDown && carro.position.x<245){
			carro.position.x += 5;
		} else if(cursores.left.isDown && carro.position.x>45){
			carro.position.x -= 5;
		}

		juego.physics.arcade.overlap(carro,gasolinas,this.colisionGasolina,null,this);

		juego.physics.arcade.overlap(carro,enemigos,this.colisionEnemigo,null,this);

		if(vidas==0){
			juego.state.start('Terminado');
		}

		if(puntos>=3){
			if (a == 0) { 
 				window.alert("Segundo nivel");
				a = 1;
			}
			fondo.tilePosition.y += 6;
		} else {
			fondo.tilePosition.y += 3;
		}

		if(puntos>=6){
 			window.alert("Ganaste");
 			juego.state.start('Juego');
		}
		
	},

	crearGasolina: function(){
		// Posicion y velocidad aleatoria para las gasolinas
		var posicion = Math.floor(Math.random()*3)+1;
		var gasolina = gasolinas.getFirstDead();
		gasolina.physicsBodyType = Phaser.Physics.ARCADE;
		gasolina.reset(posicion*73,0);
		if(puntos>=3){
			gasolina.body.velocity.y=400;
		} else { 
			gasolina.body.velocity.y=200;
		}
		gasolina.anchor.setTo(0.5);
	},

	crearCarroMalo: function(){
		// Posicion y velocidad aleatoria para los enemigos
		var posicion = Math.floor(Math.random()*3)+1;
		var enemigo = enemigos.getFirstDead();
		enemigo.physicsBodyType = Phaser.Physics.ARCADE;
		enemigo.reset(posicion*73,0);
		if(puntos>=3){
			enemigo.body.velocity.y=400;
		} else {
			enemigo.body.velocity.y=200;
		}
		enemigo.anchor.setTo(0.5);
	},

	colisionEnemigo: function(a,n){
		//a.kill();
		n.kill();
		// Vidas en pantalla
		vidas-=1;
		txtVidas.text=vidas;
		sonidoColision.play();
	},

	colisionGasolina: function(b,m){
		//b.kill();
		m.kill();
		// Puntaje en pantalla
		puntos+=1;
		txtPuntos.text=puntos;
		sonidoPuntos.play();
	}

};