package com.blog.BlogAppWS.Models;

import com.blog.BlogAppWS.Annotations.FileType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    private Date createdDate = new Date();

    @ManyToOne
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "comment",cascade = CascadeType.REMOVE,fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Comment> comments;


}
