const Async = require('crocks/Async');

const resolveIn = (val, secs) => Async((rej, res) => setTimeout(() => res(val), secs * 1000));
const failIn = (err, secs) => Async((rej, res) => setTimeout(() => rej(err), secs * 1000));

const fooAsync = resolveIn("foo", 3);
const barAsync = resolveIn("bar", 3);

const start = new Date();

(do{
  foo << fooAsync;
  bar << barAsync;

  ({foo, bar});
}).fork(i => i, success => {
  const end = new Date();
  console.log("Got successful value:", success, "in:", (end - start) / 1000, "seconds")
});
// Got successful value: { foo: 'foo', bar: 'bar' } in: 6.005 seconds

(do{
  foo << fooAsync;
  bar << barAsync;
  baz << failIn("erroar", 4);

  ({foo, bar, baz});
}).fork(error => {
  const end = new Date();
  console.log("Got erroar value:", error, "in:", (end - start) / 1000, "seconds")
}, i => i);
// Got erroar value: erroar in: 10.013 seconds
