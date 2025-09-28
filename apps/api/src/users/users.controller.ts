import { Controller, Get, Post, Body, Param, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import type { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { createApiResponse, type ApiResponse } from '@test-project/shared-lib';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): ApiResponse<any[]> {
    const users = this.usersService.findAll();
    return createApiResponse(true, users);
  }

  @Get(':id')
  findOne(@Param('id') id: string): ApiResponse<any> {
    const user = this.usersService.findOne(+id);
    if (!user) {
      return createApiResponse(false, undefined, 'User not found');
    }
    return createApiResponse(true, user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto): ApiResponse<any> {
    const user = this.usersService.create(createUserDto);
    return createApiResponse(true, user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): ApiResponse<any> {
    const user = this.usersService.update(+id, updateUserDto);
    if (!user) {
      return createApiResponse(false, undefined, 'User not found');
    }
    return createApiResponse(true, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): ApiResponse<null> {
    const deleted = this.usersService.remove(+id);
    if (!deleted) {
      return createApiResponse(false, null, 'User not found');
    }
    return createApiResponse(true, null);
  }
}
