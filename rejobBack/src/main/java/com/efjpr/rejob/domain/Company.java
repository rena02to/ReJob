package com.efjpr.rejob.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.ReadOnlyProperty;

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
    private String name;
    private String businessActivity;
    private int numberOfEmployees;
    private String headquarters;
    private String phone;
    private String institutionalDescription;

    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
    @ToString.Exclude
    private List<Collaborator> collaborators;


}
