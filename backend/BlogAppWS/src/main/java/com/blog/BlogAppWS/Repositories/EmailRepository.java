package com.blog.BlogAppWS.Repositories;

import org.springframework.stereotype.Repository;

@Repository
public interface EmailRepository {
    void sendEmail(String to, String content, String subject);
}
