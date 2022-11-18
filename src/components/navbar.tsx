import {Link} from 'react-router-dom'
import {auth} from "../config/firebase"
import {useAuthState} from "react-firebase-hooks/auth"
import {signOut} from 'firebase/auth'

export const Navbar = () => {
    const [user] = useAuthState(auth); 
    const logOut = async() => {
        await signOut(auth);
    }
    return <div className='text-xl flex bg-green-100 p-2'>
        <Link className='mr-2 shadow' to='/'>Home</Link>
        {!user ?<Link to='/login' className='shadow mr-2'>Login</Link> :
        <Link to='/create-post' className='shadow mr-2'>Post</Link>}

        
            {user &&(
            <div className='flex justify-end bg-indigo-200 px-2 rounded-xl'>
            <p className='mr-2'>{user?.displayName}</p>
            <img className='mr-2' src={user?.photoURL || ""} alt = "" width = '20' height = "20"/>
            <button onClick={logOut} >Log out</button>
            </div>)}
        
    </div>;
}