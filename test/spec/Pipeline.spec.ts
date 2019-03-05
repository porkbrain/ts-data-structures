import { expect } from 'chai'
import { Pipeline, HandlePipeline, CallbackPipeline } from '../../src'

type StringFilter = (s: string) => Promise<string>;

describe('Pipeline Service', () => {

  it('modifies a value in the pipes', async () => {
    await expect(new Pipeline<StringFilter, string>(async (pipe, data) => pipe(data))
      .feed('test', [
        async passable => passable + '1',
        async passable => passable + '2',
        async passable => passable + '3'
      ])).to.eventually.equal('test123')
  })

  it('properly handles errors in pipes', async () => {
    await expect(new Pipeline<StringFilter, string>(async (pipe, data) => pipe(data))
      .feed('test', [
        async passable => passable + '1',
        async _ => { throw new Error('errorMessage') },
        async passable => passable + '3'
      ])).to.eventually.be.rejectedWith('errorMessage')
  })

  describe('Handle Pipeline', () => {

    it('instantiates pipes with handle method', async () => {
      await expect(new HandlePipeline<string>()
        .feed('test', [
          { handle: async passable => passable + '1' },
          { handle: async passable => passable + '2' },
          { handle: async passable => passable + '3' },
        ])).to.eventually.equal('test123')
    })

  })

  describe('Callback Pipeline', () => {

    it('instantiates pipes that are pure callbacks', async () => {
      await expect(new CallbackPipeline<string>()
        .feed('test', [
          async passable => passable + '1',
          async passable => passable + '2',
          async passable => passable + '3',
        ])).to.eventually.equal('test123')
    })

  })

})
