import { expect } from 'chai'
import { Optional, Some, None, OptionIsNoneException } from '../../src'

describe('Optional', () => {

  const some: Optional<number> = new Some<number>(1)
  const none: Optional<number> = new None<number>()

  it ('inits a new instance', () => {
    expect(some.isSome()).to.be.ok
    expect(some.isNone()).to.be.false

    expect(none.isNone()).to.be.ok
    expect(none.isSome()).to.be.false
  })

  it ('unwraps a value', () => {
    expect(some.unwrap()).to.be.equal(1)

    expect(() => none.unwrap()).to.throw(OptionIsNoneException)
  })

  it ('filters the option', () => {
    expect(some.filter(it => it === 1).isSome()).to.be.ok
    expect(some.filter(it => it > 10).isNone()).to.be.ok

    expect(none.filter(_ => true).isNone()).to.be.ok
  })

  it ('maps the option', () => {
    expect(some
      .map<number, number>(new None<number>(), (t: number, u: number) => new Some<number>(t + u))
      .isNone()
    ).to.be.ok
    expect(some
      .map<number, number>(new Some<number>(2), (t: number, u: number) => new Some<number>(t + u))
      .unwrap()
    ).to.equal(3)

    expect(none
      .map<number, number>(new Some<number>(2), (t: number, u: number) => new Some<number>(t + u))
      .isNone()
    ).to.be.ok
  })

  it ('throws custom error with expect', () => {
    expect(some.expect(new Error('error'))).to.equal(1)

    expect(() => none.expect(new Error('error'))).to.throw(Error, 'error')
  })

  it ('defaults to a value', () => {
    expect(some.unwrapOr(2)).to.equal(1)

    expect(none.unwrapOr(2)).to.equal(2)
  })

  it ('defaults to a computed value', () => {
    expect(some.unwrapOrElse(() => 2)).to.equal(1)

    expect(none.unwrapOrElse(() => 2)).to.equal(2)
  })

  it ('maps or defaults with closure', () => {
    expect(some.mapOrElse<number>(
      some => some + 1,
      () => 1,
    )).to.equal(2)

    expect(none.mapOrElse<number>(
      some => some + 1,
      () => 1,
    )).to.equal(1)
  })

  it ('maps or defaults with value', () => {
    expect(some.mapOr<number>(
      some => some + 1,
      1,
    )).to.equal(2)

    expect(none.mapOr<number>(
      some => some + 1,
      1,
    )).to.equal(1)
  })

  it ('matches some to the first callback', (done) => {
    some.match(_ => done(), () => undefined)
  })

  it ('matches some only', (done) => {
    some.matchNone(() => done(new Error))

    some.matchSome(_ => done())
  })

  it ('matches the none to the second callback', (done) => {
    none.match(() => undefined, done)
  })

  it ('matches none only', (done) => {
    none.matchSome(_ => done(new Error))

    none.matchNone(done)
  })

  it ('chains the optionals', () => {
    expect(some.then(value => new Some(String(value) + '2')).unwrap())
      .to.equal('12')

    expect(none.then(value => new Some(String(value) + '2')).isNone())
      .to.be.ok
  })

  it ('defaults optionals', () => {
    expect(some.or(new Some(2)).unwrap()).to.equal(1)

    expect(none.or(new Some(2)).unwrap()).to.equal(2)

    expect(some.orElse(() => new Some(2)).unwrap()).to.equal(1)

    expect(none.orElse(() => new Some(2)).unwrap()).to.equal(2)
  })

})
