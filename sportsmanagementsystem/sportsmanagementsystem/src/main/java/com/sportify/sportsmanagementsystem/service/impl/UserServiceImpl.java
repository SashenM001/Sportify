package com.sportify.sportsmanagementsystem.service.impl;


import com.sportify.sportsmanagementsystem.dto.UserDto;
import com.sportify.sportsmanagementsystem.exception.UserNotFoundException;
import com.sportify.sportsmanagementsystem.model.User;
import com.sportify.sportsmanagementsystem.repository.UserRepository;
import com.sportify.sportsmanagementsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public UserDto createUser(UserDto userDto) {
        User user = new User();
        user.setName(userDto.getName());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setEmail(userDto.getEmail());
        user.setDateOfBirth(userDto.getDateOfBirth());
        user.setGender(userDto.getGender());


        User newuser = userRepository.save(user);
        UserDto userResponse = new UserDto();
        userResponse.setId(newuser.getId());
        userResponse.setName(newuser.getName());
        userResponse.setUsername(newuser.getUsername());
        userResponse.setPassword(newuser.getPassword());
        userResponse.setDateOfBirth(newuser.getDateOfBirth());
        userResponse.setGender(newuser.getGender());
        userResponse.setEmail(newuser.getEmail());
        return userResponse;
    }

    @Override
    public List<UserDto> getUsers() {
        List<User> users = userRepository.findAll();
        //map because it returns a new list
        return users.stream().map(user -> mapToDto(user)).collect(Collectors.toList());
    }
    private UserDto mapToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setUsername(user.getUsername());
        userDto.setPassword(user.getPassword());
        userDto.setDateOfBirth(user.getDateOfBirth());
        userDto.setGender(user.getGender());
        userDto.setEmail(user.getEmail());
        return userDto;
    }
    private User mapToEntity(UserDto userDto) {
        User user = new User();
        user.setId(userDto.getId());
        user.setName(userDto.getName());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setGender(userDto.getGender());
        user.setDateOfBirth(userDto.getDateOfBirth());
        user.setEmail(userDto.getEmail());
        return user;
    }
    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(()->new UserNotFoundException("User not found"));
        return mapToDto(user);
    }

    @Override
    public UserDto updateUser(UserDto userDto, Long id) {
        User user = userRepository.findById(id).orElseThrow(()->new UserNotFoundException("User not found"));
        user.setName(userDto.getName());
        user.setUsername(userDto.getUsername());
        user.setPassword(userDto.getPassword());
        user.setGender(userDto.getGender());
        user.setEmail(userDto.getEmail());

        User updatedUser = userRepository.save(user);
        return mapToDto(updatedUser);
    }

    @Override
    public void deleteUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(()->new UserNotFoundException("User not found"));
        userRepository.delete(user);
    }


}
