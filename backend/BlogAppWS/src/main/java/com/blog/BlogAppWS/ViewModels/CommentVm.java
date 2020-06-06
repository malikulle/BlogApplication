package com.blog.BlogAppWS.ViewModels;

import com.blog.BlogAppWS.Models.Comment;
import lombok.Data;

import java.util.Date;

@Data
public class CommentVm {

    private long id;

    private String title;

    private String content;

    private Date date;

    private UserVm user;

    public CommentVm(Comment comment) {
        this.id = comment.getId();
        this.title = comment.getTitle();
        this.content = comment.getComment();
        this.date = comment.getDate();
        this.user = new UserVm(comment.getUser());
    }
}
