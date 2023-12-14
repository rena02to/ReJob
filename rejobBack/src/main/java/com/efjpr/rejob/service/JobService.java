package com.efjpr.rejob.service;

import com.efjpr.rejob.domain.Collaborator;
import com.efjpr.rejob.domain.Job;
import com.efjpr.rejob.repository.CollaboratorRepository;
import com.efjpr.rejob.repository.JobRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Job createJob(Job job) {
        Collaborator contactPerson = collaboratorRepository.findById(job.getContactPerson().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Collaborator with ID " + job.getContactPerson().getId() + " not found"));


        job.setContactPerson(contactPerson);

        return jobRepository.save(job);
    }

    public Job getJobById(Long id) {
        return jobRepository.getReferenceById(id);
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
}
