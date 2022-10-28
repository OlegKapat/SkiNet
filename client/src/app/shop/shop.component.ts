import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IBrand } from '../share/models/brand';
import { IPagination } from '../share/models/pagination';
import { IProduct } from '../share/models/product';
import { IType } from '../share/models/productType';
import { ShopParams } from '../share/models/shopParams';

import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
  @ViewChild('search', {static: false}) searchTerm: ElementRef;
  products: IProduct[] = [];
  brands: IBrand[];
  types: IType[];
  totalCount: number;
  public shopParams:ShopParams;

  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'},
  ]
  constructor(private shopService: ShopService) {this.shopParams = this.shopService.getShopParams();}

  ngOnInit(): void {
    this.getProducts(true);
    this.getBrands();
    this.getTypes();
   
  }
  getProducts(useCache = false): void {
    this.shopService
      .getProducts(useCache)
      .subscribe((data: IPagination): void => {
        this.products = data['data'];
      });
  }
  getBrands(): void {
    this.shopService.getBrands().subscribe((data: IBrand[]): void => {
      this.brands = data;
    });
  }
  getTypes(): void {
    this.shopService.getTypes().subscribe((data: IType[]): void => {
      this.types = data;
    });

  }
  onSortSelected(sort: string) {
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onBrandSelected(brandId: number) {
    const params = this.shopService.getShopParams();
    params.brandId = brandId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  onTypeSelected(typeId: number) {
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }

  onSearch() {
    const params = this.shopService.getShopParams();
    params.search = this.searchTerm.nativeElement.value;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.getProducts();
  }
  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }
  onPageChanged(event: any) {
    const params = this.shopService.getShopParams();
    if (params.pageNumber !== event) {
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.getProducts(true);
    }
  }
}
