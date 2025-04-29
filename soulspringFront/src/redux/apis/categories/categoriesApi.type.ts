import { Category } from 'types/models/Category';

export interface CategoryApi {
  id: number;
  category: Category;
}

export interface CategoriesApiResponse {
  status: number;
  data: CategoryApi[];
  message: string;
}
