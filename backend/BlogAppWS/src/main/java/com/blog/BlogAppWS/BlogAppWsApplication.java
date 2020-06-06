package com.blog.BlogAppWS;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class BlogAppWsApplication {

    public static void main(String[] args) {
        SpringApplication.run(BlogAppWsApplication.class, args);
    }

//    @Bean
//    @Profile("dev")
//    public CommandLineRunner createInitialUsers(UserService userService) {
//        return (args) -> {
//            for (int i = 1 ; i<25; i++){
//                User user = new User();
//                user.setEmail("user"+i+"@hotmail.com");
//                user.setFirstName("user"+i);
//                user.setLastName("surname"+i);
//                user.setPassword("12345678");
//                user.setCreatedDate(new Date());
//                user.setRole("Role_user");
//                user.setCode("1111");
//                user.setActive(true);
//                userService.addUser(user);
//            }
//
//        };
//    }
}
