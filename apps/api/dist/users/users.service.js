var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { Logger, formatUserName, isValidEmail } from '@test-project/shared-lib';
let UsersService = class UsersService {
    logger = new Logger('UsersService');
    users = [];
    nextId = 1;
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
    findAll() {
        this.logger.info(`Fetching all users. Count: ${this.users.length}`);
        return this.users;
    }
    findOne(id) {
        this.logger.info(`Fetching user with id: ${id}`);
        return this.users.find(user => user.id === id);
    }
    create(createUserDto) {
        this.logger.info('Creating new user', createUserDto);
        if (!isValidEmail(createUserDto.email)) {
            throw new Error('Invalid email format');
        }
        // Check if email already exists
        const existingUser = this.users.find(user => user.email === createUserDto.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const newUser = {
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
    update(id, updateUserDto) {
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
        const updatedUser = {
            ...existingUser,
            ...updateUserDto,
            fullName: formatUserName(updateUserDto.firstName || existingUser.firstName, updateUserDto.lastName || existingUser.lastName),
            updatedAt: new Date(),
        };
        this.users[userIndex] = updatedUser;
        this.logger.info(`Updated user with id: ${id}`);
        return updatedUser;
    }
    remove(id) {
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
};
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map