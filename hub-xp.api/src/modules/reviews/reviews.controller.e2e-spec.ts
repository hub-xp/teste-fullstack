import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ReviewController } from './reviews.controller';
import { ReviewService } from './reviews.service';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';

describe('ReviewController (e2e)', () => {
  let app: INestApplication;
  let reviewService: ReviewService;

  const mockReview = {
    id: '1',
    bookId: '507f1f77bcf86cd799439011',
    reviewCount: 1,
    avaliation: '5',
    createdAt: '2025-06-13T17:48:00.367Z',
    updatedAt: '2025-06-13T17:48:00.367Z',
  };

  const mockReviewService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByBookId: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [
        {
          provide: ReviewService,
          useValue: mockReviewService,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    reviewService = moduleFixture.get<ReviewService>(ReviewService);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
    jest.clearAllMocks();
  });

  describe('POST /reviews', () => {
    it('should create a review', async () => {
      const createReviewDto: CreateReviewDto = {
        bookId: mockReview.bookId,
        reviewCount: mockReview.reviewCount,
        avaliation: mockReview.avaliation,
      };

      mockReviewService.create.mockResolvedValue({
        data: mockReview,
        message: 'Review criada com sucesso',
      });

      const response = await request(app.getHttpServer())
        .post('/reviews')
        .send(createReviewDto)
        .expect(201);

      expect(response.body).toEqual({
        data: mockReview,
        message: 'Review criada com sucesso',
      });
      expect(mockReviewService.create).toHaveBeenCalledWith(createReviewDto);
    });
  });

  describe('GET /reviews', () => {
    it('should return paginated reviews', async () => {
      const mockResponse = {
        data: [mockReview],
        meta: {
          total: 1,
          page: 1,
          totalPages: 1,
        },
      };

      mockReviewService.findAll.mockResolvedValue(mockResponse);

      const response = await request(app.getHttpServer())
        .get('/reviews')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toEqual(mockResponse);
      expect(mockReviewService.findAll).toHaveBeenCalledWith({
        page: '1',
        limit: '10',
      });
    });
  });

  describe('GET /reviews/:id', () => {
    it('should return a review by id', async () => {
      mockReviewService.findOne.mockResolvedValue({
        data: mockReview,
      });

      const response = await request(app.getHttpServer())
        .get(`/reviews/${mockReview.id}`)
        .expect(200);

      expect(response.body).toEqual({
        data: mockReview,
      });
      expect(mockReviewService.findOne).toHaveBeenCalledWith(mockReview.id);
    });
  });

  describe('GET /reviews/book/:bookId', () => {
    it('should return reviews by book id', async () => {
      const mockResponse = {
        data: [mockReview],
        meta: {
          total: 1,
          page: 1,
          totalPages: 1,
        },
      };

      mockReviewService.findByBookId.mockResolvedValue(mockResponse);

      const response = await request(app.getHttpServer())
        .get(`/reviews/book/${mockReview.bookId}`)
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body).toEqual(mockResponse);
      expect(mockReviewService.findByBookId).toHaveBeenCalledWith(
        mockReview.bookId,
        { page: '1', limit: '10' },
      );
    });
  });

  describe('PATCH /reviews/:id', () => {
    it('should update a review', async () => {
      const updateReviewDto: UpdateReviewDto = {
        avaliation: '4',
      };

      const updatedReview = {
        ...mockReview,
        avaliation: updateReviewDto.avaliation,
      };

      mockReviewService.update.mockResolvedValue({
        data: updatedReview,
        message: 'Review atualizada com sucesso',
      });

      const response = await request(app.getHttpServer())
        .patch(`/reviews/${mockReview.id}`)
        .send(updateReviewDto)
        .expect(200);

      expect(response.body).toEqual({
        data: updatedReview,
        message: 'Review atualizada com sucesso',
      });
      expect(mockReviewService.update).toHaveBeenCalledWith(
        mockReview.id,
        updateReviewDto,
      );
    });
  });

  describe('DELETE /reviews/:id', () => {
    it('should delete a review', async () => {
      mockReviewService.remove.mockResolvedValue({
        data: mockReview,
        message: 'Review removida com sucesso',
      });

      const response = await request(app.getHttpServer())
        .delete(`/reviews/${mockReview.id}`)
        .expect(200);

      expect(response.body).toEqual({
        data: mockReview,
        message: 'Review removida com sucesso',
      });
      expect(mockReviewService.remove).toHaveBeenCalledWith(mockReview.id);
    });
  });
}); 