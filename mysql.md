# MySQL

## Conectando

```bash
mysql -u root -p
```

## Bancos de Dados

```sql
SHOW DATABASES;
CREATE DATABASE escola;
DROP DATABASE escola;
USE escola;
```

## Tabelas

```sql
SHOW TABLES;

CREATE TABLE aluno (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100)
);

DESCRIBE aluno;

DROP TABLE aluno;
```

## Inserção

```sql
INSERT INTO aluno(nome)
VALUES ('Maria');
```

## Consultas

```sql
SELECT * FROM aluno;

SELECT nome
FROM aluno;
```

## Atualização

```sql
UPDATE aluno
SET nome='João'
WHERE id=1;
```

## Exclusão

```sql
DELETE FROM aluno
WHERE id=1;
```

## Backup

```bash
mysqldump -u root -p banco > backup.sql
```

## Restauração

```bash
mysql -u root -p banco < backup.sql
```
