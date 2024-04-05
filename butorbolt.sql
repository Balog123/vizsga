DROP DATABASE butorbolt;

CREATE DATABASE IF NOT EXISTS butorbolt DEFAULT CHARACTER SET = 'utf8' COLLATE = 'utf8_hungarian_ci';

USE butorbolt;

-- Kep
CREATE TABLE IF NOT EXISTS Kep (
    kep_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    kep_url VARCHAR(500)
);

-- Termek
CREATE TABLE IF NOT EXISTS Termek (
    termek_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    termek_nev VARCHAR(100),
    termek_ar FLOAT,
    termek_leiras VARCHAR(500),
    termek_szelesseg INT(11),
    termek_magassag INT(11),
    termek_hossz INT(11),
    termek_kategoria VARCHAR(50),
    termek_raktaron INT(11),
    termek_kep_id INT(11),
    FOREIGN KEY (termek_kep_id) REFERENCES Kep(kep_id) ON DELETE CASCADE
);

-- Felhasznalo
CREATE TABLE IF NOT EXISTS Felhasznalo (
    felhasznalo_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    felhasznalo_email VARCHAR(100),
    felhasznalo_jelszo VARCHAR(100),
    felhasznalo_keresztnev VARCHAR(50),
    felhasznalo_vezeteknev VARCHAR(50),
    felhasznalo_varos VARCHAR(100),
    felhasznalo_iranyitoszam VARCHAR(4),
    felhasznalo_cim1 VARCHAR(100),
    felhasznalo_cim2 VARCHAR(100),
    felhasznalo_admin TINYINT(1) DEFAULT 0
);

-- A fizetés eltárolása
CREATE TABLE IF NOT EXISTS Rendeles (
    rendeles_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    rendeles_felhasznalo_id INT(11),
    rendeles_szalitasi_keresztnev VARCHAR(50),
    rendeles_szalitasi_vezeteknev VARCHAR(50),
    rendeles_varos VARCHAR(50),
    rendeles_iranyitoszam VARCHAR(4),
    rendeles_cim VARCHAR(100),
    rendeles_emelet INT(11),
    rendeles_ajto INT(11),
    rendeles_termek_id INT(11), -- Új oszlop a termék azonosítójának tárolására
    rendeles_datum TIMESTAMP,
    FOREIGN KEY (rendeles_felhasznalo_id) REFERENCES Felhasznalo(felhasznalo_id)
);


-- A kosár tartalma
CREATE TABLE IF NOT EXISTS Kosar (
    kosar_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    kosar_nev VARCHAR(100),
    kosar_ar FLOAT,
    kosar_darab INT(11),
    kosar_termek_id INT(11),
    kosar_felhasznalo_id INT(11),
    FOREIGN KEY (kosar_termek_id) REFERENCES Termek(termek_id),
    FOREIGN KEY (kosar_felhasznalo_id) REFERENCES Felhasznalo(felhasznalo_id)
);

-- Példa képek
INSERT INTO Kep (kep_url) 
VALUES
    ('https://gamvis.hu/wp-content/webp-express/webp-images/uploads/2023/12/Phantom-fabric-black-best-promo-HU-980x1470.jpg.webp'),
    ('https://unizdrav.hu/thumbs/1200-1200-normal-75/product-2433/c6cf64/a7a118/relaxacios-allithato-fotel-szovet-antracit.png'),
    ('https://vdxl.im/8720286166093_m_en_hd_1.jpg?t=1700895749'),
    ('https://i.ebayimg.com/images/g/Gk8AAOSwogdj0UFV/s-l1600.jpg'),
    ('https://puracy.com/cdn/shop/articles/kenny-eliason-iAftdIcgpFc-unsplash_1.jpg?v=1689619527'),
    ('https://nidi.it/uploads/sections/images/a/aafbcceec4c484c053a91434697e0a7aa1b67902_l.jpg'),
    ('https://pictureserver.net/images/pic/79/db/undef_src_sa_picid_835642_x_760_type_whitesh_image.jpg?ver=4');

-- Példa termékek
INSERT INTO Termek (termek_nev, termek_ar, termek_leiras, termek_szelesseg, termek_magassag, termek_hossz, termek_kategoria, termek_raktaron, termek_kep_id)
VALUES 
    ('Gamer szék', 1, 'Ez egy példa termék leírása.', 20, 30, 10, 'Irodai', 1, 1),
    ('Fotel', 2, 'Ez egy másik példa termék leírása.', 25, 35, 15, 'Nappali', 12, 2),
    ('Modern szekrény', 3, 'Ez még egy példa termék leírása.', 30, 40, 20, 'Fürdőszoba', 3, 3),
    ('Fa szekrény', 4, 'Ez egy újabb példa termék leírása.', 22, 32, 12, 'Fürdőszoba', 4, 4),
    ('Luxus ágy', 5, 'Ez egy újabb példa termék leírása.', 28, 38, 18, 'Hálószoba', 5, 5),
    ('Gyerek ágy', 6, 'Ez még egy példa termék leírása.', 32, 42, 22, 'Hálószoba', 6, 6),
    ('Kanapé', 7, 'Ez egy utolsó példa termék leírása.', 26, 36, 16, 'Nappali', 7, 7);