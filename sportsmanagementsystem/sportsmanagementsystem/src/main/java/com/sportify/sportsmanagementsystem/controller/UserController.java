package com.sportify.sportsmanagementsystem.controller;


import com.sportify.sportsmanagementsystem.dto.UserDto;
import com.sportify.sportsmanagementsystem.model.User;
import com.sportify.sportsmanagementsystem.service.UserService;
import com.sportify.sportsmanagementsystem.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sportify")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/users/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<UserDto> newUser(@RequestBody() UserDto userDto) {
        return new ResponseEntity<>(userService.createUser(userDto),HttpStatus.CREATED);
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return new ResponseEntity<>(userService.getUsers(),HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/user/{id}/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto,@PathVariable("id") Long id){
        UserDto updatedUser = userService.updateUser(userDto,id);
        return new ResponseEntity<>(updatedUser,HttpStatus.OK);
    }

    @DeleteMapping("/user/{id}/delete")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Long id){
        userService.deleteUserById(id);
        return ResponseEntity.ok("User Deleted");
    }


}

