const { Observable, Subject, from } = rxjs;
const { multicast } = rxjs.operators;

//https://medium.com/@jorgeucano/30-d%C3%ADas-con-rxjs-d%C3%ADa-9-fcae24a103e3

var subject = new Subject(); //ahora sus subscribe no ejecutaran, hasta llamadas next...

subject.subscribe({ //No lo invoca, no es como en un observable que sí lo hace
  next: (v) => console.log('observerA (Subject): ' + v) // los observer son como para un observable normal
});
subject.subscribe({
  next: (v) => console.log('observerB (Subject): ' + v)
});

//Pero al Observable.suscribe se le puede pasar una instancia de Subject... ya que puede funcionar como observer (funcion pasada al subscribe)...
const observableConSubjectEnSubscribe = from([1,2,3]);
observableConSubjectEnSubscribe.subscribe(subject);// Alternará, se ejecutará primero un next y este devolviera solo un valor, y luego se volviera a ejecutar otro next hasta terminar los valores del from (y no porque se ejecute en lineas más arriba, sino porque lo hace automaticamente con este subscribe)



//Esto último tambien se puede hacer con el operador "multicast"
//

const source = from(['a','b','c']);
const subject2 = new Subject();
const multicasted = source.pipe(multicast(subject2));
 
// En el fondo se ejecuta: `subject2.subscribe({...})`  ( y que ya sabemos que "no ejecutará el observable"). 
//Que a su vez será el Subject que se utilizará como subscriptor entre bambalinas mediante: multicasted.connect(); 
multicasted.subscribe({
  next: (v) => console.log(`observerA (multicasted): ${v}`)
});
multicasted.subscribe({
  next: (v) => console.log(`observerB (multicasted): ${v}`)
});
 
//En el fondo,con lo siguiente, se ejecuta : `source.subscribe(subject2)` que comenzará a ejecutar el observable compartido.
// Y asu vez devolvería una suscripción (y ya sabemos que se le prodría hacer unsuscribes)
multicasted.connect(); 

/**
 * Salida consola
 * 
 observerA (Subject): 1
 observerB (Subject): 1
 observerA (Subject): 2
 observerB (Subject): 2
 observerA (Subject): 3
 observerB (Subject): 3

 observerA (multicasted): a
 observerB (multicasted): a
 observerA (multicasted): b
 observerB (multicasted): b
 observerA (multicasted): c
 observerB (multicasted): c

 */