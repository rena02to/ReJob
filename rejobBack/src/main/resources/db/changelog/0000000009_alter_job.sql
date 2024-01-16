-- liquibase formatted sql

-- Changeset pedro.tenorio:sequences

ALTER TABLE job
    ADD COLUMN education_level VARCHAR(50),
    ADD COLUMN employment_contract_type VARCHAR(50);
