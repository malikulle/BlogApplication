package com.blog.BlogAppWS.ViewModels;

import com.blog.BlogAppWS.Models.Blog;
import lombok.Data;

import java.util.Date;

@Data
public class BlogVm {
    private long id;
    private String title;
    private String description;
    private String content;
    private String image;
    private Date createdDate = new Date();

    private UserVm user;

    public BlogVm(Blog blog) {
        this.id = blog.getId();
        this.title = blog.getTitle();
        this.description = blog.getDescription();
        this.content = blog.getContent().replaceAll("<.*?>" , " ");
        this.image = blog.getImage();
        this.createdDate = blog.getCreatedDate();

        this.user = new UserVm(blog.getUser());
    }
}
