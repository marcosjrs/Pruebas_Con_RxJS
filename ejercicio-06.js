const { Observable, Subject, from } = rxjs;
const { multicast } = rxjs.operators;

//https://medium.com/@jorgeucano/30-d%C3%ADas-con-rxjs-d%C3%ADa-08-74ac559e80cf
//Un Subject es como un observable, pero puede multicastear a muchos Observers (funciona como observable y tambien puede funcionar como observer). 
//Los Subjects son como EventEmitters: mantienen un registro de muchos listeners.
//Mientras que los Observables simples son unicast, los Subject son multicast.

//Mal explicado: Con los observables se ejecuta todo de una vez, a no ser que tenga asincronicos, pero con subject es como si fuera emitiendo uno por uno los valores del observable y el subject los fuera escuchando de esa manera individual.

// subject -> subscribe (no lo invoca) <- next (hace "saltar" el subscribe)
// En cambio en observable normal: observable normal -> subscribe (invoca el observable y ejecuta su "next")

// Subject ...
var subject = new Subject(); //ahora sus subscribe no ejecutaran, hasta llamadas next...

subject.subscribe({ //No lo invoca, no es como en un observable que sí lo hace
  next: (v) => console.log('observerA (Subject): ' + v) // los observer son como para un observable
});
subject.subscribe({
  next: (v) => console.log('observerB (Subject): ' + v)
});

const observable = from([1,2,3]);
observable.subscribe(x => console.log('observerA de Observable: ' + x));//hace saltar los dos de forma secuencial y cuando acaba de ejecutarse parsará la la siguiente (por tanto es como si fuera de "uni a unicast" :P ):
observable.subscribe(x => console.log('observerB de Observable: ' + x));//hace saltar los dos de forma secuencial empezando tambien en 1.



//Pero al Observable.suscribe se le puede pasar una instancia de Subject... ya que puede funcionar como Observable ( como arriba) y como observer (funcion pasada al subscribe)...
const observableConSubjectEnSubscribe = from([1,2,3]);
observableConSubjectEnSubscribe.subscribe(subject);// Alternará, se ejecutará primero un next y este devolviera solo un valor, y luego se volviera a ejecutar otro next hasta terminar los valores del from (y no porque se ejecute en lineas más arriba, sino porque lo hace automaticamente con este subscribe)


//LOS SUBJECT SON LA ÚNICA MANERA DE HACER QUE CUALQUIER EJECUCIÓN OBSERVABLE SEA COMPARTIDA CON MÚLTIPLES OBSERVERS.

/*
Salida por consola:

 observerA (Subject): 1
 observerB (Subject): 1
 observerA (Subject): 2
 observerB (Subject): 2

 observerA de Observable: 1
 observerA de Observable: 2
 observerB de Observable: 1
 observerB de Observable: 2

 observerA (Subject): 1
 observerB (Subject): 1
 observerA (Subject): 2
 observerB (Subject): 2
 observerA (Subject): 3
 observerB (Subject): 3
*/