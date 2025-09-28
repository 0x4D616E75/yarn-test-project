import { Injectable } from '@nestjs/common';
import { Logger, formatUserName, isValidEmail } from '@test-project/shared-lib';
import type { CreateUserDto, UpdateUserDto } from './dto/user.dto';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger('UsersService');
  private users: User[] = [];
  private nextId = 1;

  constructor() {
    // Initialize with some sample data
    this.users = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        fullName: formatUserName('John', 'Doe'),
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        fullName: formatUserName('Jane', 'Smith'),
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
      },
    ];
    this.nextId = 3;
  }

  findAll(): User[] {
    this.logger.info(`Fetching all users. Count: ${this.users.length}`);
    return this.users;
  }

  findOne(id: number): User | undefined {
    this.logger.info(`Fetching user with id: ${id}`);
    return this.users.find(user => user.id === id);
  }

  create(createUserDto: CreateUserDto): User {
    this.logger.info('Creating new user', createUserDto);

    if (!isValidEmail(createUserDto.email)) {
      throw new Error('Invalid email format');
    }

    // Check if email already exists
    const existingUser = this.users.find(user => user.email === createUserDto.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const newUser: User = {
      id: this.nextId++,
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      email: createUserDto.email,
      fullName: formatUserName(createUserDto.firstName, createUserDto.lastName),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    this.logger.info(`Created user with id: ${newUser.id}`);

    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto): User | undefined {
    this.logger.info(`Updating user with id: ${id}`, updateUserDto);

    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      this.logger.warn(`User with id ${id} not found for update`);
      return undefined;
    }

    if (updateUserDto.email && !isValidEmail(updateUserDto.email)) {
      throw new Error('Invalid email format');
    }

    // Check if email already exists (excluding current user)
    if (updateUserDto.email) {
      const existingUser = this.users.find(user => user.email === updateUserDto.email && user.id !== id);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
    }

    const existingUser = this.users[userIndex];
    const updatedUser: User = {
      ...existingUser,
      ...updateUserDto,
      fullName: formatUserName(
        updateUserDto.firstName || existingUser.firstName,
        updateUserDto.lastName || existingUser.lastName
      ),
      updatedAt: new Date(),
    };

    this.users[userIndex] = updatedUser;
    this.logger.info(`Updated user with id: ${id}`);

    return updatedUser;
  }

  remove(id: number): boolean {
    this.logger.info(`Removing user with id: ${id}`);

    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      this.logger.warn(`User with id ${id} not found for deletion`);
      return false;
    }

    this.users.splice(userIndex, 1);
    this.logger.info(`Removed user with id: ${id}`);

    return true;
  }
}
