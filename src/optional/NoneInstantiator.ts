import { Optional } from './Optional'
import { None as NoneOption } from './None'

/**
 * Instantiates new None optional.
 *
 * @return Optional instance of None
 */
export function None<T> () : Optional<T> {
  return new NoneOption
}
