package com.blog.BlogAppWS.Models;

import com.blog.BlogAppWS.Annotations.FileType;
import com.blog.BlogAppWS.Annotations.UniqueEmail;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "{blog.constraints.email.NotNull.message}")
    @UniqueEmail
    @Pattern(regexp = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", message = "{blog.constraints.email.notEmail.message}")
    private String email;

    @NotNull(message = "{blog.constraints.firsName.NotNull.message}")
    private String firstName;

    @NotNull(message = "{blog.constraints.lastName.NotNull.message}")
    private String lastName;

    @NotNull
    @Size(min = 8, max = 255, message = "{blog.constraints.password.NotNull.message}")
    private String password;

    private Date birthDay;

    private Date createdDate;
    @Lob
    @FileType(types = {"image/jpeg","image/png"})
    private String image;

    private String role;

    private boolean isActive;

    private String code;

    @OneToMany(mappedBy = "user",cascade = CascadeType.REMOVE,fetch = FetchType.EAGER)
    private List<Blog> blogs;
    
    public User() {
        this.createdDate = new Date();
        this.isActive = false;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList("Role_user", "Role_admin");
    }

    @Override
    public String getUsername() {
        return this.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
