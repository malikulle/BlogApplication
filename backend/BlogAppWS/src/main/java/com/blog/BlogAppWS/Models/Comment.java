package com.blog.BlogAppWS.Models;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Data
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Lob
    private String title;

    @NotBlank
    @NotNull
    @Lob
    private String comment;

    private Date date = new Date();

    @ManyToOne
    private User user;
    @ManyToOne
    private Blog blog;

}
