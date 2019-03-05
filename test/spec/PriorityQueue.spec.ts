import { expect } from 'chai'
import { PriorityQueue, Sortable } from '../../src'

describe('PriorityQueue', () => {
  it('pushes new element', () => {
    const queue = new PriorityQueue(5)

    queue.push(new Element(1, 'hey'))

    expect(queue.size()).to.equal(1)
  })

  it('pops an element', () => {
    const queue = new PriorityQueue(5)

    queue.push(new Element(1, 'hey'))

    expect(queue.pop().unwrap()).to.have.property('value').that.equals('hey')
  })

  it('honours the priority', () => {
    const queue = new PriorityQueue(5)

    queue.push(new Element(1, 'hey'))
    queue.push(new Element(3, 'there'))
    queue.push(new Element(1, 'stranger'))

    expect(queue.pop().unwrap()).to.have.property('value').that.equals('there')
  })

  it('honours the queue max size', () => {
    const queue = new PriorityQueue(1)

    queue.push(new Element(1, 'hey'))
    queue.push(new Element(3, 'there'))

    expect(queue.size()).to.be.equal(1)
  })

  it('clears the queue', () => {
    const queue = new PriorityQueue(1)

    queue.push(new Element(1, 'hey'))
    queue.clear()

    expect(queue.size()).to.be.equal(0)
  })

  it('works like FIFO for same priority', () => {
    const queue = new PriorityQueue(1)

    queue.push(new Element(1, 'hey'))
    queue.push(new Element(1, 'there'))

    expect(queue.pop().unwrap()).to.have.property('value').that.equals('hey')
  })

  it('can use length property', () => {
    const queue = new PriorityQueue()

    queue.push(new Element(1, 'hey'))
    queue.push(new Element(1, 'there'))

    expect(queue.length).to.be.equal(2)
  })

  it('returns none if queue is empty', () => {
    const queue = new PriorityQueue()

    expect(queue.pop().isNone()).to.be.true
  })

})

export class Element implements Sortable {
  constructor (public priority: number, public value: string) {
    //
  }

  public comp (a: Element) : number {
    return a.priority < this.priority ? 1 : a.priority === this.priority ? 0 : -1
  }
}
