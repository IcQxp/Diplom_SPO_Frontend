import { useEffect, useState } from "react";

interface Student {
  studentId: number;
  lastname: string;
  firstname: string;
  patronymic: string;
  genderCode: string;
  login: string;
  birthDate: Date;
  group: string

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

  console.table(students);
  return (
    <div>
      <h1>Student List</h1>
      <ul>
        {students.map((student) => (
          <li key={student.studentId}>
            {student.lastname} - {student.firstname}
          </li>
        ))}
      </ul>
    </div>
  );
};