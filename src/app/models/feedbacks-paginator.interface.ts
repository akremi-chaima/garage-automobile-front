import { FeedbackInterface } from './feedback.interface';

export interface FeedbacksPaginatorInterface {
  data: Array<FeedbackInterface>;
  currentPage: number;
  totalItems: number;
}
