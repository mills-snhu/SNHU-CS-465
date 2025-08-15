import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripData } from './trip-data';


@Injectable({
  providedIn: 'root'
})
export class Authentication {
  //Setup Storage and service access
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripData: TripData
  ){}
  
  //Variable to handle Authentication Response
  authResp: AuthResponse = new AuthResponse();


  //Get token from Stroage provider 
  //Name for the key for the token is 'travlr-token'
  public getToken(): string {
    let out: any;
    out = this.storage.getItem('travlr-token');

  //Make sure we return a string even if we don't have a token
  if(!out){
    return '';
    }
    return out;
  }

  //Save token to Storage provider
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  //Loout of application and remove the JWT from Storage
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  //Boolean to determine if logged in and the token is still valid
  //Even if we have a token we will still have to reauthenticate
  //if the token has expired
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }else {
      return false;
    }
  }

  //Retrieve the current user. This function should only be called  after the 
  //calling method has checked to make sure that the user isLoggedIn.
  public getCurrentUser(): User{
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }
  
  //login method that leverages the login method in TripData becasue that method 
  //returns an observable, we subscribe to the result and only process
  //when the Observable condition is satisfied
  public login(user: User, passwd: string) : void {
    this.tripData.login(user, passwd)
      .subscribe({
        next: (value: any) => {
          if(value){
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
            }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }

  //Register method that leverages the register method in tripData
  //Note: this method is nearly identical to the login method because the behavior of the API
  //logs a new user in immediately upon registration
  public register(user: User, passwd:string) :void {
    this.tripData.register(user, passwd)
      .subscribe({
        next: (value: any) => {
          if (value) {
            console.log(value);
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
        
      })
  }

}