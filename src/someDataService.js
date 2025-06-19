import { databases } from "./appwriteConfig";
import conf from "./conf/conf.js";

const DATABASE_ID = conf.appwriteDatabaseId;
const COLLECTION_ID = conf.appwriteCertificateCollectionId;

export const getDocuments = async () => {
  return await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
};

export const createDocument = async (data) => {
  return await databases.createDocument(DATABASE_ID, COLLECTION_ID, 'unique()', data);
};

export const getFilePreview = (fileId) => {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }