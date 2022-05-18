import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public angularFireAuth: AngularFireAuth) {}

  // Sign up with email/password
  SignUp(email: string, password: string) {
    console.log("email", email)
    console.log("password", password)
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        this.SendVerificationMail(); // Sending email verification notification, when new user registers
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Send email verification when new user sign up
  SendVerificationMail() {
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
