process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import { server } from '../bin/www';

const expect = chai.expect;

chai.use(chaiHttp);

describe('Cors middleware', () => {
  it('It should return 200', () => {
    chai.request(server)
      .options('/api/v1/')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
      });
  });
  it('It should pass request', () => {
    chai.request(server)
      .get('/api/v1/')
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
      });
  });
});
