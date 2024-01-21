import { FeedbackStatusInterface } from './feedback-status.interface';

export interface FeedbackInterface {
  id: number;
  stars: number;
  lastName: string;
  firstName: string;
  message: string;
  createdAt: string|number;
  status: FeedbackStatusInterface
}
