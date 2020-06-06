package com.blog.BlogAppWS.Controllers;

import com.blog.BlogAppWS.Annotations.CurrentUser;
import com.blog.BlogAppWS.Models.User;
import com.blog.BlogAppWS.Services.EmailService;
import com.blog.BlogAppWS.Services.UserService;
import com.blog.BlogAppWS.ViewModels.ChangePasswordVm;
import com.blog.BlogAppWS.ViewModels.UserUpdateVm;
import com.blog.BlogAppWS.ViewModels.UserVm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Random;

@RestController
@RequestMapping("/api/user/")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {

        Random random = new Random();
        int low = 1111;
        int high = 9999;
        String code = String.valueOf(random.nextInt(high - low) + low);
        String content = String.format("Your verification code is %s", code);
        String subject = "Verification Code";

        user.setCode(code);
        User newUser = userService.addUser(user);
        emailService.sendEmail(newUser.getEmail(), content, subject);
        return new ResponseEntity<User>(newUser, HttpStatus.OK);
    }

    @GetMapping("getAll")
    public Page<UserVm> getUsers(@CurrentUser User user, Pageable pageable) {
        return userService.getUsers(pageable, user);
    }

    @GetMapping("{id}")
    public UserVm getUser(@PathVariable long id) {
        User user = userService.getById(id);
        return new UserVm(user);
    }

    @PutMapping("")
    @PreAuthorize("#user.email == principal.email")
    public ResponseEntity<?> updateUser(@RequestBody UserUpdateVm user) {
        User updatedUser = userService.updateUserInfo(user);
        return ResponseEntity.ok().body(new UserVm(updatedUser));
    }

    @PostMapping("changePassword")
    @PreAuthorize("#user.email == principal.email")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordVm changePasswordVm, @CurrentUser User user) {
        
        String newPassword = userService.changePassword(changePasswordVm, user);

        return ResponseEntity.ok().body(newPassword);
    }

    @PostMapping("forgotPassword")
    public void forgotPassword(@RequestParam String email){
        User user = userService.getByEmail(email);

        Random random = new Random();
        int low = 111111;
        int high = 999999;
        String code = String.valueOf(random.nextInt(high - low) + low);
        String content = String.format("Your new password is %s", code);
        String subject = "New Password";

        user.setPassword(this.passwordEncoder.encode(code));

        userService.updateUser(user);
        emailService.sendEmail(email,content,subject);

    }

    @DeleteMapping("{id:[0-9]+}")
    public ResponseEntity<?> deleteAccount(@PathVariable long id ,@CurrentUser User user){
        userService.deleteAccount(id,user);
        return ResponseEntity.ok().body("removed");
    }
}
