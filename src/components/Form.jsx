import React, { useState } from 'react';

const facultyMapping = {
  Ekonomi: 'Fakultas Ekonomi',
  Manajemen: 'Fakultas Ekonomi',
  Akuntansi: 'Fakultas Ekonomi',
  'Administrasi Publik': 'Fakultas Ilmu Sosial dan Politik',
  'Administrasi Bisnis': 'Fakultas Ilmu Sosial dan Politik',
  'Hubungan Internasional': 'Fakultas Ilmu Sosial dan Politik',
  'Teknik Sipil': 'Fakultas Teknik',
  Arsitektur: 'Fakultas Teknik',
  Matematika: 'Fakultas Teknologi Informasi dan Sains',
  Fisika: 'Fakultas Teknologi Informasi dan Sains',
  Informatika: 'Fakultas Teknologi Informasi dan Sains',
};

const Form = ({ setStudents }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    birthDate: '',
    gender: '',
    programStudy: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const faculty = facultyMapping[formData.programStudy];
    
    const newStudent = {
      ...formData,
      faculty,
    };

    await fetch('http://localhost:3001/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    });

    setStudents((prev) => [...prev, newStudent]);
    setFormData({
      fullname: '',
      birthDate: '',
      gender: '',
      programStudy: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullname"
        value={formData.fullname}
        onChange={handleChange}
        data-testid="name"
        placeholder="Fullname"
        required
      />
      <input
        type="date"
        name="birthDate"
        value={formData.birthDate}
        onChange={handleChange}
        data-testid="date"
        required
      />
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        data-testid="gender"
        required
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <select
        name="programStudy"
        value={formData.programStudy}
        onChange={handleChange}
        data-testid="prody"
        required
      >
        <option value="">Select Program Study</option>
        <option value="Ekonomi">Ekonomi</option>
        <option value="Manajemen">Manajemen</option>
        <option value="Akuntansi">Akuntansi</option>
        <option value="Administrasi Publik">Administrasi Publik</option>
        <option value="Administrasi Bisnis">Administrasi Bisnis</option>
        <option value="Hubungan Internasional">Hubungan Internasional</option>
        <option value="Teknik Sipil">Teknik Sipil</option>
        <option value="Arsitektur">Arsitektur</option>
        <option value="Matematika">Matematika</option>
        <option value="Fisika">Fisika</option>
        <option value="Informatika">Informatika</option>
      </select>
      <button type="submit" data-testid="submit">Add Student</button>
    </form>
  );
};

export default Form;
