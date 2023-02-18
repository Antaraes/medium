import { Settings } from "http2";

export interface Post {
    _id:string;
    _createdAt:string;
    title:string;
    author:{
        name:string;
        image:Setting;
    },
    description:string;
    catgories:{
        title:string;
        body:string;
    }
    mainImage:{
        asset:{
            url:string;
        }
    }
    slug:{
        current:string
    }
    body:[object]
}