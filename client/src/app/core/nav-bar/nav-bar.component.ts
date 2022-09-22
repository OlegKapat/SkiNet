import { Component,  OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/share/models/basket';
import { IUser } from 'src/app/share/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit{
  
  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>;
  constructor(private basketService: BasketService) { }



  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  logout() {
    // this.accountService.logout();
  }
}
