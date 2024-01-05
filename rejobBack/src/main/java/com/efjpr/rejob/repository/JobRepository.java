package com.efjpr.rejob.repository;

import com.efjpr.rejob.domain.Job;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRepository extends JpaRepository<Job, Long> {

}
