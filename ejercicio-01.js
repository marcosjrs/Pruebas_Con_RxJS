
var boton = document.getElementById("boton");
boton.addEventListener("click", function (evt) {
    console.log("[JS] botón clicado");
});

/*v5*/
// Rx.Observable.fromEvent(boton, 'click')
//   .subscribe(() => console.log('[RxJS] botón clicado'));
  
/*v6*/
rxjs
    .fromEvent(boton, 'click')
    .subscribe(evt=>console.log("[RxJS] botón clicado"));
