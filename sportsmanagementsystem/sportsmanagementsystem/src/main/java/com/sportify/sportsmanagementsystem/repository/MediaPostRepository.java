package com.sportify.sportsmanagementsystem.repository;

import com.sportify.sportsmanagementsystem.model.MediaPost;
import com.sportify.sportsmanagementsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MediaPostRepository extends JpaRepository<MediaPost, Long> {

    // Custom method to find all media posts by a user's ID
    List<MediaPost> findByUserId(Long userId);

    // Custom method to find all media posts by a user
    List<MediaPost> findByUser(User user);

    MediaPost findByPostId(Long postId);
}