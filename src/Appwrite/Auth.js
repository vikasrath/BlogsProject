import Conf from "../conf/Conf.js";
import { Client, Account, ID } from "appwrite";

export class Authservice {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(Conf.APPWRITE_URL)
            .setProject(Conf.APPWRITE_PROJECT_ID);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                console.log("Account ban gaya");
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Account create error ==>", error);
            return null;
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            if (session) {
                console.log("User login successful");
                return session;
            }
        } catch (error) {
            console.log("User login error ==>", error);
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
            console.log("User logout successful");
        } catch (error) {
            console.log("User logout error ==>", error);
        }
    }

    async getcurrentUser() {
        try {
             const user = await this.account.get();
            //  console.log("Current user:", user);
             return user;


        } catch (error) {
            console.log("Get current user error ==>", error);
        }
        
    }
}

const authservice = new Authservice();

// console.log("this is my authservice-->",authservice);

export default authservice;


