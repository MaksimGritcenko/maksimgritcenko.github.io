import { db } from 'Utils/Firebase';

// DB setters
export const addDocWithAutoId = async (
  collectionPath,
  data,
) => {
  try {
    const result = await db.collection(collectionPath).add(data).then((docRef) => docRef.id);
    return result;
  } catch (e) {
    alert(e);
  }
};

export const addOrUpdateDoc = async (docPath, data, merge = true) => {
  await db.doc(docPath).set(data, { merge });
};

// DB getters

export const getDocId = async (
  collectionName,
  fieldName,
  field,
) => {
  try {
    const id = await db
      .collection(collectionName)
      .where(fieldName, '==', field)
      .get();

    return id.docs[0]?.id;
  } catch (e) {
    alert(e);
  }
};

export const getDocByPath = async (path) => {
  try {
    const docData = await db
      .doc(path)
      .get()
      .then((snapshot) => snapshot.data());

    return docData;
  } catch (e) {
    alert(e);
  }
};

export const getCollectionDocs = async (path) => {
  try {
    const docs = await db
      .collection(path)
      .get()
      .then(
        (snapshot) => snapshot.docs.map(
          (doc) => ({
            data: doc.data(),
            id: doc.id,
          }),
        ),
      );

    return docs;
  } catch (e) {
    alert(e);
  }
};

export const getCollectionDocsByWhere = async (collectionName, fieldName, field) => {
  try {
    return await db
      .collection(collectionName)
      .where(fieldName, '==', field)
      .get()
      .then(
        (snapshot) => snapshot.docs.map(
          (doc) => ({
            data: doc.data(),
          }),
        ),
      );
  } catch (e) {
    alert(e);
  }
};