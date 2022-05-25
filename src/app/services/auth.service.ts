import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public angularFireAuth: AngularFireAuth) {}

  // Sign up with email/password
  signUp(email: string, password: string) {
    console.log('email', email);
    console.log('password', password);
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.sendVerificationMail(); // Sending email verification notification, when new user registers
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verification when new user sign up
  sendVerificationMail() {
    return this.angularFireAuth.currentUser
      .then((user) => {
        return user?.sendEmailVerification();
      })
      .then(() => {
        console.log(' route to verify email address');
        // this.router.navigate(['verify-email-address']);
      });
  }
}
