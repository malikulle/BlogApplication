package com.blog.BlogAppWS.Services;

import com.blog.BlogAppWS.Models.Blog;
import com.blog.BlogAppWS.Models.Comment;
import com.blog.BlogAppWS.Models.User;
import com.blog.BlogAppWS.Repositories.BlogRepository;
import com.blog.BlogAppWS.Repositories.CommentRepository;
import com.blog.BlogAppWS.Repositories.UserRepository;
import com.blog.BlogAppWS.Shared.AuthorizationException;
import com.blog.BlogAppWS.Shared.NotFoundException;
import com.blog.BlogAppWS.ViewModels.ChangePasswordVm;
import com.blog.BlogAppWS.ViewModels.UserUpdateVm;
import com.blog.BlogAppWS.ViewModels.UserVm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class UserService {
    private UserRepository userRepository;
    private FileService fileService;
    PasswordEncoder passwordEncoder;
    private BlogRepository blogRepository;
    private CommentRepository commentRepository;
    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder,FileService fileService,BlogRepository blogRepository,CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.fileService = fileService;
        this.blogRepository = blogRepository;
        this.commentRepository = commentRepository;
    }

    public User addUser(User user) {
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        user.setRole("Role_user");
        if (user.getImage() != null) {
            try {
                String storedFile = fileService.writeBase64EncodedToFile(user.getImage());
                user.setImage(storedFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return userRepository.save(user);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public User updateUserInfo(UserUpdateVm user)  {
        User inDb = userRepository.getOne(user.getId());
        inDb.setFirstName(user.getFirstName());
        inDb.setLastName(user.getLastName());
        inDb.setBirthDay(user.getBirthDay());
        if (user.getImage() != null) {
            String oldImageName = inDb.getImage();

            inDb.setImage(user.getImage());
            try {
                String storedFile = fileService.writeBase64EncodedToFile(user.getImage());
                inDb.setImage(storedFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
            fileService.deleteFile(oldImageName);
        }
        return userRepository.save(inDb);
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Page<UserVm> getUsers(Pageable pageable, User user) {

        if (user != null) {
            return userRepository.findByIdNotOrderByIdDesc(user.getId(), pageable).map(UserVm::new);
        }
        return userRepository.findByOrderByIdDesc(pageable).map(UserVm::new);
    }

    public User getById(long id) {
        User user = userRepository.getOne(id);
        if (user == null)
            throw new NotFoundException();
        return user;
    }

    public String changePassword(ChangePasswordVm changePasswordVm, User user) {
        user.setPassword(this.passwordEncoder.encode(changePasswordVm.getNewPassword()));
        userRepository.save(user);
        return changePasswordVm.getNewPassword();
    }

    public void deleteAccount(long id, User user){
        if (user.getId() != id)
            throw new AuthorizationException();

        List<Comment> comments = commentRepository.findByUser(user);

        for (Comment comment : comments)
            commentRepository.deleteById(comment.getId());
        List<Blog> blogs = blogRepository.findByUser(user);

        for (Blog blog : blogs){
            String imageName = blog.getImage();
            fileService.deleteFile(imageName);
        }

        if (user.getImage() != null){
            fileService.deleteFile(user.getImage());
        }

        userRepository.delete(user);
    }
}
