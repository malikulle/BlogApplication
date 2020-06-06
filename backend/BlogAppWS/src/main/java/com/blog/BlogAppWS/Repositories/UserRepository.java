package com.blog.BlogAppWS.Repositories;

import com.blog.BlogAppWS.Models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByEmail(String email);

    Page<User> findByOrderByIdDesc(Pageable pageable);

    Page<User> findByIdNotOrderByIdDesc(long id,Pageable pageable);

}
