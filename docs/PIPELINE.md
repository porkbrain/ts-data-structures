# Pipeline

Extracted from `@exteranto/framework`, pipeline sends data through filters that
modify it. Filters functions take the data from previous filter as input and
outputs an input for the next one.

## Exports and examples
```typescript
import {
  Pipeline,
  HandlePipeline,
  CallbackPipeline,
} from '@bausano/data-structures'

new Pipeline<(s: string) => Promise<string>, string>((pipe, record) => pipe(record))
  .feed('What\'s your name?', [
    async input => `${input} I'm A.`,
    async input => `${input} I'm B.`,
  ])
  .then(result => console.assert(result === `What\'s your name? I'm A. I'm B.`))

new CallbackPipeline<string>()
  .feed('What\'s your name?', [
    async input => `${input} I'm A.`,
    async input => `${input} I'm B.`,
  ])
  .then(result => console.assert(result === `What\'s your name? I'm A. I'm B.`))

class Person {

  constructor (private name: string) {
    //
  }

  public async handle (input: string) : Promise<string> {
    return `${input} I'm ${this.name}.`
  }

}

new HandlePipeline<string>()
  .feed('What\'s your name?', [
    new Person('A'),
    new Person('B'),
  ])
  .then(result => console.assert(result === `What\'s your name? I'm A. I'm B.`))
```

## API

- `new<Pipe, Record> (compose: (p: Pipe, r: Record) => Promise<Record>) : Pipeline`
Where `Pipe` the transofrming function and `Record` is the data type it works with.
`HandlePipeline` and `CallbackPipeline` extend `Pipeline` class and are just
shortcuts for two most common cases so that you don't have to specify the
composition function in constructor.

- `feed (record: Record, pipes: Pipe[]) : Promise<Record>`
The `record` is being passed from one element of `pipes` to next. It returns a
`Promise` with the transformed data.

## Notes
All errors and `Promise` rejections in the pipes are propagated to the resulting
`Promise` that is rejected with the error.
