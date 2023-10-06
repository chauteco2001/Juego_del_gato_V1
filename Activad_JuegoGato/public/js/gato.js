var canvas = document.getElementById('gato'); 
var ctx = canvas.getContext("2d");

function app() {
    const gato = {
        estados: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        ancho: canvas.width = '500',
        alto: canvas.height = '500',
        cuadropint: null,
        TurnoDJugador: 1,

        regilla: function () {
            var regilla = 5;
            var cuadro = 100;

            for (var i = 1; i < regilla; i++) {
                var x = (i * cuadro); 
                var y = (i * cuadro);

                ctx.setLineDash([5, 5]);

                
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'blue';
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
        },

        escenario: function () {
            
            ctx.beginPath();
            ctx.moveTo(200, 100);
            ctx.lineTo(200, 400);
            ctx.moveTo(300, 100);
            ctx.lineTo(300, 400);
            ctx.moveTo(100, 200);
            ctx.lineTo(400, 200);
            ctx.moveTo(100, 300);
            ctx.lineTo(400, 300);
            ctx.lineWidth = 4;
            ctx.setLineDash([]);  
            ctx.strokeStyle = '0c0b0b';
            ctx.stroke();
        },

        activarEstado: function (event) {
            var x = event.offsetX - 100;
            var y = event.offsetY - 100;

            var cuadroX = parseInt(x / 100);
            var cuadroY = parseInt(y / 100);

        
            if (event.type === 'mousedown' && this.estados[cuadroY][cuadroX] === 0) {
                this.estados[cuadroY][cuadroX] = 1;
                
                ctx.fillStyle = this.TurnoDJugador === 1 ? 'blue' : 'red';
                ctx.fillRect(cuadroX * 100 + 105, cuadroY * 100 + 105, 90, 90);
                console.log('Se ha guardado el estado 1:', cuadroX, cuadroY);

              
                this.TurnoDJugador = this.TurnoDJugador === 1 ? 2 : 1;
            }
        },
        seleccionar: function (event) {
            var x = event.offsetX;
            var y = event.offsetY;
            var coordenadas = document.getElementById('coordenas');
            coordenadas.innerHTML = `Coordenadas: (${x}, ${y})`;
            var cuadroX, cuadroY;
        
            if (x > 100 && x < 200 && y > 100 && y < 200) {
                cuadroX = 0;
                cuadroY = 0;
            } else if (x > 200 && x < 300 && y > 100 && y < 200) {
                cuadroX = 1;
                cuadroY = 0;
            } else if (x > 300 && x < 400 && y > 100 && y < 200) {
                cuadroX = 2;
                cuadroY = 0;
            } else if (x > 100 && x < 200 && y > 200 && y < 300) {
                cuadroX = 0;
                cuadroY = 1;
            } else if (x > 200 && x < 300 && y > 200 && y < 300) {
                cuadroX = 1;
                cuadroY = 1;
            } else if (x > 300 && x < 400 && y > 200 && y < 300) {
                cuadroX = 2;
                cuadroY = 1;
            } else if (x > 100 && x < 200 && y > 300 && y < 400) {
                cuadroX = 0;
                cuadroY = 2;
            } else if (x > 200 && x < 300 && y > 300 && y < 400) {
                cuadroX = 1;
                cuadroY = 2;
            } else if (x > 300 && x < 400 && y > 300 && y < 400) {
                cuadroX = 2;
                cuadroY = 2;
            }
        
            if (this.estados[cuadroY][cuadroX] === 0) {
                ctx.fillStyle = this.TurnoDJugador === 1 ? 'pink' : 'brown';
                ctx.fillRect(cuadroX * 100 + 105, cuadroY * 100 + 105, 90, 90);
                this.estados[cuadroY][cuadroX] = this.TurnoDJugador;
        
                this.TurnoDJugador = this.TurnoDJugador === 1 ? 2 : 1;
            }
        },        

        seleccion: function (event) {
            if (event.type !== 'mousedown') {
                return;
            }

            if (this.cuadropint) {
                const { x, y } = this.cuadropint;
                ctx.clearRect(x * 100 + 105, y * 100 + 105, 90, 90);
                this.cuadropint = null;
            }

            var x = event.offsetX - 100;
            var y = event.offsetY - 100;
            var cuadroX = parseInt(x / 100);
            var cuadroY = parseInt(y / 100);


            if (this.estados[cuadroY][cuadroX] === 0) {
                // Pintar el cuadro 
                ctx.fillStyle = this.TurnoDJugador === 1 ? 'pink' : 'brown';
                ctx.fillRect(cuadroX * 100 + 105, cuadroY * 100 + 105, 90, 90);
                // Actualizar el estado 
                this.estados[cuadroY][cuadroX] = this.TurnoDJugador;

                
                this.TurnoDJugador = this.TurnoDJugador === 1 ? 2 : 1;
                this.cuadropint = { x: cuadroX, y: cuadroY };
            }
        },

        play: function () {
            this.escenario();
            
            this.regilla();
        }
    };

    canvas.addEventListener('mousemove', function (event) {
        gato.seleccion(event);
    });

    canvas.addEventListener('mousedown', function (event) {
        gato.activarEstado(event);
    });
    canvas.addEventListener('mousedown', function (event) {
        gato.seleccionar(event);
    })

    gato.play();
}

window.onload = function () {
    app();
};