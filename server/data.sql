CREATE TABLE cardTable (
    UNIQUE id VARCHAR(255),
    clicks INT,
    firstclick BIGINT
);

BEGIN
    FOR i In 1..8 LOOP
        INSERT INTO cardTable (id, clicks, firstclick)
        VALUES (CONVERT(VARCHAR(255), i), 0, -1);
    END LOOP
END