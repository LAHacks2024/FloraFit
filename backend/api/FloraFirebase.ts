import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  serverTimestamp,
  setDoc,
  query,
  where,
  QueryFieldFilterConstraint,
  getDocs,
  updateDoc
} from "firebase/firestore";
import {FIRESTORE} from "../environments";
import firebase from "firebase/compat";
import WhereFilterOp = firebase.firestore.WhereFilterOp;

export interface CreateOptions {
  overrideId?: string;
}

/**
 * Where F is the full definition of the entity
 * and P is the partial entity
 */
export class FloraFirebase<F, P> {
  protected readonly collection: string;

  constructor(collection: string) {
    this.collection = collection;
  }

  async create(data: P , extras?: CreateOptions): Promise<F> {
    const dbRef: CollectionReference<DocumentData> = collection(FIRESTORE, this.collection);
    let id = (extras && extras.overrideId) ?? '' ;

    let dataWithExtras = {
      id: '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    if (extras && extras.overrideId) {
      const docWithId = doc(FIRESTORE, this.collection, extras.overrideId);

      dataWithExtras.id = extras.overrideId;
      await setDoc(docWithId, {
        ...dataWithExtras,
        ...data,
      });
    } else {
      // Adds the document
      const tempId = await addDoc(dbRef, dataWithExtras);
      // Updates the document setting the ID same as Doc ID
      dataWithExtras = {...dataWithExtras, id: tempId.id};
      await updateDoc(tempId, dataWithExtras);
    }

    // Get the document
    const returnedDoc = await getDoc(doc(FIRESTORE, this.collection, id));

    if (!returnedDoc.exists())
      throw new Error('Document was not submitted correctly!');

    return returnedDoc.data() as F;
  }

  async get(id: string): Promise<F> {
    const docRef = doc(FIRESTORE, this.collection, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
     throw new Error('Document does not exist!');
    }

    return docSnap.data() as F;
  }

  async getWhere(queries: [string, WhereFilterOp, string][]): Promise<F[]> {
    let wheres: QueryFieldFilterConstraint[] = queries.map(q => {
      return where(q[0], q[1], q[2])
    });

    const q = query(collection(FIRESTORE, this.collection), ...wheres);

    const dataArr: F[] = [];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      dataArr.push(doc.data() as F)
    });

    return dataArr;
  }

  async update(id: string, newData: Partial<P>): Promise<F> {
    const docRef = doc(FIRESTORE, this.collection, id);

    // @ts-ignore
    await updateDoc(docRef, {...newData, updatedAt: serverTimestamp()});

    return await this.get(id);
  }
}
