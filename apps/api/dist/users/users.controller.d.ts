import { UsersService } from './users.service.js';
import type { CreateUserDto, UpdateUserDto } from './dto/user.dto.js';
import { type ApiResponse } from '@test-project/shared-lib';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): ApiResponse<any[]>;
    findOne(id: string): ApiResponse<any>;
    create(createUserDto: CreateUserDto): ApiResponse<any>;
    update(id: string, updateUserDto: UpdateUserDto): ApiResponse<any>;
    remove(id: string): ApiResponse<null>;
}
//# sourceMappingURL=users.controller.d.ts.map