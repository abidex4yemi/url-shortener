const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

let encodedUrlResponse = null;
const baseUrl = '/api/v1/url';

before(async () => {
  encodedUrlResponse = await new Promise((resolve, reject) => {
    request(app)
      .post(`${baseUrl}/encode`)
      .send({ longUrl: 'https://cloud.digitalocean.com' })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        if (err) return reject(err);
        resolve(res.body);
      });
  });
});

describe('POST /api/v1/url/encode', () => {
  it('should encode a long URL and return a short URL', async () => {
    expect(encodedUrlResponse.success).to.be.true;
    expect(encodedUrlResponse.content.shortUrl).to.exist;
    expect(encodedUrlResponse.message).to.equal('Url successfully encoded.');
  });
});

describe('GET /api/v1/url/decode', () => {
  it('should decode a short URL id and return a long URL', async () => {
    const urlExistResponse = await new Promise((resolve, reject) => {
      request(app)
        .get(`${baseUrl}/decode/${encodedUrlResponse.content.shortUrlId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return reject(err);
          resolve(res.body);
        });
    });

    expect(urlExistResponse.success).to.be.true;
    expect(urlExistResponse.content.shortUrl).to.exist;
    expect(urlExistResponse.message).to.equal('Url found.');
  });
});

describe('GET /api/v1/url/decode', () => {
  it('should return error if short id not valid', async () => {
    const urlExistResponse = await new Promise((resolve, reject) => {
      request(app)
        .get(`${baseUrl}/decode/random123`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return reject(err);
          resolve(res.body);
        });
    });
    expect(urlExistResponse.success).to.be.false;
    expect(urlExistResponse.content.shortUrl).to.not.exist;
    expect(urlExistResponse.message).to.equal('url not found');
  });
});

describe('GET /api/v1/url/statistic', () => {
  it('should get short Url statistics', async () => {
    const urlExistResponse = await new Promise((resolve, reject) => {
      request(app)
        .get(`${baseUrl}/statistic/${encodedUrlResponse.content.shortUrlId}`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return reject(err);
          resolve(res.body);
        });
    });

    expect(urlExistResponse.success).to.be.true;
    expect(urlExistResponse.content.shortUrl).to.exist;
    expect(urlExistResponse.content.visitHistory).to.be.an('array');
    expect(urlExistResponse.content).to.have.property('totalClicks');
  });
});
