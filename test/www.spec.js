process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import { server, normalizePort, onError } from '../bin/www';

const assert = chai.assert;
const expect = chai.expect;

chai.use(chaiHttp);

describe('WWW server', () => {
  describe('NormalizePort Function', () => {
    it('It should return 3001 port', () => {
      const port = normalizePort();
      expect(port).to.be.a('number');
      expect(port).to.equal(3001);
    });
    it('It should return false', () => {
      process.env.NODE_ENV = 'default';
      const port = normalizePort(-3001);
      expect(port).to.equal(false);
    });
    it('It should return number', () => {
      after(() => {
        process.env.NODE_ENV = 'test';
      });
      process.env.NODE_ENV = 'default';
      const port = normalizePort('4500');
      expect(port).to.be.a('number');
      expect(port).to.equal(4500);
    });
    it('It should return isNaN', () => {
      after(() => {
        process.env.NODE_ENV = 'test';
      });
      process.env.NODE_ENV = 'default';
      const port = normalizePort('isNaN');
      expect(port).not.be.a('number');
      expect(port).to.equal('isNaN');
    });
  });

  describe('OnError Function', () => {
    it('It should throw exception', () => {
      try {
        expect(onError({ syscall: 'isNotSyscall' })).to.throw();
      } catch (err) {
        expect(err).to.be.a('Object');
        expect(err.syscall).to.equal('isNotSyscall');
      }
    });
    it('It should catch default error', () => {
      try {
        expect(onError({ syscall: 'listen', code: 'Default' })).to.throw();
      } catch (err) {
        expect(err).to.be.a('Object');
        expect(err.code).to.equal('Default');
      }
    });
    // it('It should catch EACCES error', () => {
    //   try {
    //     expect(onError({ syscall: 'listen', code: 'EACCES' })).to.throw();
    //   } catch (err) {}
    // });
    // it('It should catch EADDRINUSE error', () => {
    //   try {
    //     expect(onError({ syscall: 'listen', code: 'EADDRINUSE' })).to.throw();
    //   } catch (err) {}
    // });
  });
});
