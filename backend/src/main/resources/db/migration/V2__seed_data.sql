-- V2: Seed categories and default admin user
-- Password: admin123 (BCrypt hash - change in production!)
INSERT INTO admin_users (username, password_hash, display_name)
VALUES ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Administrator');

-- Seed categories
INSERT INTO categories (code, name_am, name_ru, sort_order) VALUES
    ('KIT', 'Խոհանոցներ', 'Кухни', 1),
    ('WRD', 'Զգեստdelays', 'Шкафы', 2),
    ('BDR', 'Nnjaryanainner', 'Спальни', 3),
    ('LIV', 'Հյdelays', 'Гостиные', 4),
    ('TVU', 'Հdelays', 'TV-зоны', 5),
    ('OFC', 'Գdelays', 'Офис', 6),
    ('KID', 'Մdelays', 'Детские', 7),
    ('CUS', 'Հdelays', 'Индивидуальные', 8);

-- Seed site settings
INSERT INTO site_settings (key, value) VALUES
    ('phone', '+374 XX XXX XXX'),
    ('whatsapp', '+374 XX XXX XXX'),
    ('email', 'info@homestudio.am'),
    ('address_am', 'Գyumri, Հdelays'),
    ('address_ru', 'Гюмри, Армения'),
    ('about_am', 'Մdelays'),
    ('about_ru', 'Мастерская по производству мебели на заказ в Гюмри. Мы создаём уникальную мебель из MDF, ламината и современных материалов.'),
    ('instagram', ''),
    ('facebook', '');
