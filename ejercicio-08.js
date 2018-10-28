const { interval, Subject } = rxjs;
const { multicast } = rxjs.operators;
 
const source = interval(500);
const subject = new Subject();
const multicasted = source.pipe(multicast(subject));
let subscription1, subscription2, subscriptionConnect;

// https://medium.com/@jorgeucano/30-d%C3%ADas-con-rxjs-d%C3%ADa-10-514da1f3005b
 
subscription1 = multicasted.subscribe({  // subject.subscribe...
  next: (v) => console.log(`observerA, valor: ${v}`)
});

//  LLamaresmo al conect , porque queremos que el primer suscriptor pueda consumir de este multicast
subscriptionConnect = multicasted.connect(); //observable.suscribe, pero teniendo encuenta que se trata de un suscriptor Subject (ejecución a ejecución...)
 
setTimeout(() => {
  subscription2 = multicasted.subscribe({
    next: (v) => console.log(`observerB subscribiendose mas tarde, valor: ${v}`) //segundo suscriptor pasado un tiempo, por tanto el primer valor escuchado ya no será el primero lanzado...
  });
}, 600);
 
setTimeout(() => {
  subscription1.unsubscribe();//se desinscribe por el medio el primer suscriptor, y deja de escuchar
}, 1200);
 
// "Paramos" el subscriptionConnect porque ya no se compartirá más, ya que desuscribimos la ultima suscripcion
setTimeout(() => {
  subscription2.unsubscribe();
  subscriptionConnect.unsubscribe();
}, 2000);

// Sino se quiere tener que estar mirando de ejecutar el connect tras añadir el primer suscriptor  
// y pararlo tras no tener ninguno, se puede utilizar refCount
// refCount Hace que el Multicasted Observable comience automáticamente a ejecutarse cuando llegue el primer subscribe y deje de ejecutar cuando el último subscribe se vaya.
//Como ejemplo Copiamos lo mismo que antes renombrando y llamando a .refCount() en la linea 38
const sourceB = interval(500);
const subjectB = new Subject();
const multicastedB = sourceB.pipe(multicast(subjectB)).refCount();  //<<-- refCount()
let subscription1B, subscription2B, subscriptionConnectB;
 
subscription1B = multicastedB.subscribe({  // subjectB.subscribe...
  next: (v) => console.log(`observerA (con refCount), valor: ${v}`)
});

//  Ya no LLamaremos al conect, no hace falta con refCount
// subscriptionConnectB = multicastedB.connect(); //observable.suscribe, pero teniendo encuenta que se trata de un suscriptor Subject (ejecución a ejecución...)
 
setTimeout(() => {
  subscription2B = multicastedB.subscribe({
    next: (v) => console.log(`observerB (con refCount) subscribiendose mas tarde, valor: ${v}`) //segundo suscriptor pasado un tiempo, por tanto el primer valor escuchado ya no será el primero lanzado...
  });
}, 600);
 
setTimeout(() => {
  subscription1B.unsubscribe();//se desinscribe por el medio el primer suscriptor, y deja de escuchar
}, 1200);
 
// Ya no hace falta que "Paremos" el subscriptionConnectB porque ya lo hace el refCount tras desinscripcion de la ultima suscripcion
setTimeout(() => {
  subscription2B.unsubscribe();
  // subscriptionConnectB.unsubscribe(); //Ya no hace falta
}, 2000);


//Hace lo mismo
/* Salida de consola:

observerA, valor: 0
observerA (con refCount), valor: 0

observerA, valor: 1
observerB subscribiendose mas tarde, valor: 1
observerA (con refCount), valor: 1
observerB (con refCount) subscribiendose mas tarde, valor: 1

observerB subscribiendose mas tarde, valor: 2
observerB (con refCount) subscribiendose mas tarde, valor: 2

observerB subscribiendose mas tarde, valor: 3
observerB (con refCount) subscribiendose mas tarde, valor: 3

*/
