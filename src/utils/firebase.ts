import {getFirestore} from '@react-native-firebase/firestore';

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
