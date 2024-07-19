import Conf from "../conf/Conf.js"
import { Client, ID,Databases,Storage,Query } from "appwrite";

export class Dataservice{
    client = new Client();
    database;
    bucket;

    constructor(){
        this.client
        .setEndpoint(Conf.APPWRITE_URL)
        .setProject(Conf.APPWRITE_PROJECT_ID);
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost ({Title,slug,Content,Images,Status,Userid}){
        try {
            return await this.database.createDocument(
                Conf.APPWRITE_DATABASE_ID,
                Conf.APPWRITE_COLLECTION_ID,
                slug,
                {
                    Title,
                    Content,
                    Images,
                    Status,
                    Userid
                }
             )
            
        }
         catch (error) {
            console.log(error);
            return false
        }
    }

    async Deletepost(slug){
        try {

              await this.database.deleteDocument(
                Conf.APPWRITE_DATABASE_ID,
                Conf.APPWRITE_COLLECTION_ID,
                slug,
            )
            return true
            
        } catch (error) {
            console.log(error);
            // throw error;
            return false
        }
    }

    async updatePost (slug,{Title,Content,Images,Status}){
        try {
            return  await this.database.updateDocument(
                Conf.APPWRITE_DATABASE_ID,
                Conf.APPWRITE_COLLECTION_ID,
                slug,
                {
                    Title,
                    Content,
                    Images,
                    Status,
                }
            )
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async getPost(slug){
        try {

              return await this.database.getDocument(
                Conf.APPWRITE_DATABASE_ID,
                Conf.APPWRITE_COLLECTION_ID,
                slug,
            )
           
            
        } catch (error) {
            // throw error;
            console.log(error);
            return false
        }
    }

    async getPostList(queries = [Query.equal("Status", "active")]){
        try {

            return  await this.database.listDocuments(
                Conf.APPWRITE_DATABASE_ID,
                Conf.APPWRITE_COLLECTION_ID,
                queries,
            )
            
            
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async uploadFile(file){
        try {
             return  await this.bucket.createFile(
                Conf.APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            )
           
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
              await this.bucket.deleteFile(
                Conf.APPWRITE_BUCKET_ID,
                fileId
            )
            return true
        } catch (error) {
            // throw error
            console.log(error);
            return false
        }
    }

     getFilePrview(fileId){
        return this.bucket.getFilePreview(Conf.APPWRITE_BUCKET_ID, fileId )
    }

    }

    const detabaseservice = new Dataservice()

    export default detabaseservice;