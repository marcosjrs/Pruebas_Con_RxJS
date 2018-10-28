
const {throttleTime, map, scan} = rxjs.operators;// para no escribir rxjs.operator.map.... rxjs.operator.scan ....

var boton = document.getElementById("boton");
var veces = 0;
var msegs = 1000;
var ultimoClick = Date.now() - msegs;
boton.addEventListener("click", function (evt) {
    if (Date.now() - ultimoClick >= msegs) { //mientras no pasen 1000 milisegundos ...
        console.log(`[JS] botón clicado ${++veces} veces`);
        ultimoClick = Date.now();
    }
});

/*v5*/
// Rx.Observable
//     .fromEvent(boton, 'click')
//     .throttleTime(1000) //hasta que pase un segundo no ejecutará lo siguiente
//     .scan((veces) => veces + 1, 0) //El valor del scan se le pasará al subscribe
//     .subscribe(valor => console.log(`[JSX] botón clicado ${valor} veces`));
  
/*v6*/
rxjs
    .fromEvent(boton, 'click')
    .pipe(
        throttleTime(1000), //hasta que pase un segundo no ejecutará lo siguiente
        scan((veces) => veces + 1, 0)
        ) //El valor del scan se le pasará al subscribe, no tiene porque tener el mismo nombre, pero la variable es del ambito del scan.
    .subscribe(valor => console.log(`[JSX] botón clicado ${valor} veces`)); //el nombre de las variables no influye en el resultado.

//Lo mismo que lo anterior pero en lugar de acumular de uno en uno, se irá acumulando el valor dado por un map anterior, por ejemplo la posicion X del mouse
rxjs
    .fromEvent(boton, 'click')
    .pipe(
        throttleTime(1000), //hasta que pase un segundo no ejecutará lo siguiente
        map((evento) => evento.clientX),//map recibe el valor anterior, en este caso es el evento click, y de ese evento pasa el valor de ClientX al siguiente paso del flujo
        scan((acumulador, valorDelMap) => acumulador + valorDelMap, 0) //acumulador es como el valor que se va acumulando, comenzamos con valor 0. El segundo parametro es el valor pasado por el anterior del flujo. Es un reducer.
        ) //El valor del scan se le pasará al subscribe, no tiene porque tener el mismo nombre, pero la variable es del ambito del scan.
    .subscribe(valor => console.log(`[JSX] Sumatorio de posiciones del raton ${valor}`)); //el nombre de las variables no influye en el resultado.
