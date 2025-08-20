package com.sportify.sportsmanagementsystem.controller;

import com.sportify.sportsmanagementsystem.dto.MediaPostDto;
import com.sportify.sportsmanagementsystem.model.MediaPost;
import com.sportify.sportsmanagementsystem.service.MediaPostService;
import com.sportify.sportsmanagementsystem.service.impl.MediaPostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sportify/media")
public class MediaPostController {

    private MediaPostService mediaPostService;

    @Autowired
    public MediaPostController(MediaPostService mediaPostService) {
        this.mediaPostService = mediaPostService;
    }

    @GetMapping("/users/{userId}/posts")
    public List<MediaPostDto> getMediaPostById(@PathVariable(value="userId") Long id,@RequestBody MediaPostDto mediaPostDto) {
        return mediaPostService.getMediaPostsByUserId(id);

    }

    @PostMapping("/users/{userId}/post")
    public ResponseEntity<MediaPostDto> createMediaPost(@PathVariable(value="userId") Long userId,@RequestBody MediaPostDto mediaPostDto) {
        return new ResponseEntity<>(mediaPostService.createMediaPost(userId,mediaPostDto), HttpStatus.CREATED);
    }

    @GetMapping("/users/{userId}/posts/{postId}")
    public ResponseEntity<MediaPostDto> getMediaPostById(@PathVariable(value="userId") Long userId,@PathVariable(value="postId") Long postId) {
        MediaPostDto postDto= mediaPostService.getMediaPostById(userId,postId);
        return new ResponseEntity<>(postDto, HttpStatus.OK);
    }

    @PutMapping("users/{userId}/posts/{postId}")
    public ResponseEntity<MediaPostDto> updatePost(@PathVariable(value="userId") Long userId,@PathVariable(value="postId") Long postId,@RequestBody MediaPostDto mediaPostDto ) {
        MediaPostDto updatedPost = mediaPostService.updateMediaPost(userId,postId,mediaPostDto);
        return new ResponseEntity<>(updatedPost, HttpStatus.OK);
}
    @DeleteMapping("users/{userId}/posts/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable(value="userId") Long userId,@PathVariable(value="postId") Long postId) {
        mediaPostService.deleteMediaPost(userId,postId);
        return new ResponseEntity<>("Post deleted", HttpStatus.OK);
    }
}
