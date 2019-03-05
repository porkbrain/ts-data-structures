import { Pipeline } from './Pipeline'

type CallbackFilter<T> = (record: T) => Promise<T>

export class CallbackPipeline<Record> extends Pipeline<CallbackFilter<Record>, Record> {

  /**
   * {@inheritdoc}
   */
  constructor () {
    super((p, r) => p(r))
  }

}
