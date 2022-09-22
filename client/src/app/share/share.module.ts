import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { OrderTotalComponent } from './components/order-total/order-total.component';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { BasketComponent } from '../basket/basket.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PagingHeaderComponent, PagerComponent, OrderTotalComponent, BasketSummaryComponent, BasketComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagerComponent,
    OrderTotalComponent,
    BasketComponent,
    CarouselModule,
    FormsModule,
    RouterModule
  ],
})
export class ShareModule {}
