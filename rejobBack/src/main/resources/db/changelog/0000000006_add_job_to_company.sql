ALTER TABLE job
    ADD COLUMN company_id BIGINT,
    ADD CONSTRAINT fk_company
        FOREIGN KEY (company_id)
            REFERENCES companies (id);