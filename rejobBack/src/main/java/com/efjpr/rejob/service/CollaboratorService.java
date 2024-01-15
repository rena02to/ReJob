package com.efjpr.rejob.service;

import com.efjpr.rejob.domain.Collaborator;
import com.efjpr.rejob.domain.Company;
import com.efjpr.rejob.domain.Dto.CollaboratorRegisterRequest;
import com.efjpr.rejob.domain.User;
import com.efjpr.rejob.repository.CollaboratorRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.beans.Transient;

@Service
@RequiredArgsConstructor
public class CollaboratorService {

    private final CollaboratorRepository collaboratorRepository;
    private final CompanyService companyService;
    @Transactional
    public void create(CollaboratorRegisterRequest request, User user) {
        Company company = companyService.getCompanyById(request.getCompanyId());
        Collaborator collaborator = Collaborator.builder()
                .user(user)
                .jobTitle(request.getJobTitle())
                .departmentOrArea(request.getDepartmentOrArea())
                .collaboratorType(request.getCollaboratorType())
                .company(company)
                .build();

        collaboratorRepository.save(collaborator);
        companyService.setUserToCompany(collaborator, company);

    }

    public Collaborator findById(Long id) {
        return collaboratorRepository.findById(id).
                orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Collaborator with ID " + id+ " not found"));
    }

    public Collaborator findByUser(User user) {
        return collaboratorRepository.findByUser(user)
                .orElseThrow(() -> new UsernameNotFoundException("Collaborator not found"));
    }
}
