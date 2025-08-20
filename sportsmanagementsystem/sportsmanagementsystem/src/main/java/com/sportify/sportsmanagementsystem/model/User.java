package com.sportify.sportsmanagementsystem.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String name;
    private String dateOfBirth;
    private String gender;
    private String email;
    private String password;

//    @Enumerated(EnumType.STRING)
//    private Role role = Role.USER;

    @OneToMany(mappedBy="user" , cascade = CascadeType.ALL,orphanRemoval = true)
    private List<MediaPost> mediaPosts = new ArrayList<MediaPost>();

}

