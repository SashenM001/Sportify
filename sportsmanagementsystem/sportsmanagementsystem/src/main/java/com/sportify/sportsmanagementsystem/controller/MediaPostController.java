package com.sportify.sportsmanagementsystem.controller;

import com.sportify.sportsmanagementsystem.model.MediaPost;
import com.sportify.sportsmanagementsystem.service.MediaPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/mediaposts")
public class MediaPostController {

    private final MediaPostService mediaPostService;

    @Autowired
    public MediaPostController(MediaPostService mediaPostService) {
        this.mediaPostService = mediaPostService;
    }

    @GetMapping
    public List<MediaPost> getAllMediaPosts() {
        return mediaPostService.getAllMediaPosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MediaPost> getMediaPostById(@PathVariable Long id) {
        MediaPost mediaPost = mediaPostService.getMediaPostById(id);
        return ResponseEntity.status(HttpStatus.OK).body(mediaPost);

    }

    @PostMapping
    public ResponseEntity<MediaPost> createMediaPost(@RequestBody MediaPost mediaPost) {
        MediaPost createdPost = mediaPostService.createMediaPost(mediaPost);
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMediaPost(@PathVariable Long id) {
        mediaPostService.deleteMediaPost(id);
        return ResponseEntity.noContent().build();
    }
}
