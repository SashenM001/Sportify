package com.sportify.sportsmanagementsystem.service;

import com.sportify.sportsmanagementsystem.dto.MediaPostDto;
import com.sportify.sportsmanagementsystem.model.User;

import java.util.List;

public interface MediaPostService {

    MediaPostDto createMediaPost(Long userId, MediaPostDto mediaPostDto);

    List<MediaPostDto> getMediaPostsByUserId(Long userId);

    MediaPostDto getMediaPostById(Long postId,Long userId);

    MediaPostDto updateMediaPost(Long postId,Long userId, MediaPostDto mediaPostDto);

    void deleteMediaPost(Long userId,Long postId);
}
