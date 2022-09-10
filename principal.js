var juego = new Phaser.Game(290, 540, Phaser.CANVAS, 'bloque_juego');

// Añadiendo estados:
juego.state.add('Juego', Juego);
juego.state.add('Terminado', Terminado);
juego.state.add('Portada', Portada);
juego.state.start('Portada');