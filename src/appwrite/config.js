import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

export class Service {
    client = new Client();
    account;
    databases;
    bucket;
    
    constructor() {
        this.client
            .setEndpoint(conf.appwrite)
            .setProject(conf.project_id);
            
        // Configure account with cookie settings
        this.account = new Account(this.client, {
            cookiePolicy: 'single-origin',
            secure: true,
            sameSite: 'Lax'
        });
        
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // Helper method to check if we have a valid session
    async ensureSession() {
        try {
            // Try to get the current session
            const session = await this.account.getSession('current');
            if (!session) {
                console.log('No active session found');
                return false;
            }
            return true;
        } catch (error) {
            console.log('Session check failed, user is not authenticated');
            return false;
        }
    }

    async createPost({title, slug, content, 'featured-image': featuredImage, status, 'user-id': userId}){
        try {
            // Generate a simple, valid document ID
            const timestamp = Date.now().toString(36);
            const random = Math.random().toString(36).substring(2, 8);
            const documentId = `post_${timestamp}${random}`;
            
            // Ensure the slug is URL-safe and not too long
            const safeSlug = (slug || title || 'untitled')
                .toString()
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '')
                .substring(0, 100);
            
            // Prepare the document data
            const documentData = {
                title: title || 'Untitled Post',
                content: content || '',
                status: status || 'active',
                'user-id': userId,
                slug: safeSlug,
                'featured-image': featuredImage || null // Match the exact field name in your collection
            };
            
            // Remove undefined values
            // Object.keys(documentData).forEach(key => {
            //     if (documentData[key] === undefined) {
            //         delete documentData[key];
            //     }
            // });
                
            // Create the document
            return await this.databases.createDocument(
                conf.database_id,
                conf.collection_id,
                documentId,
                documentData
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error; // Re-throw to handle in the component
        }
    }

    async getPostById(slug) {
        try {
            // First try to get by slug
            const posts = await this.databases.listDocuments(
                conf.database_id,
                conf.collection_id,
                [Query.equal('slug', slug)]
            );
            
            if (posts.documents.length > 0) {
                return posts.documents[0];
            }
            
            // If not found by slug, try to get by ID directly
            try {
                return await this.databases.getDocument(
                    conf.database_id,
                    conf.collection_id,
                    slug
                );
            } catch (err) {
                console.log("Appwrite service :: getPostById :: error with direct ID lookup", err);
                return false;
            }
        } catch (error) {
            console.log("Appwrite service :: getPostById :: error", error);
            return false;
        }
    }

    async updatePost(slug, data){
        try {
            // Prepare the update data
            const updateData = { ...data };
            
            // Ensure featured-image is included if it exists in the data
            if ('featured-image' in data) {
                updateData['featured-image'] = data['featured-image'];
            }
            
            // Remove undefined values
            Object.keys(updateData).forEach(key => {
                if (updateData[key] === undefined) {
                    delete updateData[key];
                }
            });
            
            return await this.databases.updateDocument(
                conf.database_id,
                conf.collection_id,
                slug,
                updateData
            )
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            throw error; // Re-throw to handle in the component
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.database_id,
                conf.collection_id,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        // Check if user is authenticated
        const hasSession = await this.ensureSession();
        if (!hasSession) {
            console.log("Appwrite service :: getPost :: authentication required");
            return false;
        }

        try {
            return await this.databases.getDocument(
                conf.database_id,
                conf.collection_id,
                slug
            );
        } catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = []) {
        // Check if user is authenticated
        const hasSession = await this.ensureSession();
        if (!hasSession) {
            console.log("Appwrite service :: getPosts :: authentication required");
            return { documents: [] };
        }

        try {
            const defaultQueries = queries.length > 0 ? queries : [
                Query.equal("status", "active"),
                Query.orderDesc('$createdAt')
            ];
            
            return await this.databases.listDocuments(
                conf.database_id,
                conf.collection_id,
                defaultQueries
            );
        } catch (error) {
            console.error("Appwrite service :: getPosts :: error", error);
            return { documents: [] };
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.bucket_id,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.bucket_id,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        try {
            if (!fileId) {
                console.log("No file ID provided");
                return null;
            }
            
            // Use the SDK's getFileView method
            return this.bucket.getFileView(
                conf.bucket_id,
                fileId
            );
        } catch (error) {
            console.error("Appwrite service :: getFilePreview :: error", error);
            return null;
        }
    }
}


const service = new Service()
export default service