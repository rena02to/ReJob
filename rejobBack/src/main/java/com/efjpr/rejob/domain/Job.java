package com.efjpr.rejob.domain;

import com.efjpr.rejob.domain.Enums.JobStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "job")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyLocation;
    private String jobType;
    private String categories;

    @ManyToOne
    private Collaborator contactPerson;

    private String jobTitle;
    private String requirements;
    private String jobDescription;
    private String benefits;
    private String employmentType;
    private Date applicationDeadline;
    private SalaryRange salaryRange;

    @Enumerated(EnumType.STRING)
    private JobStatus jobStatus;

}