import {STORAGE} from "../environments.ts";
import {FirebaseStorage, getDownloadURL, ref} from "firebase/storage";

export class Images {
  readonly storage: FirebaseStorage;

  constructor() {
    this.storage = STORAGE;
  }

  async getImage(imageName: string): Promise<string> {
    const reference = ref(this.storage, imageName);
    return await getDownloadURL(reference);
  }
}