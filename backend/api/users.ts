import {AUTH} from "./FloraFirebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {User} from "../entities/user.model";


export class Users {
  constructor() {
  }

  async createUser(email: string, password: string): Promise<User> {
    const user = await createUserWithEmailAndPassword(AUTH, email, password);
    console.log('user', user);
    return null;
  }
}