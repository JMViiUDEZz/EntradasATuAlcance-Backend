import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto ) {
    return this.salesService.findAll( paginationDto );
  }

  @Get(':saleid')
  findOne(@Param('saleid') saleid: string) {
    return this.salesService.findOnePlain(saleid);
  }

  @Patch(':saleid')
  update(@Param('saleid', ParseUUIDPipe ) saleid: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(saleid, updateSaleDto);
  }

  @Delete(':saleid')
  remove(@Param('saleid', ParseUUIDPipe ) saleid: string) {
    return this.salesService.remove(saleid);
  }
}
