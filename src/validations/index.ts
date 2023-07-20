/* eslint-disable import/no-extraneous-dependencies */
import { z } from 'zod';

const User = z.object({
  username: z.string(),
});

User.parse({ username: 'Ludwig' });
