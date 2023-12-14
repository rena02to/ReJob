-- liquibase formatted sql

-- Changeset pedro.tenorio:redo job table

ALTER TABLE Job
    DROP CONSTRAINT IF EXISTS fk_contact_person;


ALTER TABLE Job
    RENAME COLUMN companyLocation TO company_location;
ALTER TABLE Job
    RENAME COLUMN jobType TO job_type;
ALTER TABLE Job
    RENAME COLUMN contactPerson_id TO contact_person_id;
ALTER TABLE Job
    RENAME COLUMN jobTitle TO job_title;
ALTER TABLE Job
    RENAME COLUMN jobDescription TO job_description;
ALTER TABLE Job
    RENAME COLUMN employmentType TO employment_type;
ALTER TABLE Job
    RENAME COLUMN applicationDeadline TO application_deadline;
ALTER TABLE Job
    RENAME COLUMN jobStatus TO job_status;


ALTER TABLE Job
    ADD CONSTRAINT fk_contact_person
        FOREIGN KEY (contact_person_id)
            REFERENCES collaborators(id);

