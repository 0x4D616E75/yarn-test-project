import type { CreateUserDto, UpdateUserDto } from './dto/user.dto.js';
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    fullName: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare class UsersService {
    private readonly logger;
    private users;
    private nextId;
    constructor();
    findAll(): User[];
    findOne(id: number): User | undefined;
    create(createUserDto: CreateUserDto): User;
    update(id: number, updateUserDto: UpdateUserDto): User | undefined;
    remove(id: number): boolean;
}
//# sourceMappingURL=users.service.d.ts.map