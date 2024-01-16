package com.efjpr.rejob.domain.Dto;

import com.efjpr.rejob.domain.Collaborator;
import com.efjpr.rejob.domain.Enums.EducationLevel;
import com.efjpr.rejob.domain.Enums.EmploymentContractType;
import com.efjpr.rejob.domain.Enums.JobStatus;
import com.efjpr.rejob.domain.SalaryRange;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.util.Date;
@Data
public class JobCreate {

    private Long id;

    private String companyLocation;
    private String jobType;
    private String categories;
    private Long contactPersonId;
    private String jobTitle;
    private String requirements;
    private String jobDescription;
    private String benefits;
    private String employmentType;
    private Date applicationDeadline;
    private SalaryRange salaryRange;

    @Enumerated(EnumType.STRING)
    private EducationLevel educationLevel;

    @Enumerated(EnumType.STRING)
    private EmploymentContractType employmentContractType;

    @Enumerated(EnumType.STRING)
    private JobStatus jobStatus;
}
