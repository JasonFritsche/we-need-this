import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore
  ) {}

  // Sign up with email/password
  signUp(email: string, password: string, username: string) {
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // then add the user to the database
        const userDocRef = this.angularFirestore.collection('users');
        userDocRef
          .doc(result.user?.uid)
          .set({
            email: email,
            joinedDate: new Date(),
            userId: result.user?.uid,
            userName: username,
          })
          .catch((error) => {
            console.log(error);
            console.error('error occurred while adding user to db');
          });

        this.sendVerificationMail(); // Sending email verification notification, when new user registers
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Sign Out
  signOut() {
    return this.angularFireAuth
      .signOut()
      .then((result) => {
        console.log(result);
        return result;
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
