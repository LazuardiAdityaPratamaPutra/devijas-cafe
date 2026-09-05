interface IReviewsItem {
  id: string;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface IMenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  is_available: boolean;
  created_at: string;
}

interface IMenuReviews {
  items: IReviewsItem[];
  total: number;
  averageRating: number;
}

interface IMenuDetailResponse {
  menuItem: IMenuItem;
  reviews: IMenuReviews;
}

export type { IReviewsItem, IMenuItem, IMenuReviews, IMenuDetailResponse };