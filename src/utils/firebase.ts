import {
  collection,
  getDocs,
  getFirestore,
  query,
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

export const getUserById = async (userId: string) => {
  try {
    const db = getFirestore();
    const usersRef = collection(db, 'Users');
    const q = query(usersRef, where('userId', '==', userId));

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

export const getUserByIds = async (id: string) => {
  try {
    const db = getFirestore();
    const usersRef = collection(db, 'Clients');
    const q = query(usersRef, where('id', '==', id));

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
