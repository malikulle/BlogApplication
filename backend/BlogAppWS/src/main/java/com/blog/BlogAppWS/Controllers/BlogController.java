package com.blog.BlogAppWS.Controllers;

import com.blog.BlogAppWS.Annotations.CurrentUser;
import com.blog.BlogAppWS.Models.Blog;
import com.blog.BlogAppWS.Models.User;
import com.blog.BlogAppWS.Services.BlogService;
import com.blog.BlogAppWS.ViewModels.BlogVm;
import com.blog.BlogAppWS.ViewModels.UpdateBlogVm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/blog/")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @PostMapping("")
    public ResponseEntity<?> createBlog(@Valid @RequestBody Blog blog, @CurrentUser User user) {
        blog.setUser(user);
        Blog newBlog = blogService.save(blog);
        return ResponseEntity.ok().body(newBlog);
    }

    @GetMapping("blogs")
    public Page<BlogVm> getBlogs(Pageable pageable) {
        return blogService.getBlogs(pageable).map(BlogVm::new);
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getBlogById(@PathVariable long id) {
        Blog blog = blogService.getById(id);
        return ResponseEntity.ok().body(new BlogVm(blog));
    }

    @GetMapping("user/{id}/blogs")
    public ResponseEntity<?> getUserBlgos(@PathVariable long id, Pageable pageable) {
        Page<BlogVm> blogs = blogService.findUserBlogs(id, pageable);
        return ResponseEntity.ok().body(blogs);
    }

    @GetMapping("newBlogsCount/{id:[0-9]+}")
    public ResponseEntity<?> getNewBlogsCount(@PathVariable long id, @RequestParam(required = false, defaultValue = "false") boolean count) {
        Map<String, Long> response = new HashMap<>();
        long newBlogsCount = blogService.getNewBlogsCount(id);
        response.put("count", newBlogsCount);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("newBlogs/{id:[0-9]+}")
    public ResponseEntity<?> getNewBlogs(@RequestParam(name = "direction", defaultValue = "before")String direction,@PathVariable long id){
        if (direction.equals("after")){
            List<BlogVm> blogs = blogService.getNewBlogs(id).stream().map(BlogVm::new).collect(Collectors.toList());
            return ResponseEntity.ok().body(blogs);
        }
        return null;
    }

    @DeleteMapping("{id:[0-9]+}")
    public ResponseEntity<?> deleteBlog(@PathVariable long id, @CurrentUser User user){
        blogService.delete(id,user);
        return ResponseEntity.ok().body("removed");
    }

    @PutMapping("")
    public ResponseEntity<?> updateBlog(@Valid @RequestBody UpdateBlogVm blogVm ,@CurrentUser User user){
        Blog blog = blogService.updateBlog(blogVm,user);
        return ResponseEntity.ok().body(blog);
    }
}
