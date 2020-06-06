package com.blog.BlogAppWS.ViewModels;

import com.blog.BlogAppWS.Annotations.FileType;
import lombok.Data;

import javax.persistence.Lob;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class UpdateBlogVm {

    private long id;
    @NotNull(message = "{blog.constraints.title.NotNull.message}")
    @NotBlank(message = "{blog.constraints.title.NotNull.message}")
    @Lob
    private String title;
    @NotNull(message = "{blog.constraints.description.NotNull.message}")
    @NotBlank(message = "{blog.constraints.description.NotNull.message}")
    @Lob
    private String description;
    @Lob
    @NotNull(message = "{blog.constraints.content.NotNull.message}")
    @NotBlank(message = "{blog.constraints.content.NotNull.message}")
    private String content;
    @FileType(types = {"image/jpeg","image/png"})
    private String image;
    private long userId;
}
