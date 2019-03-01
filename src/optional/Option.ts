import { Some } from './Some'
import { None } from './None'
import { Optional } from './Optional'

export class Option<T> implements Optional<T> {

  /**
   * @param wrapped Some or None
   */
  private constructor (private wrapped: Optional<T>) {
    //
  }

  /**
   * Wraps the value into Some optional. If the value is undefined or null, it
   * still wraps it with Some. Use `Optional.from(value)` to handle empty values.
   *
   * @param value Value to wrap
   * @return Optional instance of Some wrapping the value
   */
  public static some<T> (value: T) {
    return new Option<T>(new Some(value))
  }

  /**
   * Instantiates new None optional.
   *
   * @return Optional instance of None
   */
  public static none<T> () {
    return new Option<T>(new None())
  }

  /**
   * If given value is undefined or null, it transforms it into None optional.
   * Otherwise Some is returned wrapping given value.
   *
   * @param value Value we want to wrap
   * @return None if the value is undefined or null, otherwise Some
   */
  public static from<T> (value: T) {
    return value === undefined || value === null
      ? Option.some(value)
      : Option.none()
  }

  /**
   * Replaces current value with a new one.
   *
   * @param value New optional value
   */
  public replace (value: T) : void {
    this.wrapped = new Some(value)
  }

  /**
   * If optional is none, it is assigned provided value.
   *
   * @param value New optional value
   */
  public populate (value: T) : void {
    this.wrapped = this.wrapped.orElse(() => new Some(value))
  }

  /**
   * Puts optional into a new object, changes this optional to None and returns
   * the original one.
   *
   * @return Old optional value
   */
  public take () : Option<T> {
    const option: Option<T> = new Option(this.wrapped)

    this.wrapped = new None<T>()

    return option
  }

  /**
   * {@inheritdoc}
   */
  public unwrap () : T {
    return this.wrapped.unwrap()
  }

  /**
   * {@inheritdoc}
   */
  public isSome () : boolean {
    return this.wrapped.isSome()
  }

  /**
   * {@inheritdoc}
   */
  public isNone () : boolean {
    return this.wrapped.isNone()
  }

  /**
   * {@inheritdoc}
   */
  public filter (predicate: (t: T) => boolean) : Optional<T> {
    return this.wrapped.filter(predicate)
  }

  /**
   * {@inheritdoc}
   */
  public map<U, V> (u: Optional<U>, predicate: (t: T, u: U) => Optional<V>) : Optional<V> {
    return this.wrapped.map(u, predicate)
  }

  /**
   * {@inheritdoc}
   */
  public mapOr<U> (predicate: (t: T) => U, def: U) : U {
    return this.wrapped.mapOr(predicate, def)
  }

  /**
   * {@inheritdoc}
   */
  public marOrElse<U> (predicate: (t: T) => U, closure: () => U) : U {
    return this.wrapped.marOrElse(predicate, closure)
  }

  /**
   * {@inheritdoc}
   */
  public expect (e: Error) : T {
    return this.wrapped.expect(e)
  }

  /**
   * {@inheritdoc}
   */
  public unwrapOr (def: T) : T {
    return this.wrapped.unwrapOr(def)
  }

  /**
   * {@inheritdoc}
   */
  public unwrapOrElse (closure: () => T) : T {
    return this.wrapped.unwrapOrElse(closure)
  }

  /**
   * {@inheritdoc}
   */
  public match<U> (some: (t: T) => U, none?: () => U) : U {
    return this.wrapped.match(some, none)
  }

  /**
   * {@inheritdoc}
   */
  public then<U> (closure: (t: T) => Optional<U>) : Optional<U> {
    return this.wrapped.then(closure)
  }

  /**
   * {@inheritdoc}
   */
  public or (def: Optional<T>) : Optional<T> {
    return this.wrapped.or(def)
  }

  /**
   * {@inheritdoc}
   */
  public orElse (closure: () => Optional<T>) : Optional<T> {
    return this.wrapped.orElse(closure)
  }

}
