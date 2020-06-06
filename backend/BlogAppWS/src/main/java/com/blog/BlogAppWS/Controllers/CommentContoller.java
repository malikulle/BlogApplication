package com.blog.BlogAppWS.Controllers;

import com.blog.BlogAppWS.Annotations.CurrentUser;
import com.blog.BlogAppWS.Models.Comment;
import com.blog.BlogAppWS.Models.User;
import com.blog.BlogAppWS.Services.CommentService;
import com.blog.BlogAppWS.ViewModels.CommentVm;
import com.blog.BlogAppWS.ViewModels.CreateCommentVm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/comment/")
public class CommentContoller {

    @Autowired
    private CommentService commentService;

    @PostMapping("")
    public CommentVm createComment(@CurrentUser User user, @Valid @RequestBody CreateCommentVm commentVm){
        Comment comment = commentService.save(commentVm,user);
        return new CommentVm(comment);
    }

    @GetMapping("comments/{id:[0-9]+}")
    public ResponseEntity<?> getBlogComments(Pageable pageable ,@PathVariable long id){
        return ResponseEntity.ok().body(commentService.getBlogComments(id,pageable));
    }

    @DeleteMapping("{id:[0-9]+}")
    public ResponseEntity<?> deleteBlog(@PathVariable long id , @CurrentUser User user){
        commentService.deleteComment(id, user);
        return ResponseEntity.ok().body("removed");
    }
}
