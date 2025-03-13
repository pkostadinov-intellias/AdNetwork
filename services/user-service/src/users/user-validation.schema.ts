import { UserRole } from '../entities/User'

export const createUserSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 6,
      maxLength: 20,
    },
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 20,
    },
    role: {
      type: 'string',
      enum: Object.values(UserRole),
    },
    avatarUrl: {
      type: 'string',
      format: 'uri',
      nullable: true,
    },
    coverImageUrl: {
      type: 'string',
      format: 'uri',
      nullable: true,
    },
  },
  required: ['username', 'email', 'password', 'role'],
  additionalProperties: false,
  errorMessage: {
    properties: {
      username: 'Username must be between 6 and 20 characters.',
      email: 'Email must be a valid format (e.g., user@example.com).',
      password: 'Password must be between 6 and 20 characters.',
      role: `Role must be one of: ${Object.values(UserRole).join(', ')}.`,
      avatarUrl: 'Avatar URL must be a valid URI.',
      coverImageUrl: 'Cover image URL must be a valid URI.',
    },
    required: {
      username: 'Username is required.',
      email: 'Email is required.',
      password: 'Password is required.',
      role: 'Role is required.',
    },
  },
}

export const updateUserSchema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 6, maxLength: 20 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', minLength: 6, maxLength: 20 },
    role: { type: 'string', enum: Object.values(UserRole) },
    avatarUrl: { type: 'string', format: 'uri', nullable: true },
    coverImageUrl: { type: 'string', format: 'uri', nullable: true },
  },
  additionalProperties: false,
  errorMessage: {
    properties: {
      username: 'Username must be between 6 and 20 characters.',
      email: 'Email must be a valid format (e.g., user@example.com).',
      password: 'Password must be between 6 and 20 characters.',
      role: `Role must be one of: ${Object.values(UserRole).join(', ')}.`,
      avatarUrl: 'Avatar URL must be a valid URI.',
      coverImageUrl: 'Cover image URL must be a valid URI.',
    },
  },
}
