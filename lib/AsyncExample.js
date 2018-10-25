const Async = require('crocks/Async');

const resolveIn = (val, secs) => Async((rej, res) => setTimeout(() => res(val), secs * 1000));

const failIn = (err, secs) => Async((rej, res) => setTimeout(() => rej(err), secs * 1000));

const fooAsync = resolveIn("foo", 3);
const barAsync = resolveIn("bar", 3);
const start = new Date();
(function () {
  return fooAsync.chain(foo => {
    return barAsync.map(bar => {
      return {
        foo,
        bar
      };
    });
  });
})().fork(i => i, success => {
  const end = new Date();
  console.log("Got successful value:", success, "in:", (end - start) / 1000, "seconds");
}); // Got successful value: { foo: 'foo', bar: 'bar' } in: 6.005 seconds

(function () {
  return fooAsync.chain(foo => {
    return barAsync.chain(bar => {
      return failIn("erroar", 4).map(baz => {
        return {
          foo,
          bar,
          baz
        };
      });
    });
  });
})().fork(error => {
  const end = new Date();
  console.log("Got erroar value:", error, "in:", (end - start) / 1000, "seconds");
}, i => i);