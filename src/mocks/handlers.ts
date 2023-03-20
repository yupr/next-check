import { auth } from '@/mocks/handlers/auth';
import { user } from '@/mocks/handlers/user';
import { label } from '@/mocks/handlers/label';

export const handlers = [
  ...auth,
  ...user,
  ...label
];
