const conf = {
    appwrite: String(import.meta.env.VITE_APPWRITE_URL),
    project_id: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    database_id: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collection_id: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_ARTICLES),
    bucket_id: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}

export default conf;
