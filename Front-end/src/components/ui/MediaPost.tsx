import { useState } from "react";

// ... other imports

interface MediaPost {
    postId: number;
    caption: string;
    mediaUrl: string; // The URL to the post's image
    likesCount: number;
    commentsCount: number;
    // other fields like creation date, author's name, etc.
}

const [posts, setPosts] = useState<MediaPost[]>([]);