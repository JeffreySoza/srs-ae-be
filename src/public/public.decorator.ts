import { SetMetadata } from '@nestjs/common';

// Define a custom metadata key
export const IS_PUBLIC_KEY = 'isPublic';
// Create the Public decorator
export const SkipAuthGuard = () => SetMetadata(IS_PUBLIC_KEY, true);
