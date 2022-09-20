export class ShopParams {
    brandId: number;
    typeId: number;
    sort : string;
    pageNumber: number;
    pageSize:number;
    search: string;
    constructor(){
        this.brandId = 0;
        this.typeId = 0;
        this.sort = 'name';
        this.pageNumber = 1;
        this.pageSize = 6;
        this.search = '';
    }
}