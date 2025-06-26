import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';

describe('E2E - Books and Reviews', () => {
  let app: INestApplication;
  let createdBookId: string;
  let createdReviewId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await disconnect();
  });

  it('should create a book', async () => {
    const res = await request(app.getHttpServer()).post('/books').send({
      title: '1984',
      author: 'George Orwell',
      description: 'Dystopian novel',
    });

    expect(res.status).toBe(201);
    expect(res.body.title).toBe('1984');
    createdBookId = res.body._id;
  });

  it('should list all books', async () => {
    const res = await request(app.getHttpServer()).get('/books');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return the book by ID', async () => {
    const res = await request(app.getHttpServer()).get(
      `/books/${createdBookId}`,
    );
    expect(res.status).toBe(200);
    expect(res.body._id).toBe(createdBookId);
  });

  it('should update a book', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/books/${createdBookId}`)
      .send({ description: 'Updated desc' });

    expect(res.status).toBe(200);
    expect(res.body.description).toBe('Updated desc');
  });

  it('should create a review for the book', async () => {
    const res = await request(app.getHttpServer())
      .post(`/books/${createdBookId}/reviews`)
      .send({ rating: 5, comment: 'Excelente leitura' });

    expect(res.status).toBe(201);
    expect(res.body.rating).toBe(5);
    createdReviewId = res.body._id;
  });

  it('should list reviews for the book', async () => {
    const res = await request(app.getHttpServer()).get(
      `/books/${createdBookId}/reviews`,
    );
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return top books', async () => {
    const res = await request(app.getHttpServer()).get('/books/top?limit=1');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
    expect(res.body[0]).toHaveProperty('avgRating');
    expect(res.body[0]).toHaveProperty('reviewCount');
  });

  it('should update a review', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/books/${createdBookId}/reviews/${createdReviewId}`)
      .send({ comment: 'Nova revisão' });

    expect(res.status).toBe(200);
    expect(res.body.comment).toBe('Nova revisão');
  });

  it('should delete a review', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/books/${createdBookId}/reviews/${createdReviewId}`,
    );
    expect(res.status).toBe(200);
  });

  it('should delete the book', async () => {
    const res = await request(app.getHttpServer()).delete(
      `/books/${createdBookId}`,
    );
    expect(res.status).toBe(200);
  });
});
