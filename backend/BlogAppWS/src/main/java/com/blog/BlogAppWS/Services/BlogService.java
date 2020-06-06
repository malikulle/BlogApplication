package com.blog.BlogAppWS.Services;

import com.blog.BlogAppWS.Models.Blog;
import com.blog.BlogAppWS.Models.Comment;
import com.blog.BlogAppWS.Models.User;
import com.blog.BlogAppWS.Repositories.BlogRepository;
import com.blog.BlogAppWS.Repositories.CommentRepository;
import com.blog.BlogAppWS.Repositories.UserRepository;
import com.blog.BlogAppWS.Shared.AuthorizationException;
import com.blog.BlogAppWS.ViewModels.BlogVm;
import com.blog.BlogAppWS.ViewModels.UpdateBlogVm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private FileService fileService;

    public Blog save(Blog blog){
        if (blog.getImage() != null) {
            try {
                String storedFile = fileService.writeBase64EncodedToFile(blog.getImage());
                blog.setImage(storedFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return blogRepository.save(blog);
    }

    public Page<Blog> getBlogs(Pageable pageable) {
        return blogRepository.findAll(pageable);
    }

    public Blog getById(long id){
        return blogRepository.getOne(id);
    }

    public Page<BlogVm> findUserBlogs(long id, Pageable pageable){
        User user = userRepository.getOne(id);
        return blogRepository.findByUser(user,pageable).map(BlogVm::new);
    }

    public long getNewBlogsCount(long id) {
        return blogRepository.countByIdGreaterThan(id);
    }

    public List<Blog> getNewBlogs(long id) {
        return blogRepository.findByIdGreaterThanOrderByIdDesc(id);
    }

    public void delete(long id,User user) {
        Blog blog = blogRepository.getOne(id);

        if(blog.getUser().getId() != user.getId())
            throw new AuthorizationException();

        if(blog.getImage() != null){
            String imageName = blog.getImage();
            fileService. deleteFile(imageName);
        }
        List<Comment> comments = commentRepository.findByBlog(blog);

        for (Comment comment : comments){
            commentRepository.deleteById(comment.getId());
        }
        blogRepository.deleteById(id);
    }

    public Blog updateBlog(UpdateBlogVm blog , User user){

        if (blog.getUserId() != user.getId())
            throw new AuthorizationException();

        Optional<Blog> optionalBlog = blogRepository.findById(blog.getId());
        Blog blogDb = new Blog() ;
        if(optionalBlog.isPresent()){
            blogDb = optionalBlog.get();
        }
        blogDb.setTitle(blog.getTitle());
        blogDb.setContent(blog.getContent());
        blogDb.setDescription(blog.getDescription());

        if(blog.getImage() != null){
            try {
                String oldImage = blogDb.getImage();
                fileService.deleteFile(oldImage);
                String storedFile = fileService.writeBase64EncodedToFile(blog.getImage());
                blogDb.setImage(storedFile);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        blogRepository.save(blogDb);
        return blogDb;
    }
}
