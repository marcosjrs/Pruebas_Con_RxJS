const { Observable,timer,interval } = rxjs;
const {  timeInterval, take, map } = rxjs.operators;

//https://medium.com/@jorgeucano/30-d%C3%ADas-con-rxjs-d%C3%ADa-7-e7c068e7865
// subscripcion <- Observable.subscribe
// subscripcion.unsubscribe
// nuevaSubscripcion <- Observable.subscribe
// nuevaSubscripcion.add( subscripcion ) //Agrupandolas, luego puede .remove( subscripcion )


const observable1 = interval(400);
const observable2 = interval(300);
 
const subscripcion = observable1.subscribe(x => console.log('first: ' + x));
const subscripcion2 = observable2.subscribe(x => console.log('second: ' + x));
 
subscripcion.add(subscripcion2); //Se añade subscripcion2 en subscripcion. Luego se podrán parar ambas de una vez.
 
setTimeout(() => {
  // De una sola vez se paran la dos
  subscripcion.unsubscribe();
}, 1000);






//Ejemplo más completo de un temporizador .
var temporizador = timer(0, 1000)
                .pipe(
                    timeInterval(),
                    map(function (x) { return 'valor: '+x.value + ' -- interval pasado' + x.interval; }),
                    take(5)
                );    
    

var subscripcionTemporizador = temporizador.subscribe(
    (x) => console.log('Next: ' + x),
    (err) =>  console.log('Error: ' + err),
    () => console.log('Completed')
);

document.getElementById("boton").addEventListener("click", ()=>console.log(subscripcionTemporizador.unsubscribe()));
