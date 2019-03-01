import { Option } from './Option'
import { Optional } from './Optional'

/**
 * Wraps the value into Some optional. If the value is undefined or null, it
 * still wraps it with Some. Use `Option.from(value)` to handle empty values.
 *
 * @param value Value to wrap
 * @return Optional instance of Some wrapping the value
 */
export function Some<T> (value: T) : Optional<T> {
  return Option.some(value)
}
