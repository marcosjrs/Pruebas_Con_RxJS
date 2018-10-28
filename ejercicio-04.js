const { Observable, interval,timer } = rxjs;
const { timeInterval, take, map } = rxjs.operators;

const observable = Observable.create(function subscribe(observer) {
  try {
    observer.next(1);
    observer.next(2);
    observer.next(3); // next se puede ejecutar 0 o infinitas veces
    observer.complete(); // complete() solo se prodrá ejecutar cero o una vez, al igual que error()
  } catch (err) {
    observer.error(err); 
  }
});

const subscription = observable.subscribe(x => console.log(x));
subscription.unsubscribe();//si fuera un interval, esto lo cancelaría



var observableConInvervalo = Observable.create((observer) => {
    // Guarda una referencia al intervalo, para poder cancelarlo
    var intervalID = setInterval(() => {
      observer.next('hi');
    }, 1000);
  
    // Proviene de un metodo unsubscribe
    return function unsubscribe() {
      clearInterval(intervalID);
    };
  });

const subscripcion = observableConInvervalo.subscribe(
    (x) => console.log('Next: ' + x),
    (err) =>  console.log('Error: ' + err),
    () => console.log('Completed')
);
document.getElementById("boton").addEventListener("click", ()=>console.log(subscripcion.unsubscribe()));



//En el siguiente ejercicio, se hará uso de interval de RxJS, y se verá el uso de unsubscribe de la librería (y no de una función adhoc)