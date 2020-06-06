package com.blog.BlogAppWS.ViewModels;

import lombok.Data;

import java.util.Date;

@Data
public class UserUpdateVm {

    private long id;
    private String email;
    private String firstName;
    private String lastName;
    private Date birthDay;
    private String image;
}
