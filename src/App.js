import React, { useEffect, useState } from 'react';
import Form from './components/Form';
import Table from './components/Table';

const App = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch('http://localhost:3001/student');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <h1>Student Portal</h1>
      <Form setStudents={setStudents} />
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <Table students={students} setStudents={setStudents} />
      )}
    </div>
  );
};

export default App;
