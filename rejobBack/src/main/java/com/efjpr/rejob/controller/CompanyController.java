package com.efjpr.rejob.controller;

import com.efjpr.rejob.domain.Collaborator;
import com.efjpr.rejob.domain.Company;
import com.efjpr.rejob.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/v1/companies")
@RequiredArgsConstructor
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    @PostMapping
    public ResponseEntity<Company> createCompany(@RequestBody Company company) {
        Company createdCompany = companyService.createCompany(company);
        return new ResponseEntity<>(createdCompany, HttpStatus.CREATED);
    }

    @GetMapping("/{companyId}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long companyId) {
        Company company = companyService.getCompanyById(companyId);
        return new ResponseEntity<>(company, HttpStatus.OK);
    }

    @GetMapping("by-collaborator-id/{collaboratorId}")
    public ResponseEntity<Company> getCompanyByCollaboratorId(@PathVariable Long collaboratorId) {
        Company company = companyService.getCompanyByCollaboratorId(collaboratorId);
        return new ResponseEntity<>(company, HttpStatus.OK);
    }

    @GetMapping("collaborator-list/{collaboratorId}")
    public ResponseEntity<List<Collaborator>> getCollaboratorListFromSameCompany(@PathVariable Long collaboratorId) {
        Company company = companyService.getCompanyByCollaboratorId(collaboratorId);
        return new ResponseEntity<>(company.getCollaborators(), HttpStatus.OK);
    }

    @PutMapping("/{companyId}")
    public ResponseEntity<Company> updateCompany(@PathVariable Long companyId, @RequestBody Company company) {
        Company updatedCompany = companyService.updateCompany(companyId, company);
        return new ResponseEntity<>(updatedCompany, HttpStatus.OK);
    }

    @DeleteMapping("/{companyId}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long companyId) {
        companyService.deleteCompany(companyId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<List<Company>> getAllCompanies() {
        List<Company> companies = companyService.getAllCompanies();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }
}
