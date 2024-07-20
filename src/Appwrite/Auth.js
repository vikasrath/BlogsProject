import Conf from "../conf/Conf.js";
import { Client, Account, ID } from "appwrite";
import toast from "react-hot-toast";

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
                toast.success("Account Created Successfuly")
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            toast.error(error.message)
            return null;
        }
    }

    async login({ email, password }) {
        try {
            const session = await this.account.createEmailPasswordSession(email, password);
            if (session) {
                toast.success("User Login Sucessfuly")
                return session;
            }
        } catch (error) {
            toast.error(error.message)
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
             toast.success("User logout successful")
        } catch (error) {
            toast.error(error.message)
        }
    }

    async getcurrentUser() {
        try {
             const user = await this.account.get();
             return user;
        } catch (error) {
           console.log(error);
        }
        
    }
}

const authservice = new Authservice();

// console.log("this is my authservice-->",authservice);

export default authservice;


