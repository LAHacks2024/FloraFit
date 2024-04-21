import {STORAGE} from "../environments.ts";
import {FirebaseStorage, getDownloadURL, ref} from "firebase/storage";

export class Images {
  readonly storage: FirebaseStorage;

  constructor() {
    this.storage = STORAGE;
  }

  async getImage(imageName: string): Promise<string> {
    let reference;
    if (imageName == 'Yarrow') {
      reference = ref(this.storage, 'gs://flora-fit.appspot.com/common-yarrow.png');

    } else if (imageName == 'Blue Flax') {
      reference = ref(this.storage, 'gs://flora-fit.appspot.com/blue-flax.png');

    } else if (imageName == 'California Poppy') {
      reference = ref(this.storage, 'gs://flora-fit.appspot.com/california-poppy.png');

    } else if (imageName == 'Lupine') {
      reference = ref(this.storage, 'gs://flora-fit.appspot.com/lupine.png');

    }
    else if (imageName == 'San Diego Birdsfoot') {
      reference = ref(this.storage, 'gs://flora-fit.appspot.com/birds-foot.png');

    } else {
      reference = ref(this.storage, imageName);

    }
    return await getDownloadURL(reference);
  }
}