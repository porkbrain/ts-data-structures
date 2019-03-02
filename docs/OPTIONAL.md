# Optional

Optional data structure is based on Rust `Option` enum. It removes the hassle of
checking for `null` or `undefined` in your code and provides set of useful methods
for dealing with potentially missing data.

## Exports
```typescript
import {
  None,
  Some,
  Optional,
} from '@bausano/data-structures'

const none: Optional<number> = new None

const some: Optional<number> = none.or(new Some(3))
```

## API

- `isSome () : boolean`
Determines whether the option wraps any value (is instance of `Some`).

- `isNone () : boolean`
Determines whether the option has no value (is instance of `None`).

- `unwrap () : T`
Returns the value or throws an exception if the option is `None`.

- `unwrapOr (def: T) : T`
If the option is `Some`, returns the value, otherwise return the `def`.

- `unwrapOrElse (closure: () => T) : T`
If the option is `Some`, returns the value, otherwise computes the `closure` and returns the result.

- `expect (e: Error) : T`
If the option is `Some`, return it. Otherwise, throws the error `e`.

- `filter (predicate: (t: T) => boolean) : Optional<T>`
Returns `None` if the option is `None`, otherwise calls predicate with the value
and returns `Some` if the predicate returns `true`, or `None` if the predicate returns `false`.

- `map<U, V> (u: Optional<U>, predicate: (t: T, u: U) => Optional<V>) : Optional<V>`
Maps this optional to the other one. If either option is `None`, returns `None` as well.
Otherwise, returns the result of the predicate.

- `mapOr<U> (predicate: (t: T) => U, def: U) : U`
Maps `T` to the type `U` or defaults if option is `None`.

- `mapOrElse<U> (predicate: (t: T) => U, closure: () => U) : U`
Maps `T` to the type `U` or defaults if option is `None`.

- `match (some: (t: T) => void, none: () => void) : void`
If option is `None`, matches second callback, otherwise passes option value to the first callback.

- `matchSome (closure: (t: T) => void) : void`
Runs the closure if optional is `Some`.

- `matchNone (closure: () => void) : void`
Runs the closure if optional is `None`.

- `andThen<U> (closure: (t: T) => Optional<U>) : Optional<U>`
Mutates the `Optional`'s wrapped value into a new type.

- `or (def: Optional<T>) : Optional<T>`
If this optional is `None`, returns `def`, otherwise returns `this`.

- `orElse (closure: () => Optional<T>) : Optional<T>`
If this optional is `None`, returns `def`, otherwise returns `this`.

## References
When using optionals as class properties, in order to change the value of the
optional, you have to instantiate a new object, meaning any reference to the
previous optional will still point to the old value.
