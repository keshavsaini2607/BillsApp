import {
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from '@react-native-firebase/firestore';

export const getAllDocs = async (collectionName: string) => {
  try {
    const db = getFirestore();
    const res = await db.collection(collectionName).get();
    const docsArray = res.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return docsArray;
  } catch (err) {
    console.log('error getting docs', err);
    return [];
  }
};

export const saveForm = async (collectionName: string, formValues: any) => {
  try {
    const db = getFirestore();
    const res = await db.collection(collectionName).add({...formValues});
    if (res) {
      return true;
    }
  } catch (error) {
    console.log('error getting docs', error);
    return null;
  }
};

export const updateForm = async (
  collectionName: string,
  formValues: any,
  id: string,
  key: string,
) => {
  const db = getFirestore();
  try {
    // Create a query against the collection.
    const q = query(collection(db, collectionName), where(key, '==', id));

    // Get the documents from the query.
    const querySnapshot = await getDocs(q);

    // Check if the document exists
    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return;
    }

    // Assuming billId is unique and only one document will match
    const docRef = querySnapshot.docs[0].ref;

    // Update the document with the new form values
    await updateDoc(docRef, formValues);

    console.log('Document updated successfully');
  } catch (error) {
    console.error('Error updating document:', error);
  }
};

export const getUserDocs = async (collectionName: string, userId: string) => {
  try {
    const db = getFirestore();
    const q = query(
      collection(db, collectionName),
      where('userId', '==', userId),
    );
    const querySnapshot = await getDocs(q);

    // Extract and return document data as an array
    const docsArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return docsArray;
  } catch (error) {
    console.log('error getting docs', error);
    return [];
  }
};

export const getUserDocsById = async (collectionName: string, id: string) => {
  try {
    const db = getFirestore();
    const q = query(collection(db, collectionName), where('id', '==', id));
    const querySnapshot = await getDocs(q);
    // Extract and return document data as an array, filtered by docId
    const docsArray = querySnapshot.docs
      .filter(doc => doc.id === id)
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

    return docsArray;
  } catch (error) {
    console.error('Error getting docs:', error);
    return [];
  }
};

export const getUser = async (id: string, key: string) => {
  try {
    const db = getFirestore();
    const usersRef = collection(db, 'Clients');
    const q = query(usersRef, where(key, '==', id));

    const querySnapshot = await getDocs(q);
    console.log({querySnapshot});

    if (querySnapshot.empty) {
      console.log('No matching documents.');
      return null; // Return null if no documents are found
    }

    const userData: any[] = [];

    querySnapshot.forEach(doc => {
      userData.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return userData;
  } catch (error) {
    console.error('Error getting user:', error);
    return null; // Handle error appropriately
  }
};
