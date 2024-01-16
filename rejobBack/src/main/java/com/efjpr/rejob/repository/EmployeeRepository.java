package com.efjpr.rejob.repository;

import com.efjpr.rejob.domain.Collaborator;
import com.efjpr.rejob.domain.Employee;
import com.efjpr.rejob.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    Optional<Employee> findByUser(User user);
}
