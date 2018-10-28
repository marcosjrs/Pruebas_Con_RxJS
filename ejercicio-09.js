const { interval, Subject, BehaviorSubject,ReplaySubject ,AsyncSubject} = rxjs;
const { multicast } = rxjs.operators;


//https://medium.com/@jorgeucano/30-d%C3%ADas-con-rxjs-d%C3%ADa-11-bf99fc2c683a
// Una de las variantes de los Subjects es el BehaviorSubject, que tiene una noción de “el valor actual”. 
// Almacena el último valor emitido a sus consumidores, y cada vez que New Observer se suscriba, 
// recibirá inmediatamente el “valor actual” del BehaviorSubject (aún a "toro pasado").
 
var subject = new BehaviorSubject(0); // Valor inicial: 0

subject.subscribe({ // Se mostrará por consola:  observerA: 0  . El valor inicial ya se ha seteado en el constructor, pero al realizar este subscribe, saltará automáticamente.
  next: (v) => console.log('observerA: ' + v) 
});

subject.next(1); // se mostrará por consola:  observerA: 1 
subject.next(2); // se mostrará por consola:  observerA: 2 

subject.subscribe({  // se mostrará por consola:  observerB: 2   Porque cojerá el último valor anterior y lo mostrará
  next: (v) => console.log('observerB: ' + v) 
});

subject.next(3);//  se mostrará por consola   observerA: 3   y   observerB: 3


/* Salida por consola:
observerA: 0
observerA: 1

observerA: 2
observerB: 2

observerA: 3
observerB: 3
*/

//https://medium.com/@jorgeucano/30-d%C3%ADas-con-rxjs-d%C3%ADa-12-9115f7f978e1

// BehaviorSubject() sería como hacer ReplaySubject(1) Es decir, le indicamos cuantos elementos se deben guardar.
// Con BehaviorSubject, cuando se subscribia, en caso de tener un valor establecido, se disparaba el suscribe con
// ese valor (a toro pasado) pero solo uno, con ReplaySubject le decimos cuantos valores...


let rplaySubject = new ReplaySubject(2);

rplaySubject.next("Primer valor");
rplaySubject.next("Segundo valor");
rplaySubject.next("Tercer valor");

rplaySubject.asObservable().subscribe((data) => {
  console.log(">>>>> "+ data);
});

rplaySubject.next("Cuarto valor");

//Salida por consola:
//>>>>> Segundo valor
//>>>>> Tercer valor
//>>>>> Cuarto valor

// https://medium.com/@jorgeucano/30-d%C3%ADas-con-rxjs-d%C3%ADa-13-452405020a6
/*AsyncSubject es una variante en la que sólo el último valor de la 
ejecución observable se envía a sus observadores y sólo cuando se completa la ejecución.*/

var asyncSubject = new AsyncSubject();

asyncSubject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

asyncSubject.next(1);
asyncSubject.next(2);
asyncSubject.next(3);
asyncSubject.next(4);

asyncSubject.asObservable().subscribe({
  next: (v) => console.log('observerB: ' + v)
});

asyncSubject.next(5);
asyncSubject.complete();

//Solo mortrará al ultimo (antes del complete)
// observerA: 5
// observerB: 5
