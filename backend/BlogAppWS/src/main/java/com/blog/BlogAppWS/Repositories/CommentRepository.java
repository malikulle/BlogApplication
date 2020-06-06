package com.blog.BlogAppWS.Repositories;

import com.blog.BlogAppWS.Models.Blog;
import com.blog.BlogAppWS.Models.Comment;
import com.blog.BlogAppWS.Models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {

    Page<Comment> findByBlog(Blog blog, Pageable pageable);

    List<Comment> findByBlog(Blog blog);

    List<Comment> findByUser(User user);
}
