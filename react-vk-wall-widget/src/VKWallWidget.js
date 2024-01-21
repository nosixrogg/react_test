import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VKWallWidget = () => {
    const [posts, setPosts] = useState([]);
    const [offset, setOffset] = useState(0);

    const loadPosts = async () => {
        const response = await axios.get(
            `https://api.vk.com/method/wall.get?owner_id=YOUR_GROUP_ID&offset=${offset}&count=10&access_token=YOUR_ACCESS_TOKEN&v=5.131`
        );
        setPosts((prevPosts) => [...prevPosts, ...response.data.response.items]);
        setOffset((prevOffset) => prevOffset + 10);
    };

    useEffect(() => {
        loadPosts();
    }, []); 

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
        ) {
            loadPosts();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); 

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>{post.text}</div>
            ))}
        </div>
    );
};

export default VKWallWidget;
