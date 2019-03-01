import { Optional } from './Optional'
import { OptionIsNoneException } from './exceptions'

export class None<T> implements Optional<T> {

  /**
   * {@inheritdoc}
   */
  public unwrap () : T {
    throw new OptionIsNoneException()
  }

  /**
   * {@inheritdoc}
   */
  public isSome () : boolean {
    return false
  }

  /**
   * {@inheritdoc}
   */
  public isNone () : boolean {
    return true
  }

  /**
   * {@inheritdoc}
   */
  public filter () : Optional<T> {
    return new None<T>()
  }

  /**
   * {@inheritdoc}
   */
  public map<_, V> () : Optional<V> {
    return new None<V>()
  }

  /**
   * {@inheritdoc}
   */
  public mapOr<U> (_: (t: T) => U, def: U) : U {
    return def
  }

  /**
   * {@inheritdoc}
   */
  public marOrElse<U> (_: (t: T) => U, closure: () => U) : U {
    return closure()
  }

  /**
   * {@inheritdoc}
   */
  public expect (e: Error) : T {
    throw e
  }

  /**
   * {@inheritdoc}
   */
  public unwrapOr (def: T) : T {
    return def
  }

  /**
   * {@inheritdoc}
   */
  public unwrapOrElse (closure: () => T) : T {
    return closure()
  }

  /**
   * {@inheritdoc}
   */
  public match<U> (_: (t: T) => U, none?: () => U) : U {
    return none && none()
  }

  /**
   * {@inheritdoc}
   */
  public then<U> (closure: (t: T) => Optional<U>) : Optional<U> {

  }

}
