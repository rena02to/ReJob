-- liquibase formatted sql

-- Changeset pedro.tenorio:seeders

ALTER TABLE companies ADD COLUMN name VARCHAR(255);


INSERT INTO companies (id, cnpj, business_activity, number_of_employees, headquarters, phone, institutional_description, name)
VALUES
    (1, '12345678901234', 'Tecnologia da Informação', 150, 'Rua da Tecnologia, Cidade Tech', '123-456-7890', 'Uma empresa líder em tecnologia oferecendo soluções inovadoras de software e hardware', 'Tech Solutions Inc.'),
    (2, '98765432109876', 'Varejo', 80, 'Avenida do Comércio, Shoppingville', '987-654-3210', 'Uma grande rede de varejo oferecendo uma variedade de produtos para clientes de todas as idades', 'ShopXpress'),
    (3, '55555555555555', 'Serviços Gerais', 200, 'Rua dos Serviços, Metrópole Central', '555-555-5555', 'Uma empresa de serviços gerais que fornece uma ampla gama de soluções e assistência para empresas e residências', 'General Services Co.'),
    (4, '99999999999999', 'Restaurante', 30, 'Rua Gastronômica, Cidade Sabor', '999-999-9999', 'Um restaurante acolhedor oferecendo uma variedade de pratos deliciosos e sabores únicos', 'Sabores do Bistrô');

INSERT INTO collaborators (id, user_id, job_title, department_or_area, collaborator_type, company_id)
VALUES
    (1, 1, 'Especialista em Recrutamento', 'Recrutamento', 'PRIVATE_ENTERPRISE', 1);

INSERT INTO job (company_location, job_type, categories, contact_person_id, job_title, requirements,
                 job_description, benefits, employment_type, application_deadline, job_status, salary_range_min,
                 salary_range_max,  company_id)
VALUES
    ('Rua Tecnológica, Cidade Tech', 'Desenvolvedor de Software', 'Tecnologia da Informação', 1, 'Desenvolvedor Java',
     'Formação em Ciência da Computação, experiência em Java, conhecimento em frameworks Spring',
     'Procuramos um desenvolvedor Java experiente para contribuir para nossos projetos inovadores.',
     'Plano de saúde, vale-refeição', 'Tempo integral', '2024-03-01', 'ACTIVE', 5000, 8000, 1),

    ('Avenida do Comércio, Shoppingville', 'Vendedor', 'Varejo', 1, 'Vendedor de Eletrônicos',
     'Experiência em vendas, habilidades de comunicação, conhecimento em eletrônicos',
     'Estamos em busca de um vendedor para promover nossos produtos eletrônicos.',
     'Comissões atrativas, descontos em produtos', 'Meio período', '2024-03-15', 'ACTIVE', 2000, 4000, 2),

    ('Rua dos Serviços, Metrópole Central', 'Assistente Administrativo', 'Serviços Gerais', 1, 'Assistente Administrativo',
     'Formação em Administração, experiência em tarefas administrativas',
     'Estamos contratando um assistente administrativo para apoiar nossas operações diárias.',
     'Benefícios flexíveis, ambiente de trabalho colaborativo', 'Tempo integral', '2024-02-28', 'ACTIVE', 2500, 3500, 3),

    ('Rua Gastronômica, Cidade Sabor', 'Chef de Cozinha', 'Restaurante', 1, 'Chef Executivo',
     'Experiência como chef de cozinha, criatividade culinária, habilidades de liderança',
     'Estamos em busca de um chef executivo para liderar nossa equipe de cozinha.',
     'Plano de saúde, refeições no local', 'Tempo integral', '2024-03-10', 'ACTIVE', 3500, 6000, 4);

