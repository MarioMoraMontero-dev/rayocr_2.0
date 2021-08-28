import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  subscription: Subscription;
  public loginSesion = false;
  constructor(private router: Router,private authenticationService: AuthenticationService) { 
    this.subscription = this.authenticationService.onMessage().subscribe(message => {
      if (message.estado == 'login') {
        console.log(message);
        this.loginSesion  = false;
            } else if(message.estado == 'logout'){
                // clear messages when empty message received
        console.log(message)
        this.loginSesion  = true;
            }
  });
  }
  
  ngOnInit(): void {
    const cliente = localStorage.getItem("LoginContactId");
		if(cliente!=null)
		{
			this.loginSesion = false
		}else{
      this.loginSesion = true
    }
  }
  
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
}

  logout()
	{
		this.loginSesion = true
		localStorage.clear();
		this.router.navigate(['step1']);
	}
}
