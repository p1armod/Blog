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
                // No active session
                return false;
            }
            return true;
        } catch (error) {
            // Session check failed
            return false;
        }
    }

    async createPost({title, slug, content, 'featured-image': featuredImage, status, 'user-id': userId}){
        try {
            
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
                ID.unique(),
                documentData
            )
        } catch (error) {
            console.error("Error creating post:", error);
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
                // Fallback to query lookup
                return false;
            }
        } catch (error) {
            console.error("Error getting post by ID:", error);
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
            // Object.keys(updateData).forEach(key => {
            //     if (updateData[key] === undefined) {
            //         delete updateData[key];
            //     }
            // });
            
            return await this.databases.updateDocument(
                conf.database_id,
                conf.collection_id,
                slug,
                updateData
            )
        } catch (error) {
            console.error("Error updating post:", error);
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
            console.error("Error deleting post:", error);
            return false
        }
    }

    async getPost(slug){
        // Check if user is authenticated
        const hasSession = await this.ensureSession();
        if (!hasSession) {
            // Authentication required
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
        try {
            // Ensure queries is an array
            const queryArray = Array.isArray(queries) ? [...queries] : [];
            
            // Always include status filter as the first query
            const finalQueries = [Query.equal("status", "active")];
            
            // Add all other queries, skipping any duplicate status filters
            queryArray.forEach(q => {
                try {
                    // Skip if it's a status filter (we already added it)
                    if (typeof q === 'string') {
                        const parsed = JSON.parse(q);
                        if (parsed.attribute === 'status') return;
                    } else if (q?.attribute === 'status' || (q?.method === 'equal' && q?.attribute === 'status')) {
                        return;
                    }
                    finalQueries.push(q);
                } catch (e) {
                    // Silently handle invalid query format
                }
            });
            
            return await this.databases.listDocuments(
                conf.database_id,
                conf.collection_id,
                finalQueries
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
            console.error("Error uploading file:", error);
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
            console.error("Error deleting file:", error);
            return false
        }
    }

    getFilePreview(fileId) {
        try {
            if (!fileId) {
                // No file ID provided
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