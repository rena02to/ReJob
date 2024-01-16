package com.efjpr.rejob.service;

import com.efjpr.rejob.domain.Collaborator;
import com.efjpr.rejob.domain.Dto.JobCreate;
import com.efjpr.rejob.domain.Job;
import com.efjpr.rejob.repository.CollaboratorRepository;
import com.efjpr.rejob.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class JobService {

    private final JobRepository jobRepository;
    private final CollaboratorRepository collaboratorRepository;

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public Job createJob(JobCreate jobPayload) {
        Collaborator contactPerson = collaboratorRepository.findById(jobPayload.getContactPersonId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Collaborator with ID " + jobPayload.getContactPersonId() + " not found"));

        Job job = buildJobFromPayload(jobPayload, contactPerson);

        return jobRepository.save(job);
    }

    public Job getJobById(Long id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job with id " + id + " not found") {
                });
    }

    public Job updateJob(Long id, Job updatedJob) {
        Job existingJob = jobRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job with id " + id + " not found") {
                });
        validateAndApplyUpdates(existingJob, updatedJob);
        return jobRepository.save(existingJob);
    }

    public void deleteJob(Long id) {
        Job existingJob = jobRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job with id " + id + " not found"));
        jobRepository.delete(existingJob);
    }

    private void validateAndApplyUpdates(Job existingJob, Job updatedJob) {
        existingJob.setCompanyLocation(updatedJob.getCompanyLocation());
        existingJob.setJobType(updatedJob.getJobType());
        existingJob.setCategories(updatedJob.getCategories());
        existingJob.setContactPerson(updatedJob.getContactPerson());
        existingJob.setJobTitle(updatedJob.getJobTitle());
        existingJob.setRequirements(updatedJob.getRequirements());
        existingJob.setJobDescription(updatedJob.getJobDescription());
        existingJob.setBenefits(updatedJob.getBenefits());
        existingJob.setEmploymentType(updatedJob.getEmploymentType());
        existingJob.setApplicationDeadline(updatedJob.getApplicationDeadline());
        existingJob.setJobStatus(updatedJob.getJobStatus());

    }
    private Job buildJobFromPayload(JobCreate jobPayload, Collaborator contactPerson) {
        return Job.builder()
                .companyLocation(jobPayload.getCompanyLocation())
                .jobType(jobPayload.getJobType())
                .categories(jobPayload.getCategories())
                .contactPerson(contactPerson)
                .jobTitle(jobPayload.getJobTitle())
                .requirements(jobPayload.getRequirements())
                .jobDescription(jobPayload.getJobDescription())
                .benefits(jobPayload.getBenefits())
                .employmentType(jobPayload.getEmploymentType())
                .applicationDeadline(jobPayload.getApplicationDeadline())
                .salaryRange(jobPayload.getSalaryRange())
                .educationLevel(jobPayload.getEducationLevel())
                .employmentContractType(jobPayload.getEmploymentContractType())
                .jobStatus(jobPayload.getJobStatus())
                .build();
    }

}
