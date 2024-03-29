import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.scss']
})
export class ServerErrorComponent implements OnInit {
  error: unknown;
  message: string;
  constructor(private router:Router) {
    const navigation = this.router.getCurrentNavigation();
    console.log(navigation);
    
    this.error = navigation?.extras?.state?.error;
    this.message = navigation?.extras?.state?.message;
  }
   

  ngOnInit(): void {
  }

}
