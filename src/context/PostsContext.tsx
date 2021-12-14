import React from 'react';
import { IPost } from '../interfaces/IPost';  
import { IUsers } from '../interfaces/IUsers';

const PostsContext = React.createContext({

    posts: [] as Array<IPost>,
    users: [] as Array<IUsers>,
    comments: []
});

export default PostsContext;