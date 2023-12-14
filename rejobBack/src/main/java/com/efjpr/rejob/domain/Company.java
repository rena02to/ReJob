package com.efjpr.rejob.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "companies")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cnpj;
    private String businessActivity;
    private int numberOfEmployees;
    private String headquarters;
    private String phone;
    private String institutionalDescription;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    private List<Collaborator> collaborators;
}
