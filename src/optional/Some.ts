import { Optional } from './Optional'

export class Some<T> implements Optional<T> {

  /**
   * @param value The value to be wrapped in the option
   */
  constructor (private value: T) {
    //
  }

}
