import { Module } from '@nestjs/common';
import { IngredientsController } from './IngredientsController';

@Module({
  controllers: [IngredientsController],
  providers: []
})
export class IngredientsModule {}
