import { useEffect, useState } from "react";
import axiosInstance from "@/axiosConfig";
import { PlayerCard } from "./PlayerCard";

interface MediaPost {
    postId: number;
    authorName: string; // Assuming the API returns author's name
    caption: string;
    mediaUrl: string;
    likesCount: number;
    commentsCount: number;
    creationDate: string; // Assuming the date is returned as a string
    // Assuming user info is nested within the post object
    user: {
        userId: number;
        username: string;
    };
}


export function PostFeed() {
    const [posts, setPosts] = useState<MediaPost[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Adjust the URL to your backend endpoint
                const response = await axiosInstance.get<MediaPost[]>("http://localhost:8080/mediaposts");
                setPosts(response.data);
            } catch (err) {
                console.error("Error fetching media posts:", err);
                setError("Failed to fetch posts. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []); // Empty dependency array ensures this runs once

    if (loading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="space-y-6">
            {posts.map((post) => (
                <PlayerCard
                    key={post.postId}
                    playerName={post.authorName} // Assuming the API returns authorName
                    playerImage={post.mediaUrl}
                    caption={post.caption}
                    likes={post.likesCount}
                    comments={post.commentsCount}
                    timeAgo={post.creationDate} // Assuming the API returns a formatted date
                />
            ))}
        </div>
    );
    // ... (rest of the component)
}