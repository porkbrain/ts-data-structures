import { None } from './None'
import { Optional } from './Optional'

export class Some<T> implements Optional<T> {

  /**
   * @param value The value to be wrapped in the option
   */
  constructor (private value: T) {
    //
  }

  /**
   * {@inheritdoc}
   */
  public unwrap () : T {
    return this.value
  }

  /**
   * {@inheritdoc}
   */
  public isSome () : boolean {
    return true
  }

  /**
   * {@inheritdoc}
   */
  public isNone () : boolean {
    return false
  }

  /**
   * {@inheritdoc}
   */
  public filter (predicate: (t: T) => boolean) : Optional<T> {
    return predicate(this.value) ? this : new None
  }

  /**
   * {@inheritdoc}
   */
  public map<U, V> (u: Optional<U>, predicate: (t: T, u: U) => Optional<V>) : Optional<V> {
    if (u.isNone()) {
      return new None
    }

    return predicate(this.value, u.unwrap())
  }

  /**
   * {@inheritdoc}
   */
  public mapOr<U> (predicate: (t: T) => U) : U {
    return predicate(this.value)
  }

  /**
   * {@inheritdoc}
   */
  public mapOrElse<U> (predicate: (t: T) => U) : U {
    return predicate(this.value)
  }

  /**
   * {@inheritdoc}
   */
  public expect () : T {
    return this.value
  }

  /**
   * {@inheritdoc}
   */
  public unwrapOr () : T {
    return this.value
  }

  /**
   * {@inheritdoc}
   */
  public unwrapOrElse () : T {
    return this.value
  }

  /**
   * {@inheritdoc}
   */
  public match (some: (t: T) => void) : void {
    some(this.value)
  }

  /**
   * {@inheritdoc}
   */
  public matchSome (closure: (t: T) => void) : void {
    closure(this.value)
  }

  /**
   * {@inheritdoc}
   */
  public matchNone () : void {
    //
  }

  /**
   * {@inheritdoc}
   */
  public andThen<U> (closure: (t: T) => Optional<U>) : Optional<U> {
    return closure(this.value)
  }

  /**
   * {@inheritdoc}
   */
  public or () : Optional<T> {
    return this
  }

  /**
   * {@inheritdoc}
   */
  public orElse () : Optional<T> {
    return this
  }

}
