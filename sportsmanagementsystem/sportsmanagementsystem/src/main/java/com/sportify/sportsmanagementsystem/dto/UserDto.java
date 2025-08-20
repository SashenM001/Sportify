package com.sportify.sportsmanagementsystem.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String name;
    private String dateOfBirth;
    private String gender;
    private String email;
    private String password;
}
