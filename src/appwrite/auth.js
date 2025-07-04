import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService{
    client = new Client()
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwrite)
            .setProject(conf.project_id);
            
        // For local development with self-signed certificates, you might need to configure this
        // in your browser settings or use a proper SSL certificate
        
        this.account = new Account(this.client, {
            // Configure cookie settings
            cookiePolicy: 'single-origin',
            secure: true,
            sameSite: 'Lax'
        });
    }

    async createAccount({email, password, name}){
        try {
            // Create the account
            const user = await this.account.create(ID.unique(), email, password, name);
            
            if(user) {
                // Create a new session
                await this.account.createEmailPasswordSession(email, password);
                
                // Get the current user data with the new session
                const currentUser = await this.getCurrentUser();
                return currentUser;
            }
            return null;
        } catch (error) {
            console.error('Error in createAccount:', error);
            throw error;
        }
    }

    async login({email, password}){
        try {
            // Create a new session
            await this.account.createEmailPasswordSession(email, password);
            
            // Get the current user data with the new session
            const user = await this.getCurrentUser();
            if (!user) {
                throw new Error('Failed to fetch user data after login');
            }
            return user;
        } catch (error) {
            console.error('Error in login:', error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // Error getting current user
            console.error('Error getting current user:', error);
            throw error;
        }

        return null;
    }

    async logout(){
        try {
            // Delete all sessions for the current user
            await this.account.deleteSessions();
            return true;
        } catch (error) {
            throw error;
        }
    }

    async deleteAccount(){
        try {
            await this.account.delete();
        } catch (error) {
            throw error;
        }
    }
}



const authService = new AuthService();

export default authService;
