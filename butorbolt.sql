CREATE DATABASE butorbolt DEFAULT CHARACTER SET = 'utf8' COLLATE = 'utf8_hungarian_ci';

USE butorbolt;

CREATE TABLE Kep (
    kep_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    kep_url VARCHAR(500)
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
    termek_kategoria VARCHAR(50),
    termek_raktaron INT(11),
    termek_kep_id INT(11),
    FOREIGN KEY (termek_kep_id) REFERENCES Kep(kep_id) ON DELETE CASCADE
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
    felhasznalo_cim2 VARCHAR(100),
    felhasznalo_admin TINYINT(1) DEFAULT 0
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
CREATE TABLE Kosar (
    kosar_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    kosar_termek_id INT(11),
    kosar_felahasznalo_id INT(11)
    kosar_nev VARCHAR(100),
    kosar_ar FLOAT,
    kosar_darab INT(11),
    FOREIGN KEY (kosar_termek_id) REFERENCES Termek(termek_id),
    FOREIGN KEY (kosar_felhasznalo_id) REFERENCES Felhasznalo(felhasznalo_id)
)