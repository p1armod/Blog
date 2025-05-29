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
            const user = await this.account.create(ID.unique(), email, password, name);
            if(user){
                //login
                return await this.login({email, password});
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            if(session){
                return session;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error");
        }

        return null;
    }

    async logout(){
        try {
            // Delete the current session
            await this.account.deleteSession('current');
            // Clear any remaining session data
            localStorage.clear();
            sessionStorage.clear();
            // Clear cookies by setting their expiry to the past
            document.cookie.split(";").forEach((c) => {
                document.cookie = c
                    .replace(/^ +/, "")
                    .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
            });
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
