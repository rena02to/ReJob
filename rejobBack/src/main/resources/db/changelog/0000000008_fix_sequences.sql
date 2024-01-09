-- liquibase formatted sql

-- Changeset fred:sequences

ALTER SEQUENCE companies_id_seq RESTART WITH 5;
ALTER SEQUENCE collaborators_id_seq RESTART WITH 2;
