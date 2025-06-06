DROP DATABASE IF EXISTS reach17;
CREATE DATABASE reach17;
USE reach17;

-- Tabella tipologie di corso
CREATE TABLE course_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

-- Tabella università
CREATE TABLE universities (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE
);

-- Tabella corsi
CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  type_id INT NOT NULL,
  FOREIGN KEY (type_id) REFERENCES course_types(id) ON DELETE RESTRICT
);

-- Tabella di relazione corso-università (molti-a-molti)
CREATE TABLE course_university (
  course_id INT NOT NULL,
  university_id INT NOT NULL,
  PRIMARY KEY (course_id, university_id),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
  FOREIGN KEY (university_id) REFERENCES universities(id) ON DELETE CASCADE
);
