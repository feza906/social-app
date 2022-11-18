import {getDocs,collection, doc} from "firebase/firestore"
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post1 } from "./post1";

export interface Post{
    id: string;
    userId:string;
    title: string;
    username: string;
    description: string;
}

export const Main = () => {
    const [postLists,setPostLists] = useState<Post[] | null>(null);
    const postRef = collection(db,'posts');

    const getPosts = async () => {
        const data = await getDocs(postRef);
        setPostLists(data.docs.map((doc) => ({...doc.data(),id:doc.id})) as Post[]);
    };

    useEffect(() => {
        getPosts();
    },[])
    return <div>
        <h1 className="flex justify-center text-2xl">Home page</h1>
        <div>
            {postLists?.map((post) => (
            <Post1 post = {post}/>
            ))}
            </div>
        </div>
}