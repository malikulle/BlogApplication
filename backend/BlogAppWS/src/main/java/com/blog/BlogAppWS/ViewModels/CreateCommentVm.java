package com.blog.BlogAppWS.ViewModels;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class CreateCommentVm {
    @NotNull(message = "{comment.constraints.title.NotNull.message}")
    @NotBlank(message = "{comment.constraints.title.NotNull.message}")
    private String title;
    @NotNull(message = "{comment.constraints.content.NotNull.message}")
    @NotBlank(message = "{comment.constraints.content.NotNull.message}")
    private String content;

    private long blogId;

}
