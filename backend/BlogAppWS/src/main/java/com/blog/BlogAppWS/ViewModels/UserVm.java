package com.blog.BlogAppWS.ViewModels;

import com.blog.BlogAppWS.Models.User;
import lombok.Data;

import java.util.Date;

@Data
public class UserVm {

    private long id;
    private String email;
    private String firstName;
    private String lastName;
    private Date birthDay;
    private Date createdDate;
    private String image;
    private boolean isActive;
    private String code;

    public UserVm(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.birthDay = user.getBirthDay();
        this.createdDate = user.getCreatedDate();
        this.image = user.getImage();
        this.isActive = user.isActive();
        this.code = user.getCode();
    }
}
