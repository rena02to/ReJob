package com.efjpr.rejob.service;

import com.efjpr.rejob.domain.Collaborator;
import com.efjpr.rejob.domain.Dto.CollaboratorRegisterRequest;
import com.efjpr.rejob.domain.User;
import com.efjpr.rejob.repository.CollaboratorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CollaboratorService {

    private final CollaboratorRepository collaboratorRepository;

    public void create(CollaboratorRegisterRequest request, User user) {
        Collaborator collaborator = Collaborator.builder()
                .user(user)
                .jobTitle(request.getJobTitle())
                .departmentOrArea(request.getDepartmentOrArea())
                .collaboratorType(request.getCollaboratorType())
                .build();

        collaboratorRepository.save(collaborator);

    }
}
