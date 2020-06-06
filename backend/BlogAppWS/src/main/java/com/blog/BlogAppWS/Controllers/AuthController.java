package com.blog.BlogAppWS.Controllers;

import com.blog.BlogAppWS.Annotations.CurrentUser;
import com.blog.BlogAppWS.Models.User;
import com.blog.BlogAppWS.Services.UserService;
import com.blog.BlogAppWS.ViewModels.UserVm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> handleAuthentication(@CurrentUser User user) {
        if(!user.isActive()){
            Map<String,String> error = new HashMap<>();
            error.put("notActive","notActive");
            return ResponseEntity.badRequest().body(error);
        }

        return ResponseEntity.ok().body(new UserVm(user));
    }

    @PostMapping("verifyAccount")
    public  ResponseEntity<?> verifyAccount(@RequestParam String email , @RequestParam String code){
        User user = userService.getByEmail(email);
        if (user.getCode().equals(code)) {
            user.setActive(true);
            userService.updateUser(user);
            return ResponseEntity.ok().body("AccountActived");
        }
        else {
         return ResponseEntity.badRequest().body("wrongCode");
        }
    }
}
