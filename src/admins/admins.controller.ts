import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ChangePasswordAdminDto } from './dto/change-password-admin.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  findAll(
    @Body('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Body('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number = 20,
  ) {
    return this.adminsService.findAll({
      page,
      limit,
    });
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.adminsService.remove(id);
  }

  @Post('change-password')
  changePassword(@Body() changePasswordAdminDto: ChangePasswordAdminDto) {
    return this.adminsService.changePassword(changePasswordAdminDto);
  }
}
