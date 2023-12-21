package com.efjpr.rejob.controller;

import com.efjpr.rejob.domain.Dto.AuthRequest;
import com.efjpr.rejob.domain.Dto.AuthResponse;
import com.efjpr.rejob.domain.Dto.CollaboratorRegisterRequest;
import com.efjpr.rejob.domain.Dto.EmployeeRegisterRequest;
import com.efjpr.rejob.service.AuthService;
import com.efjpr.rejob.service.email.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    private final EmailService emailService;

    @PostMapping("/register-employee")
    public ResponseEntity<AuthResponse> register(@RequestPart("data") EmployeeRegisterRequest request,
                                                 @RequestPart(value = "file", required = false) MultipartFile file) {
        return new ResponseEntity<>(authService.register(request, file), HttpStatus.OK);
    }

    @PostMapping("/register-collaborator")
    public ResponseEntity<AuthResponse> register(@RequestPart("data")  CollaboratorRegisterRequest request,
                                                 @RequestPart(value = "file", required = false) MultipartFile file) {
        return new ResponseEntity<>(authService.register(request, file), HttpStatus.OK);
    }


    @PostMapping("/authenticate")
    public ResponseEntity<AuthResponse> authenticate(@RequestBody AuthRequest request) {
        return new ResponseEntity<>(authService.authenticate(request), HttpStatus.OK);
    }

    @GetMapping("/send-email")
    public String SendEmail() {
        emailService.sendSimpleMessage("fgogf@ic.ufal.br", "Teste", "Teste");
        return "ok";
    }

}
