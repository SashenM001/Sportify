package com.sportify.sportsmanagementsystem.service;

import com.sportify.sportsmanagementsystem.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createUser(UserDto userDto);
    List<UserDto> getUsers();
    UserDto getUserById(Long id);
    UserDto updateUser( UserDto userDto, Long id);
    void deleteUserById(Long id);
}
