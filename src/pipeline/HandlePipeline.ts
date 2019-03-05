import { Pipeline } from './Pipeline'

interface HandleFilter<T> {

  /**
   * I&O pipe.
   *
   * @param record Data to transform
   * @return Transformed data
   */
  handle (record: T) : Promise<T>

}

export class HandlePipeline<Record> extends Pipeline<HandleFilter<Record>, Record> {

  /**
   * {@inheritdoc}
   */
  constructor () {
    super((p, r) => p.handle(r))
  }

}
