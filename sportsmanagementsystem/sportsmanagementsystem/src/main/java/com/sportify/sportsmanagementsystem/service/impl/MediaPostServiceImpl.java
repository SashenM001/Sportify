package com.sportify.sportsmanagementsystem.service.impl;

import com.sportify.sportsmanagementsystem.dto.MediaPostDto;
import com.sportify.sportsmanagementsystem.exception.MediaPostNotFoundException;
import com.sportify.sportsmanagementsystem.exception.UserNotFoundException;
import com.sportify.sportsmanagementsystem.model.MediaPost;
import com.sportify.sportsmanagementsystem.model.User;
import com.sportify.sportsmanagementsystem.repository.MediaPostRepository;
import com.sportify.sportsmanagementsystem.repository.UserRepository;
import com.sportify.sportsmanagementsystem.service.MediaPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MediaPostServiceImpl implements MediaPostService {

    private MediaPostRepository mediaPostRepository;
    private UserRepository userRepository;


    @Autowired
    public MediaPostServiceImpl(MediaPostRepository mediaPostRepository, UserRepository userRepository) {
        this.mediaPostRepository = mediaPostRepository;
        this.userRepository = userRepository;
    }

    public List<MediaPost> getAllMediaPosts() {
        return mediaPostRepository.findAll();
    }


    public MediaPost createMediaPost(MediaPost mediaPost) {
        return mediaPostRepository.save(mediaPost);
    }

    public void deleteMediaPost(Long postId) {
        mediaPostRepository.deleteById(postId);
    }

    @Override
    public MediaPostDto createMediaPost(Long id, MediaPostDto mediaPostDto) {

        MediaPost mediaPost = mapToEntity(mediaPostDto);

        User user = userRepository.findById(id).orElseThrow(()-> new UserNotFoundException("Owner cannot be found"));
        mediaPost.setUser(user);

        MediaPost newMediaPost = mediaPostRepository.save(mediaPost);
        return mapToDto(newMediaPost);

    }

    @Override
    public List<MediaPostDto> getMediaPostsByUserId(Long userId) {
        List<MediaPost> mediaPosts = mediaPostRepository.findByUserId(userId);

        return mediaPosts.stream().map(mediaPost -> mapToDto(mediaPost)).collect(Collectors.toList());
    }

    @Override
    public MediaPostDto getMediaPostById(Long userId,Long postId) {
        User user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException("Owner cannot be found"));

        MediaPost post= mediaPostRepository.findById(postId).orElseThrow(()->new MediaPostNotFoundException("Post does not exist"));

        if(post.getUser().getId() != user.getId()){
            throw new MediaPostNotFoundException("Post does not belong to a user");
        }
        return mapToDto(post);
    }

    @Override
    public MediaPostDto updateMediaPost(Long userId,Long postId, MediaPostDto mediaPostDto) {
        User user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException("Owner cannot be found"));

        MediaPost post= mediaPostRepository.findById(postId).orElseThrow(()->new MediaPostNotFoundException("Post does not exist"));

        if(post.getUser().getId() != user.getId()){
            throw new MediaPostNotFoundException("Post does not belong to a user");
        }

        post.setTitle(mediaPostDto.getTitle());
        post.setTimestamp(LocalDateTime.now());
        post.setCaption(mediaPostDto.getCaption());
        MediaPost updatedPost=mediaPostRepository.save(post);
        return mapToDto(updatedPost);
    }

    @Override
    public void deleteMediaPost(Long userId, Long postId) {
        User user = userRepository.findById(userId).orElseThrow(()-> new UserNotFoundException("Owner cannot be found"));

        MediaPost post= mediaPostRepository.findById(postId).orElseThrow(()->new MediaPostNotFoundException("Post does not exist"));
        if(post.getUser().getId() != user.getId()){
            throw new MediaPostNotFoundException("Post does not belong to a user");
        }

        mediaPostRepository.delete(post);
    }

    private MediaPost mapToEntity(MediaPostDto mediaPostDto) {
        MediaPost mediaPost = new MediaPost();
        mediaPost.setPostId(mediaPostDto.getPostId());
        mediaPost.setFileName(mediaPostDto.getFileName());
        mediaPost.setFilePath(mediaPostDto.getFilePath());
        mediaPost.setTitle(mediaPostDto.getTitle());
        mediaPost.setCaption(mediaPostDto.getCaption());
        mediaPost.setTimestamp(mediaPostDto.getTimestamp());
        mediaPost.setLikes(mediaPostDto.getLikes());
        return mediaPost;
    }

    private MediaPostDto mapToDto(MediaPost mediaPost) {
        MediaPostDto mediaPostDto = new MediaPostDto();
        mediaPostDto.setPostId(mediaPost.getPostId());
        mediaPostDto.setFileName(mediaPost.getFileName());
        mediaPostDto.setFilePath(mediaPost.getFilePath());
        mediaPostDto.setTitle(mediaPost.getTitle());
        mediaPostDto.setCaption(mediaPost.getCaption());
        mediaPostDto.setTimestamp(mediaPost.getTimestamp());
        mediaPostDto.setLikes(mediaPost.getLikes());
        return mediaPostDto;
    }

}
