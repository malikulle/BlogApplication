package com.blog.BlogAppWS.Repositories;

import com.blog.BlogAppWS.Models.Blog;
import com.blog.BlogAppWS.Models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog,Long> {


    Page<Blog> findByUser(User user, Pageable page);

    long countByIdGreaterThan(long  id);

    List<Blog> findByIdGreaterThanOrderByIdDesc(long id);

    List<Blog> findByUser(User user);
}
