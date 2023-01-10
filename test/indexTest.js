import { assert } from 'chai';

import { index, index1, makeList } from '../bin/index.js'

describe('Index', function () {
  it('index() should return "hello"', function () {
    let result = index();
    assert.equal(result, 'hello');
  });
  it('index() should return type string', function () {
    let result = index();
    assert.typeOf(result, 'string');
  });

  it('index1() should return "hello1"', function () {
    let result = index1();
    assert.equal(result, 'hello1');
  });


  it('makeList() should return the title i entered', function () {
    let result = makeList();
    assert.equal(result, 'test-title');
  });
  it('makeList() should return a string', function () {
    let result = makeList();
    assert.typeOf(result, 'string');
  });
});