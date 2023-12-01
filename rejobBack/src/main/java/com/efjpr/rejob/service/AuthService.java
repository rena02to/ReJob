package com.efjpr.rejob.service;

import com.efjpr.rejob.domain.Dto.AuthRequest;
import com.efjpr.rejob.domain.Dto.AuthResponse;
import com.efjpr.rejob.domain.Dto.RegisterRequest;
import com.efjpr.rejob.domain.Role;
import com.efjpr.rejob.domain.User;
import com.efjpr.rejob.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;


    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {

            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already registered");
        }
        User user = User.builder()
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .email(request.getEmail())
                .build();

        userRepository.save(user);

        var token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }

    public AuthResponse authenticate(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();

        var token = jwtService.generateToken(user);

        return AuthResponse.builder()
                .token(token)
                .build();
    }
}
