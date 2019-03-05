# Priority queue
Inspired by Java's `PriorityQueue<T extends Sortable>`. Sorts elements based on the
comparison function the type `T` provides and also optionally limits the size.

## Exports and examples
```typescript
import {
  Sortable,
  PriorityQueue,
} from '@bausano/data-structures'

export class Element implements Sortable {
  constructor (public priority: number, public value: string) {
    //
  }

  public comp (a: Element) : number {
    return a.priority < this.priority ? 1 : a.priority === this.priority ? 0 : -1
  }
}

const queue = new PriorityQueue(2)

queue.push(new Element(1, 'hey'))
queue.push(new Element(3, 'there'))
queue.push(new Element(1, 'stranger'))

console.assert(queue.length === 2)
```

## API

- `new<T extends Sortable> (maxLength?: number) : PriorityQueue<T>`
If `maxLength` is provided, queue ensures it's size doesn't grow over this number
after `push` method.

- `length: number` and `size () : number`
Number of elements in the queue.

- `pop () : Optional<T>`
Returns `Some` with element on top (best rated). If the queue is empty, returns `None`.

- `push (el: T) : void`
Adds new element to the queue. If the queue size grows over limit, discards the
worst rated element.

- `clear () : void`
Empties the queue.

## Notes
The `Sortable`'s method `comp (another: Sortable)` should return 1 if `this` is
larger, 0 if they're equal and -1 if `another` is larger. Where larger means
"is on top of the queue".
