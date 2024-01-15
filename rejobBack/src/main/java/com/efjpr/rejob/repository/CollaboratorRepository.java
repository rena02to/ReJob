package com.efjpr.rejob.repository;

import com.efjpr.rejob.domain.Collaborator;
import com.efjpr.rejob.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CollaboratorRepository extends JpaRepository<Collaborator, Long> {

    Optional<Collaborator> findByUser(User user);
}
