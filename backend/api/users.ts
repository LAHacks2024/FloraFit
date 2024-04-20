import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {User, UserDTO} from "../entities/user.model";
import {AUTH} from "../environments";
import {FloraFirebase} from "./FloraFirebase";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;


export class Users extends FloraFirebase<User, UserDTO>{
  constructor() {
    super('users');
  }

  async createUser(email: string, password: string, name: string): Promise<User> {
    // Create the user first
    let returnedUser: User = null;
    let newUserPayload: UserDTO = {
      name,
      email: '',
      picture: '',
    };
    let newUserId: string;

    await createUserWithEmailAndPassword(AUTH, email, password).then((newUser) => {
      newUserId = newUser.user.uid;
      newUserPayload.email = newUser.user.email;
    }).catch((err) => {
      console.log(err);
      throw new Error(err.toString());
    })

    try {
      // Given the ID that was returned, use that as the document ID
      returnedUser = await super.create(newUserPayload, { overrideId: newUserId });
    } catch (err) {
      throw new Error('Error creating account!');
    }

    return returnedUser;
  }

  async loginUser(email: string, password: string) {
   await signInWithEmailAndPassword(AUTH, email, password)
  }
}