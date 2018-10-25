const Maybe = require('crocks/Maybe');

const resolveIn = (val, secs) => Async((rej, res) => setTimeout(() => res(val), secs * 1000));

const fooMaybe = Maybe.Just("foo");
const barMaybe = Maybe.Just("bar");
const bazMaybe = Maybe.Just("baz");

console.log("result is:", 
  do {
    foo << fooMaybe;
    bar << barMaybe;
    baz << bazMaybe;

    ({foo, bar, baz});
  }
);
// result is: Just { foo: "foo", bar: "bar", baz: "baz" }

console.log("result is:", 
  do {
    foo << fooMaybe;
    bar << Maybe.Nothing();
    baz << bazMaybe;

    ({foo, bar, baz});
  }
);
// result is: Nothing

