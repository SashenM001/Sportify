package com.sportify.sportsmanagementsystem.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="Roles")
public class Role {

        @Id
        @GeneratedValue(strategy= GenerationType.IDENTITY)
        private int roleId;
        private String roleName;
}
