package com.blog.BlogAppWS.Controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DummyContoller {

    @GetMapping("/dummy")
    public String dummy (){
        return "sendded";
    }
}
