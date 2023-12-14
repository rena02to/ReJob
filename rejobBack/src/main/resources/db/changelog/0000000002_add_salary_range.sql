-- liquibase formatted sql

-- Changeset pedro.tenorio:add-salary-range-to-job

ALTER TABLE Job
    ADD COLUMN salary_range_min  FLOAT,
    ADD COLUMN salary_range_max  FLOAT;