package com.efjpr.rejob.domain;

import com.efjpr.rejob.domain.Enums.EducationLevel;
import com.efjpr.rejob.domain.Enums.SentenceRegime;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "employees")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    private String cpf;
    private String prisonCode;
    private EducationLevel educationLevel;
    private String dateOfBirth;
    private String residenceLocation;

    @Enumerated(EnumType.STRING)
    private SentenceRegime sentenceRegime;

    private String professionalExperience;
    private String areasOfInterest;
    private String skillsAndQualifications;
    private String educationalHistory;

}
