package com.sportify.sportsmanagementsystem.service;

import com.sportify.sportsmanagementsystem.model.MediaPost;
import com.sportify.sportsmanagementsystem.repository.MediaPostRepository;
import com.sportify.sportsmanagementsystem.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MediaPostService {

    private final MediaPostRepository mediaPostRepository;

    @Autowired
    public MediaPostService(MediaPostRepository mediaPostRepository) {
        this.mediaPostRepository = mediaPostRepository;
    }

    public List<MediaPost> getAllMediaPosts() {
        return mediaPostRepository.findAll();
    }

    public MediaPost getMediaPostById(Long postId) {
        return mediaPostRepository.findByPostId(postId);
    }

    public MediaPost createMediaPost(MediaPost mediaPost) {
        return mediaPostRepository.save(mediaPost);
    }

    public void deleteMediaPost(Long postId) {
        mediaPostRepository.deleteById(postId);
    }

    // Custom business logic methods
    public List<MediaPost> getMediaPostsByUserId(Long userId) {
        return mediaPostRepository.findByUserId(userId);
    }
}
