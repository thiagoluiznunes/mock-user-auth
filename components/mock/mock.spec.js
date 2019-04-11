import chai from 'chai';
import mock from './mock';

const assert = chai.assert;

describe('Module mock' , () => {
  it('It should be a module', () => {
    assert.typeOf(mock, 'Object');
  });
});

describe('Module mock api' , () => {
  it('It should be a express router function ', () => {
    assert.typeOf(mock.api, 'function');
  });
});
