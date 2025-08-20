package com.sportify.sportsmanagementsystem.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MediaPostDto {
    private Long postId;
    private String fileName;
    private String filePath;
    private String title;
    private String caption;
    private LocalDateTime timestamp;
    private int likes;
}
