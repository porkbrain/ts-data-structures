type Composition<T, U> = (p: T, r: U) => Promise<U>

export class Pipeline<Pipe, Record> {

  /**
   * @param compose Defines how a pipe works with data
   */
  constructor (private compose: Composition<Pipe, Record>) {
    //
  }

  /**
   * Streams `record` through `pipes` where output from previous pipe is an
   * input to the next one.
   * If at any point an exception is thrown, propagates the error to output.
   *
   * @param record Input data that is passed from one pipe to another
   * @param pipes Filter that works with the data
   * @return Transformed data
   */
  public async feed (record: Record, pipes: Pipe[]) : Promise<Record> {
    return pipes.reduce(async (passable, pipe) => {
      return this.compose(pipe, await passable)
    }, Promise.resolve(record))
  }

}
