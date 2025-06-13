import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './reviews.service';
import { ReviewRepository } from './reviews.repository';
import { ReviewTransformer } from './transformer/reviews.transformer';
import { CreateReviewDto } from './dtos/create-review.dto';
import { UpdateReviewDto } from './dtos/update-review.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { AppError } from '../../commons/AppError';
import { OperationErrors } from '../../commons/OperationErrors.enum';

describe('ReviewService', () => {
  let service: ReviewService;
  let repository: ReviewRepository;
  let transformer: ReviewTransformer;

  const mockReview = {
    _id: '1',
    bookId: '507f1f77bcf86cd799439011',
    reviewCount: 1,
    avaliation: '5',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTransformedReview = {
    id: '1',
    bookId: '507f1f77bcf86cd799439011',
    reviewCount: 1,
    avaliation: '5',
  };

  const mockReviewRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByBookId: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockReviewTransformer = {
    transform: jest.fn(),
    transformMany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: ReviewRepository,
          useValue: mockReviewRepository,
        },
        {
          provide: ReviewTransformer,
          useValue: mockReviewTransformer,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    repository = module.get<ReviewRepository>(ReviewRepository);
    transformer = module.get<ReviewTransformer>(ReviewTransformer);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a review', async () => {
      const createReviewDto: CreateReviewDto = {
        bookId: mockReview.bookId,
        reviewCount: mockReview.reviewCount,
        avaliation: mockReview.avaliation,
      };

      mockReviewRepository.create.mockResolvedValue(mockReview);
      mockReviewTransformer.transform.mockResolvedValue(mockTransformedReview);

      const result = await service.create(createReviewDto);

      expect(result).toEqual({
        data: mockTransformedReview,
        message: 'Review criada com sucesso',
      });
      expect(mockReviewRepository.create).toHaveBeenCalledWith(createReviewDto);
      expect(mockReviewTransformer.transform).toHaveBeenCalledWith(mockReview);
    });
  });

  describe('findAll', () => {
    it('should return paginated reviews', async () => {
      const queryParams = { page: 1, limit: 10 };
      const mockPaginatedResponse = {
        reviews: [mockReview],
        total: 1,
      };

      mockReviewRepository.findAll.mockResolvedValue(mockPaginatedResponse);
      mockReviewTransformer.transformMany.mockResolvedValue([mockTransformedReview]);

      const result = await service.findAll(queryParams);

      expect(result).toEqual({
        data: [mockTransformedReview],
        meta: {
          total: 1,
          page: 1,
          totalPages: 1,
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a review by id', async () => {
      mockReviewRepository.findOne.mockResolvedValue(mockReview);
      mockReviewTransformer.transform.mockResolvedValue(mockTransformedReview);

      const result = await service.findOne('1');

      expect(result).toEqual({
        data: mockTransformedReview,
      });
      expect(mockReviewRepository.findOne).toHaveBeenCalledWith('1');
      expect(mockReviewTransformer.transform).toHaveBeenCalledWith(mockReview);
    });

    it('should throw HttpException if review is not found', async () => {
      mockReviewRepository.findOne.mockResolvedValue(null);

      try {
        await service.findOne('1');
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getResponse()).toEqual({ message: 'Review não encontrada' });
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('findByBookId', () => {
    it('should return reviews by book id', async () => {
      const queryParams = { page: 1, limit: 10 };
      const mockPaginatedResponse = {
        reviews: [mockReview],
        total: 1,
      };

      mockReviewRepository.findByBookId.mockResolvedValue(mockPaginatedResponse);
      mockReviewTransformer.transformMany.mockResolvedValue([mockTransformedReview]);

      const result = await service.findByBookId(mockReview.bookId, queryParams);

      expect(result).toEqual({
        data: [mockTransformedReview],
        meta: {
          total: 1,
          page: 1,
          totalPages: 1,
        },
      });
      expect(mockReviewRepository.findByBookId).toHaveBeenCalledWith(
        mockReview.bookId,
        0,
        10,
      );
      expect(mockReviewTransformer.transformMany).toHaveBeenCalledWith(mockPaginatedResponse.reviews);
    });
  });

  describe('update', () => {
    it('should update a review', async () => {
      const updateReviewDto: UpdateReviewDto = {
        avaliation: '4',
      };

      const updatedMockReview = {
        ...mockReview,
        avaliation: updateReviewDto.avaliation,
      };

      const updatedTransformedReview = {
        ...mockTransformedReview,
        avaliation: updateReviewDto.avaliation,
      };

      mockReviewRepository.update.mockResolvedValue(updatedMockReview);
      mockReviewTransformer.transform.mockResolvedValue(updatedTransformedReview);

      const result = await service.update('1', updateReviewDto);

      expect(result).toEqual({
        data: updatedTransformedReview,
        message: 'Review atualizada com sucesso',
      });
      expect(mockReviewRepository.update).toHaveBeenCalledWith('1', updateReviewDto);
      expect(mockReviewTransformer.transform).toHaveBeenCalledWith(updatedMockReview);
    });

    it('should throw HttpException if review is not found for update', async () => {
      const updateReviewDto: UpdateReviewDto = {
        avaliation: '4',
      };

      mockReviewRepository.update.mockResolvedValue(null);

      try {
        await service.update('1', updateReviewDto);
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getResponse()).toEqual({ message: 'Review não encontrada para atualização' });
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('remove', () => {
    it('should remove a review', async () => {
      mockReviewRepository.remove.mockResolvedValue(mockReview);
      mockReviewTransformer.transform.mockResolvedValue(mockTransformedReview);

      const result = await service.remove('1');

      expect(result).toEqual({
        data: mockTransformedReview,
        message: 'Review removida com sucesso',
      });
      expect(mockReviewRepository.remove).toHaveBeenCalledWith('1');
      expect(mockReviewTransformer.transform).toHaveBeenCalledWith(mockReview);
    });

    it('should throw HttpException if review is not found for deletion', async () => {
      mockReviewRepository.remove.mockResolvedValue(null);

      try {
        await service.remove('1');
        fail('Expected an error to be thrown');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.getResponse()).toEqual({ message: 'Review não encontrada para exclusão' });
        expect(error.getStatus()).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });
}); 