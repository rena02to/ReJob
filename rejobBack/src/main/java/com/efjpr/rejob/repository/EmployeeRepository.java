package com.efjpr.rejob.repository;

import com.efjpr.rejob.domain.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
