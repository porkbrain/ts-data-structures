import { Option } from './Option'
import { Optional } from './Optional'

/**
 * Instantiates new None optional.
 *
 * @return Optional instance of None
 */
export function None<T> () : Optional<T> {
  return Option.none()
}
