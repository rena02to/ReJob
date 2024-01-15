package com.efjpr.rejob.service;

import com.efjpr.rejob.domain.Collaborator;
import com.efjpr.rejob.domain.Dto.EmployeeRegisterRequest;
import com.efjpr.rejob.domain.Employee;
import com.efjpr.rejob.domain.User;
import com.efjpr.rejob.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    public void create(EmployeeRegisterRequest request, User user) {
        Employee employee = Employee.builder()
                .user(user)
                .cpf(request.getCpf())
                .prisonCode(request.getPrisonCode())
                .educationLevel(request.getEducationLevel())
                .dateOfBirth(request.getDateOfBirth())
                .residenceLocation(request.getResidenceLocation())
                .sentenceRegime(request.getSentenceRegime())
                .professionalExperience(request.getProfessionalExperience())
                .areasOfInterest(request.getAreasOfInterest())
                .skillsAndQualifications(request.getSkillsAndQualifications())
                .educationalHistory(request.getEducationalHistory())
                .build();

        employeeRepository.save(employee);
    }

    public Employee findByUser(User user) {
        return employeeRepository.findByUser(user)
                .orElseThrow(() -> new UsernameNotFoundException("Collaborator not found"));
    }
}
