import {useForm} from 'react-hook-form';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {addDoc,collection} from "firebase/firestore";
import {auth, db} from "../../config/firebase"
import { useAuthState } from 'react-firebase-hooks/auth';
import {useNavigate} from 'react-router-dom';

interface CreateFormData{
    title: string;
    description: string;
}

export const Createform = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const schema = yup.object().shape({
        title:yup.string().required("You must add a title"),
        description: yup.string().required("you must add description."),
    });
    const {register,handleSubmit,formState:{errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema),
    });

    const postsRef = collection(db,"posts");
    const onCreatePost = async (data:CreateFormData) => {
        await addDoc(postsRef,{
            title: data.title,
            description: data.description,
            username:user?.displayName,
            userId:user?.uid,
        })
        navigate('/');
    }

    return(
        <div>
            <form onSubmit = {handleSubmit(onCreatePost)} className="flex justify-center flex-col lg:px-64 mt-4">
                <input placeholder='title...' {...register("title")} className="border-2 border-black rounded-xl px-2 py-2" />
                <p className='text-red-500'>{errors.title?.message}</p>
                <textarea placeholder='description..' {...register('description')} className="border-2 border-black rounded-xl px-2 mt-2 py-2"/>
                <p className='text-red-500'>{errors.description?.message}</p>

                <input type="submit" className='bg-green-400 w-1/4 rounded-xl mt-2 py-1'/>
            </form>
        </div>
    );
}