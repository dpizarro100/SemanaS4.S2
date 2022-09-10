var fondoportada;
// const button = document.createElement('button');

var Portada = {
    
    preload: function(){
        juego.load.image('portada','img/portada.png');
        // button.type = 'button'; 
        // button.innerText = 'Jugar'; 
        // document.body.appendChild(button);
    },
    
    create: function(){
        fondoportada=juego.add.tileSprite(0,0,290,540,'portada');
    },

    update: function(){
        // if (button.click==true) {
        //     juego.state.start('Juego');
        // }
    }
    
};