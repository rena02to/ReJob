-- liquibase formatted sql

-- Changeset pedro.tenorio:seeders

ALTER TABLE companies ADD COLUMN name VARCHAR(255);


INSERT INTO companies (id, cnpj, business_activity, number_of_employees, headquarters, phone, institutional_description, name)
VALUES
    (1, '12345678901234', 'Tecnologia da Informa��o', 150, 'Rua da Tecnologia, Cidade Tech', '123-456-7890', 'Uma empresa l�der em tecnologia oferecendo solu��es inovadoras de software e hardware', 'Tech Solutions Inc.'),
    (2, '98765432109876', 'Varejo', 80, 'Avenida do Com�rcio, Shoppingville', '987-654-3210', 'Uma grande rede de varejo oferecendo uma variedade de produtos para clientes de todas as idades', 'ShopXpress'),
    (3, '55555555555555', 'Servi�os Gerais', 200, 'Rua dos Servi�os, Metr�pole Central', '555-555-5555', 'Uma empresa de servi�os gerais que fornece uma ampla gama de solu��es e assist�ncia para empresas e resid�ncias', 'General Services Co.'),
    (4, '99999999999999', 'Restaurante', 30, 'Rua Gastron�mica, Cidade Sabor', '999-999-9999', 'Um restaurante acolhedor oferecendo uma variedade de pratos deliciosos e sabores �nicos', 'Sabores do Bistr�');

INSERT INTO collaborators (id, user_id, job_title, department_or_area, collaborator_type, company_id)
VALUES
    (1, 1, 'Especialista em Recrutamento', 'Recrutamento', 'PRIVATE_ENTERPRISE', 1);

INSERT INTO job (company_location, job_type, categories, contact_person_id, job_title, requirements,
                 job_description, benefits, employment_type, application_deadline, job_status, salary_range_min,
                 salary_range_max,  company_id)
VALUES
    ('Rua Tecnol�gica, Cidade Tech', 'Desenvolvedor de Software', 'Tecnologia da Informa��o', 1, 'Desenvolvedor Java',
     'Forma��o em Ci�ncia da Computa��o, experi�ncia em Java, conhecimento em frameworks Spring',
     'Procuramos um desenvolvedor Java experiente para contribuir para nossos projetos inovadores.',
     'Plano de sa�de, vale-refei��o', 'Tempo integral', '2024-03-01', 'ACTIVE', 5000, 8000, 1),

    ('Avenida do Com�rcio, Shoppingville', 'Vendedor', 'Varejo', 1, 'Vendedor de Eletr�nicos',
     'Experi�ncia em vendas, habilidades de comunica��o, conhecimento em eletr�nicos',
     'Estamos em busca de um vendedor para promover nossos produtos eletr�nicos.',
     'Comiss�es atrativas, descontos em produtos', 'Meio per�odo', '2024-03-15', 'ACTIVE', 2000, 4000, 2),

    ('Rua dos Servi�os, Metr�pole Central', 'Assistente Administrativo', 'Servi�os Gerais', 1, 'Assistente Administrativo',
     'Forma��o em Administra��o, experi�ncia em tarefas administrativas',
     'Estamos contratando um assistente administrativo para apoiar nossas opera��es di�rias.',
     'Benef�cios flex�veis, ambiente de trabalho colaborativo', 'Tempo integral', '2024-02-28', 'ACTIVE', 2500, 3500, 3),

    ('Rua Gastron�mica, Cidade Sabor', 'Chef de Cozinha', 'Restaurante', 1, 'Chef Executivo',
     'Experi�ncia como chef de cozinha, criatividade culin�ria, habilidades de lideran�a',
     'Estamos em busca de um chef executivo para liderar nossa equipe de cozinha.',
     'Plano de sa�de, refei��es no local', 'Tempo integral', '2024-03-10', 'ACTIVE', 3500, 6000, 4);

