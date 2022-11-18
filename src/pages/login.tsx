
import {auth,provider} from "../config/firebase"
import {signInWithPopup} from 'firebase/auth';
import {useNavigate} from "react-router-dom";


export const Login = () => {
    const navigate = useNavigate();
    const signIn = async () => {
        const result = await signInWithPopup(auth,provider);
        console.log(result);
         navigate('/')
    }

    return (<div className="flex justify-center m-2">
    <h1 className="text-2xl mr-2">Sign in with Google</h1>
    <button onClick={signIn} className="rounded-xl px-1 shadow-xl bg-indigo-100">Sign In with Google</button>
    </div>);
}