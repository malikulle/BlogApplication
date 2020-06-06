package com.blog.BlogAppWS.Configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "blog")
public class AppConfiguration {

    private String uploadPath;

    private String emailAddress;

    private String emailPassword;
}
