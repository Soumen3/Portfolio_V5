const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCertificateCollectionId: String(import.meta.env.VITE_APPWRITE_CERTIFICATE_COLLECTION_ID),
    appwriteProjectCollectionId: String(import.meta.env.VITE_APPWRITE_PROJECT_COLLECTION_ID),
    appwriteCommentCollectionId: String(import.meta.env.VITE_APPWRITE_COMMENT_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
};

export default conf;
