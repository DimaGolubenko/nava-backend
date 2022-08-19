// Entities
import { Product } from 'products/entities/product.entity';

// DTOs
import { PaginationOutput } from 'common/dto/pagination.dto';

export interface ProductsOutput extends PaginationOutput {
  results: Product[] | null;
}
