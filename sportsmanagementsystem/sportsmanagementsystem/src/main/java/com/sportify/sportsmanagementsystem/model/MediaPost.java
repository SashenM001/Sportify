package com.sportify.sportsmanagementsystem.model;

import com.sportify.sportsmanagementsystem.model.User;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class MediaPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    // Use ManyToOne to define a foreign key relationship
    @ManyToOne
    @JoinColumn(name = "userId") // Specifies the foreign key column name
    private User user;

    private String fileName;
    private String filePath;
    private String title;
    private String caption;
    private LocalDateTime timestamp;
    private int likes;


    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }
}
