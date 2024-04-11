-- Active: 1695321972474@@127.0.0.1@3306@butorbolt

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
    felhasznalo_cim VARCHAR(100),
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
    rendeles_termek_id INT(11),
    rendeles_datum TIMESTAMP,
    FOREIGN KEY (rendeles_felhasznalo_id) REFERENCES Felhasznalo(felhasznalo_id),
    FOREIGN KEY (rendeles_termek_id) REFERENCES Termek(termek_id)
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

-- Nappali termékek
INSERT INTO Kep (kep_url)
VALUES
    ('https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
    ('https://images.pexels.com/photos/3757055/pexels-photo-3757055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
    ('https://images.pexels.com/photos/276566/pexels-photo-276566.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
    ('https://images.pexels.com/photos/105004/pexels-photo-105004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
    ('https://images.pexels.com/photos/3965534/pexels-photo-3965534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'),
    ('https://images.pexels.com/photos/6588592/pexels-photo-6588592.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

INSERT INTO Termek (termek_nev, termek_ar, termek_leiras, termek_szelesseg, termek_magassag, termek_hossz, termek_kategoria, termek_raktaron, termek_kep_id)
VALUES
    ('Barna Kanapé', 50000, 'Ez egy barna kanapé leírása.', 200, 100, 150, 'Nappali', 10, 8),
    ('Fehér Kanapé', 60000, 'Ez egy fehér kanapé leírása.', 220, 110, 160, 'Nappali', 15, 9),
    ('L alakú Kanapé', 75000, 'Ez egy L alakú kanapé leírása.', 250, 120, 180, 'Nappali', 8, 10),
    ('Fotel', 30000, 'Ez egy fotel leírása.', 100, 80, 100, 'Nappali', 20, 11),
    ('Fehér ülőke', 40000, 'Ez egy fehér ülőke leírása.', 120, 90, 110, 'Nappali', 12, 12),
    ('Szürke Kanapé', 55000, 'Ez egy szürke kanapé leírása.', 180, 100, 140, 'Nappali', 18, 13);

-- Konyha termékek
INSERT INTO Kep (kep_url)
VALUES
    ('https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    ('https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    ('https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    ('https://images.unsplash.com/photo-1622372738946-62e02505feb3?q=80&w=2032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    ('https://images.unsplash.com/photo-1538944570562-2c9cb7857097?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    ('https://images.unsplash.com/photo-1543503103-f94a0036ed9d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

INSERT INTO Termek (termek_nev, termek_ar, termek_leiras, termek_szelesseg, termek_magassag, termek_hossz, termek_kategoria, termek_raktaron, termek_kep_id)
VALUES
    ('Fehér szekrénysor', 80000, 'Ez egy fehér szekrénysor leírása.', 180, 200, 50, 'Konyha', 10, 14),
    ('Nagy asztal székekkel', 60000, 'Ez egy nagy asztal székekkel leírása.', 220, 100, 100, 'Konyha', 8, 15),
    ('Elegáns asztal', 70000, 'Ez egy elegáns asztal leírása.', 200, 90, 90, 'Konyha', 12, 16),
    ('Barna asztal', 55000, 'Ez egy barna asztal leírása.', 180, 80, 80, 'Konyha', 15, 17),
    ('Letisztult szekrénysor', 75000, 'Ez egy letisztult szekrénysor leírása.', 160, 220, 60, 'Konyha', 6, 18),
    ('Luxus bútorszett', 100000, 'Ez egy luxus bútorszett leírása.', 240, 240, 100, 'Konyha', 7, 19);

-- Hálószoba termékek
INSERT INTO Kep (kep_url)
VALUES
    ('https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    ('https://images.unsplash.com/photo-1615874959474-d609969a20ed?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    ('https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    ('https://images.unsplash.com/photo-1635594202056-9ea3b497e5c0?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

INSERT INTO Termek (termek_nev, termek_ar, termek_leiras, termek_szelesseg, termek_magassag, termek_hossz, termek_kategoria, termek_raktaron, termek_kep_id)
VALUES
    ('Hatalmas franciaágy', 120000, 'Ez egy hatalmas franciaágy leírása.', 240, 200, 180, 'Hálószoba', 10, 20),
    ('Gyerekágy', 45000, 'Ez egy gyerekágy leírása.', 140, 80, 70, 'Hálószoba', 8, 21),
    ('Normál ágy', 85000, 'Ez egy normál ágy leírása.', 180, 160, 160, 'Hálószoba', 12, 22),
    ('Fa ágy', 95000, 'Ez egy fa ágy leírása.', 200, 180, 180, 'Hálószoba', 6, 23);


INSERT INTO Kep (kep_url)
VALUES
    ('https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    ('https://images.unsplash.com/photo-1571624436279-b272aff752b5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    ('https://images.unsplash.com/photo-1512418408532-5445158b1445?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    ('https://images.unsplash.com/photo-1582131503261-fca1d1c0589f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    ('https://images.unsplash.com/photo-1579888028917-47462bb03ca9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
    ('https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

INSERT INTO Termek (termek_nev, termek_ar, termek_leiras, termek_szelesseg, termek_magassag, termek_hossz, termek_kategoria, termek_raktaron, termek_kep_id)
VALUES
    ('Irodai asztal szett', 75000, 'Ez egy irodai asztal szett leírása.', 160, 80, 120, 'Irodai', 5, 24),
    ('Konferencia terem asztal szett', 105000, 'Ez egy konferencia terem asztal szett leírása.', 200, 100, 150, 'Irodai', 7, 25),
    ('Dekorációs lámpa', 35000, 'Ez egy dekorációs lámpa leírása.', 30, 50, 30, 'Irodai', 10, 26),
    ('Dekorációs növény', 25000, 'Ez egy dekorációs növény leírása.', 40, 80, 40, 'Irodai', 15, 27),
    ('Üveglámpa', 42000, 'Ez egy üveglámpa leírása.', 25, 40, 25, 'Irodai', 20, 28),
    ('Irodia dekoráció szett', 65000, 'Ez egy irodai dekoráció szett leírása.', 120, 60, 100, 'Irodai', 8, 29);