import { Optional } from './Optional'
import { Some as SomeOption } from './Some'

/**
 * Wraps the value into Some optional.
 *
 * @param value Value to wrap
 * @return Optional instance of Some wrapping the value
 */
export function Some<T> (value: T) : Optional<T> {
  return new SomeOption(value)
}
