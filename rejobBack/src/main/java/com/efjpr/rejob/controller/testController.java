package com.efjpr.rejob.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/test")
public class testController {

    @GetMapping
    public ResponseEntity<String> test()
    {
        return ResponseEntity.ok("Secured endpoint uhu!!");
    }
}
