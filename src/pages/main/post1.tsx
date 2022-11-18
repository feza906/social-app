import {Post} from './main'


interface Props{
    post: Post;
}

export const Post1 = (props: Props) => {
    const {post} = props;
    
    return <div className='flex flex-col px-40 pt-4 '>
        <div className='title text-2xl'>
            <h1>{post.title}</h1>
        </div>
        <div className='body text-xl text-gray-500'>
            <p>{post.description}</p>
        </div>
        
    </div>
}