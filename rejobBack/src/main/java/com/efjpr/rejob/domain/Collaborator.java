package com.efjpr.rejob.domain;

import com.efjpr.rejob.domain.Enums.CollaboratorType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Collaborators")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Collaborator  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private User user;

    private String jobTitle;
    private String departmentOrArea;

    @Enumerated(EnumType.STRING)
    private CollaboratorType collaboratorType;

}
