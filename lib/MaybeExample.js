const Maybe = require('crocks/Maybe');

const resolveIn = (val, secs) => Async((rej, res) => setTimeout(() => res(val), secs * 1000));

const fooMaybe = Maybe.Just("foo");
const barMaybe = Maybe.Just("bar");
const bazMaybe = Maybe.Just("baz");
console.log("result is:", function () {
  return fooMaybe.chain(foo => {
    return barMaybe.chain(bar => {
      return bazMaybe.map(baz => {
        return {
          foo,
          bar,
          baz
        };
      });
    });
  });
}()); // result is: Just { foo: "foo", bar: "bar", baz: "baz" }

console.log("result is:", function () {
  return fooMaybe.chain(foo => {
    return Maybe.Nothing().chain(bar => {
      return bazMaybe.map(baz => {
        return {
          foo,
          bar,
          baz
        };
      });
    });
  });
}()); // result is: Nothing