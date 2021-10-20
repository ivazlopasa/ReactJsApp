import React from 'react';
import { IPost } from '../interfaces/IPost';  

const PostsContext = React.createContext({

    posts: [] as Array<IPost>
});

export default PostsContext;