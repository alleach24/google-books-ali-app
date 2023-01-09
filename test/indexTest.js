import { assert } from 'chai';

import index from '../bin/index.js'
// console.log(index)
// console.log(typeof(index))

describe('Index', function () {
  it('should return "hello"', function () {
    assert.equal(index(), 'hello');
  });
});