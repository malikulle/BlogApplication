package com.blog.BlogAppWS.Services;

import com.blog.BlogAppWS.Models.Blog;
import com.blog.BlogAppWS.Models.Comment;
import com.blog.BlogAppWS.Models.User;
import com.blog.BlogAppWS.Repositories.BlogRepository;
import com.blog.BlogAppWS.Repositories.CommentRepository;
import com.blog.BlogAppWS.Shared.AuthorizationException;
import com.blog.BlogAppWS.ViewModels.CreateCommentVm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private BlogRepository blogRepository;

    public Comment save(CreateCommentVm createCommentVm, User user){

        Comment comment = new Comment();

        comment.setTitle(createCommentVm.getTitle());
        comment.setComment(createCommentVm.getContent());
        comment.setUser(user);
        Optional<Blog> blog = blogRepository.findById(createCommentVm.getBlogId());
        if (blog.isPresent()){
            comment.setBlog(blog.get());
        }
        return commentRepository.save(comment);
    }

    public Page<Comment> getBlogComments(long id, Pageable pageable){
        Optional<Blog> blog = blogRepository.findById(id);

        if(blog.isPresent()){
            return commentRepository.findByBlog(blog.get(),pageable);
        }
        return null;
    }

    public void deleteComment(long id,User user){
        Comment comment = commentRepository.getOne(id);

        if(comment.getUser().getId() != user.getId())
            throw new AuthorizationException();

        commentRepository.deleteById(id);
    }
}
