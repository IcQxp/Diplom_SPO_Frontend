import { useEffect, useState } from "react";

interface Student {
  id: number;
  name: string;
  email: string;
  // Добавьте другие поля, если они есть
}


export const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7003/api/users/get-all");

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setStudents(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } 
      }finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(students);
  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
};