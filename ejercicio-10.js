const { Observable, Subject, BehaviorSubject,ReplaySubject,AsyncSubject,from} = rxjs;

// https://medium.com/@jorgeucano/30-d%C3%ADas-con-rxjs-d%C3%ADa-14-f0e603a6c8c3
//Los operadores son métodos del tipo Observable, como .map(…), .filter(…), .merge(…), etc. 
//Cuando se les llama, no cambian la instancia de Observable existente. 
//En cambio, devuelven un nuevo Observable, cuya lógica de suscripción se basa en el primer Observable.
 
function multiplyByTen(input) {
  var output = Observable.create(function subscribe(observer) {
    input.subscribe({
      next: (v) => observer.next(10 * v),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });
  return output;
}

var input = from([1, 2, 3, 4]);
var output = multiplyByTen(input);
output.subscribe(x => console.log(x));


//https://medium.com/@jorgeucano/30-d%C3%ADas-con-rxjs-d%C3%ADa-15-edd5e5fddf56

//Si quisieramos utilizarlo como un operador de instancia, lo creariamos así:

Observable.prototype.multiplyByTen = function multiplyByTen() {
  var input = this;
  return Observable.create(function subscribe(observer) {
    input.subscribe({
      next: (v) => observer.next(10 * v),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });
}

from([5,6,7])
.multiplyByTen()
.subscribe(x => console.log(x));