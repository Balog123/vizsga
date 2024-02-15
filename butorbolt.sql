CREATE DATABASE butorbolt DEFAULT CHARACTER SET = 'utf8' COLLATE = 'utf8_hungarian_ci';

USE butorbolt;

CREATE TABLE Kep (
    kep_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    kep_url1 VARCHAR(500),
    kep_url2 VARCHAR(500)
)

CREATE TABLE Kategoria (
    kategoria_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    kategoria_nev VARCHAR(50)
)

--termek
CREATE TABLE Termek (
    termek_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    termek_nev VARCHAR(100),
    termek_ar FLOAT,
    termek_leiras VARCHAR(500),
    termek_szelesseg INT(11),
    termek_magassag INT(11),
    termek_hossz INT(11),
    termek_kategoria_id INT(11),
    termek_raktaron INT(11),
    termek_kep_id INT(11),
    FOREIGN KEY (termek_kategoria_id) REFERENCES Kategoria(kategoria_id),
    FOREIGN KEY (termek_kep_id) REFERENCES Kep(kep_id)
)

--felhasznalo
CREATE TABLE Felhasznalo (
    felhasznalo_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    felhasznalo_email VARCHAR(100),
    felhasznalo_jelszo VARCHAR(100),
    felhasznalo_keresztnev VARCHAR(50),
    felhasznalo_vezeteknev VARCHAR(50),
    felhasznalo_varos VARCHAR(100),
    felhasznalo_iranyitoszam VARCHAR(4),
    felhasznalo_cim1 VARCHAR(100),
    felhasznalo_cim2 VARCHAR(100) 
)

--A fizetés eltárolása
CREATE TABLE Rendeles (
    rendeles_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    rendeles_felhasznalo_id INT(11),
    rendeles_szalitasi_keresztnev VARCHAR(50),
    rendeles_szalitasi_vezeteknev VARCHAR(50),
    rendeles_varos VARCHAR(50),
    rendeles_iranyitoszam VARCHAR(4),
    rendeles_cim VARCHAR(100),
    rendeles_emelet INT(11),
    rendeles_ajto INT(11),
    rendeles_datum TIMESTAMP,
    FOREIGN KEY (rendeles_felhasznalo_id) REFERENCES Felhasznalo(felhasznalo_id)
)

--A kosár tartalma
CREATE TABLE RendelesReszlet (
    reszlet_rendeles_id INT(11),
    reszlet_termek_id INT(11),
    reszlet_nev VARCHAR(100),
    reszlet_ar FLOAT,
    reszlet_darab INT(11),
    FOREIGN KEY (reszlet_rendeles_id) REFERENCES Rendeles(rendeles_id),
    FOREIGN KEY (reszlet_termek_id) REFERENCES Termek(termek_id)
)



INSERT INTO Kategoria (kategoria_nev)
VALUES ('Furniture');

INSERT INTO Kep (kep_url1, kep_url2) VALUES
('https://img.freepik.com/free-photo/vertical-shot-chair-with-net-chair-s-back-white-surface_181624-22545.jpg?w=740&t=st=1708029246~exp=1708029846~hmac=ce7d2bd89cca9855569fc5810f64f1bfc3c6af2c1a10e42293e475da9186e93e', 'https://img.freepik.com/free-photo/vertical-shot-chair-with-net-chair-s-back-white-surface_181624-22545.jpg?w=740&t=st=1708029246~exp=1708029846~hmac=ce7d2bd89cca9855569fc5810f64f1bfc3c6af2c1a10e42293e475da9186e93e'),
('https://img.freepik.com/free-psd/luxury-blue-comfort-sofa-png-isolated-transparent-background_191095-9792.jpg?w=740&t=st=1708029273~exp=1708029873~hmac=3bb2658cc363726c80d7a5812a305ee2b4afdc6d006d0d358f247fd4066a137b', 'https://img.freepik.com/free-psd/luxury-blue-comfort-sofa-png-isolated-transparent-background_191095-9792.jpg?w=740&t=st=1708029273~exp=1708029873~hmac=3bb2658cc363726c80d7a5812a305ee2b4afdc6d006d0d358f247fd4066a137b'),
('https://img.freepik.com/free-photo/grey-comfortable-armchair-isolated-white-background_181624-25295.jpg?w=740&t=st=1708029277~exp=1708029877~hmac=5f98f0131dc0d6d7faaaec0d03dfd3ddf9006f63eb1b4f4f22d3562acbf367e9', 'https://img.freepik.com/free-photo/grey-comfortable-armchair-isolated-white-background_181624-25295.jpg?w=740&t=st=1708029277~exp=1708029877~hmac=5f98f0131dc0d6d7faaaec0d03dfd3ddf9006f63eb1b4f4f22d3562acbf367e9'),
('https://img.freepik.com/free-vector/double-mattress-realistic-style_1284-16866.jpg?w=900&t=st=1708029291~exp=1708029891~hmac=e4c92c48ab752716233a25b34627e67eefdf196067a049d7fef2d04f4f2dd207', 'https://img.freepik.com/free-vector/double-mattress-realistic-style_1284-16866.jpg?w=900&t=st=1708029291~exp=1708029891~hmac=e4c92c48ab752716233a25b34627e67eefdf196067a049d7fef2d04f4f2dd207'),
('https://img.freepik.com/free-psd/patio-table-isolated-transparent-background_191095-14071.jpg?w=740&t=st=1708029203~exp=1708029803~hmac=a7474fc0dba6e21d9d50c74340399ff34b6e766d1a6a429a05ce5dc4433cfad6', 'https://img.freepik.com/free-psd/patio-table-isolated-transparent-background_191095-14071.jpg?w=740&t=st=1708029203~exp=1708029803~hmac=a7474fc0dba6e21d9d50c74340399ff34b6e766d1a6a429a05ce5dc4433cfad6');

INSERT INTO Termek (termek_nev, termek_ar, termek_leiras, termek_szelesseg, termek_magassag, termek_hossz, termek_kategoria_id, termek_raktaron, termek_kep_id) VALUES
('Szék', 5000, 'Remek választás ha le szeretne ülni', 80, 60, 15, 1, 50, 1),
('Kanapé', 500000, 'Legkényelmesebb kanapé a piacon és még szép is.', 40, 20, 30, 1, 20, 2),
('Fotel', 20000, 'Ez is egy jó termék pl', 30, 30, 20, 1, 100, 3),
('Matrac', 5000, 'Very nice matrace.', 4, 8, 2, 1, 30, 4),
('Asztal', 50100, 'Üveg asztal.', 4, 8, 2, 1, 30, 5);