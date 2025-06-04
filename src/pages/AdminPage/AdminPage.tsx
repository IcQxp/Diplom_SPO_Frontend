// import React, { useState } from "react";
// import {
//   Tabs,
//   Tab,
//   Box,
//   Typography,
//   Paper,
// } from "@mui/material";
// import DataTable from "./DataTable";
// import SearchBar from "./SearchBar";
// import { getAllCritea, getAllDisciplines, getAllStudents } from "../../api/api-utils";

// // Пример данных
// const criteriaData = [
//   { id: 1, name: "Критерий 1" },
//   { id: 2, name: "Критерий 2" },
// ];

// export const AdminPage = () => {
//   const [tabValue, setTabValue] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");

// const handleGetData = async () => {
//   await getAllCritea();
//   await getAllDisciplines();
//   await getAllStudents();
// }


//   const handleChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue);
//   };

//   const handleEdit = (id: number, updatedData: any) => {
//     console.log(`Обновление записи с ID: ${id}`, updatedData);
//   };

//   const handleDelete = (id: number) => {
//     console.log(`Удаление записи с ID: ${id}`);
//   };

//   const filteredData = criteriaData.filter((item) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Box sx={{ width: "100%" }}>
//       {/* Вкладки */}
//       <Tabs
//         value={tabValue}
//         onChange={handleChange}
//         indicatorColor="primary"
//         textColor="primary"
//         centered
//       >
//         <Tab label="Критерии" />
//         <Tab label="Дисциплины" />
//         <Tab label="Студенты" />
//         {/* Добавьте другие вкладки */}
//       </Tabs>

//       {/* Содержимое вкладок */}
//       <Box sx={{ p: 3 }}>
//         {tabValue === 0 && (
//           <Paper elevation={3} sx={{ p: 2 }}>
//             <Typography variant="h6">Критерии</Typography>
//             <SearchBar onSearch={setSearchQuery} />
//             <DataTable
//               data={filteredData}
//               columns={["id", "name"]}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//             />
//           </Paper>
//         )}
//         {/* Добавьте другие таблицы */}
//       </Box>
//     </Box>
//   );
// };
import React, { useEffect, useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import DataTable from "./DataTable";
import SearchBar from "./SearchBar";
import { getAllCritea, getAllDisciplines, getAllDocuments, getAlldocumentTypes, getAllEmployees, getAllGrades, getAllGroups, getAllLessons, getAllRoles, getAllStudents } from "../../api/api-utils";
import { Criterion, Discipline, Document, DocumentType, Employee, Grade, Group, Lesson, Role, Student } from "../../models";

export const AdminPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const token = localStorage.getItem('token');  // Убедитесь, что вы получили токен после входа
  

  // Состояния для данных каждой таблицы
  const [criteriaData, setCriteriaData] = useState<Criterion[]>([]);
const [disciplinesData, setDisciplinesData] = useState<Discipline[]>([]);
const [studentsData, setStudentsData] = useState<Student[]>([]);
const [documentsData, setDocumentsData] = useState<Document[]>([]);
const [documentTypesData, setDocumentTypesData] = useState<DocumentType[]>([]);
const [employeesData, setEmployeesData] = useState<Employee[]>([]);
const [gradesData, setGradesData] = useState<Grade[]>([]);
const [groupsData, setGroupsData] = useState<Group[]>([]);
const [lessonsData, setLessonsData] = useState<Lesson[]>([]);
const [rolesData, setRolesData] = useState<Role[]>([]);

// Флаги для отслеживания загрузки данных
const [isCriteriaLoading, setIsCriteriaLoading] = useState(false);
const [isDisciplinesLoading, setIsDisciplinesLoading] = useState(false);
const [isStudentsLoading, setIsStudentsLoading] = useState(false);
const [isDocumentsLoading, setIsDocumentsLoading] = useState(false);
const [isDocumentTypesLoading, setIsDocumentTypesLoading] = useState(false);
const [isEmployeesLoading, setIsEmployeesLoading] = useState(false);
const [isGradesLoading, setIsGradesLoading] = useState(false);
const [isGroupsLoading, setIsGroupsLoading] = useState(false);
const [isLessonsLoading, setIsLessonsLoading] = useState(false);
const [isRolesLoading, setIsRolesLoading] = useState(false);



  // Функция для загрузки данных критериев
  const loadCriteria = async () => {
    if (criteriaData.length === 0) {
      setIsCriteriaLoading(true);
      try {
        const data = await getAllCritea();
        setCriteriaData(data.data);
      } catch (error) {
        console.error("Ошибка загрузки критериев:", error);
      } finally {
        setIsCriteriaLoading(false);
      }
    }
  };

  // Функция для загрузки данных дисциплин
  const loadDisciplines = async () => {
    if (disciplinesData.length === 0) {
      setIsDisciplinesLoading(true);
      try {
        const data = await getAllDisciplines();
        setDisciplinesData(data.data);
      } catch (error) {
        console.error("Ошибка загрузки дисциплин:", error);
      } finally {
        setIsDisciplinesLoading(false);
      }
    }
  };

  // Функция для загрузки данных студентов
  const loadStudents = async () => {
    if (studentsData.length === 0) {
      setIsStudentsLoading(true);
      try {
        const data = await getAllStudents();
        setStudentsData(data.data);
      } catch (error) {
        console.error("Ошибка загрузки студентов:", error);
      } finally {
        setIsStudentsLoading(false);
      }
    }
  };
  const loadDocuments = async () => {
    if (documentsData.length === 0 && token) {
      setIsDocumentsLoading(true);
      try {
        const data = await getAllDocuments(token); // Предполагается, что есть API-функция getAllDocuments
        setDocumentsData(data.data);
      } catch (error) {
        console.error("Ошибка загрузки документов:", error);
      } finally {
        setIsDocumentsLoading(false);
      }
    }
  };
  const loadDocumentTypes = async () => {
    if (documentTypesData.length === 0) {
      setIsDocumentTypesLoading(true);
      try {
        const data = await getAlldocumentTypes(); // Предполагается, что есть API-функция getAllDocumentTypes
        setDocumentTypesData(data.data);
      } catch (error) {
        console.error("Ошибка загрузки типов документов:", error);
      } finally {
        setIsDocumentTypesLoading(false);
      }
    }
  };

  const loadEmployees = async () => {
    if (employeesData.length === 0) {
      setIsEmployeesLoading(true);
      try {
        const data = await getAllEmployees(); // Предполагается, что есть API-функция getAllEmployees
        setEmployeesData(data.data);
      } catch (error) {
        console.error("Ошибка загрузки работников:", error);
      } finally {
        setIsEmployeesLoading(false);
      }
    }
  };

  const loadGrades = async () => {
    if (gradesData.length === 0) {
      setIsGradesLoading(true);
      try {
        const data = await getAllGrades(); // Предполагается, что есть API-функция getAllGrades
        setGradesData(data.data);
      } catch (error) {
        console.error("Ошибка загрузки оценок:", error);
      } finally {
        setIsGradesLoading(false);
      }
    }
  };

  const loadGroups = async () => {
    if (groupsData.length === 0) {
      setIsGroupsLoading(true);
      try {
        const data = await getAllGroups(); // Предполагается, что есть API-функция getAllGroups
        setGroupsData(data.data);
      } catch (error) {
        console.error("Ошибка загрузки групп:", error);
      } finally {
        setIsGroupsLoading(false);
      }
    }
  };
  const loadLessons = async () => {
    if (lessonsData.length === 0) {
      setIsLessonsLoading(true);
      try {
        const data = await getAllLessons(); // Предполагается, что есть API-функция getAllLessons
        setLessonsData(data.data);
      } catch (error) {
        console.error("Ошибка загрузки занятий:", error);
      } finally {
        setIsLessonsLoading(false);
      }
    }
  };

  const loadRoles = async () => {
    if (rolesData.length === 0) {
      setIsRolesLoading(true);
      try {
        const data = await getAllRoles(); // Предполагается, что есть API-функция getAllRoles
        setRolesData(data.data);
      } catch (error) {
        console.error("Ошибка загрузки ролей:", error);
      } finally {
        setIsRolesLoading(false);
      }
    }
  };


useEffect(()=> {

  loadCriteria();
},[])

  // Обработчик переключения вкладок
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    event&&{}
    setTabValue(newValue);
  
    // Загружаем данные в зависимости от выбранной вкладки
    switch (newValue) {
      case 0:
        if (criteriaData.length === 0) loadCriteria();
        break;
      case 1:
        if (disciplinesData.length === 0) loadDisciplines();
        break;
      case 2:
        if (studentsData.length === 0) loadStudents();
        break;
      case 3:
        if (documentsData.length === 0) loadDocuments();
        break;
      case 4:
        if (documentTypesData.length === 0) loadDocumentTypes();
        break;
      case 5:
        if (employeesData.length === 0) loadEmployees();
        break;
      case 6:
        if (gradesData.length === 0) loadGrades();
        break;
      case 7:
        if (groupsData.length === 0) loadGroups();
        break;
      case 8:
        if (lessonsData.length === 0) loadLessons();
        break;
      case 9:
        if (rolesData.length === 0) loadRoles();
        break;
      default:
        break;
    }
  };

  // Обработчики редактирования и удаления
  const handleEdit = (id: number, updatedData: any) => {
    console.log(`Обновление записи с ID: ${id}`, updatedData);
  };

  const handleDelete = (id: number) => {
    console.log(`Удаление записи с ID: ${id}`);
  };

  // Фильтрация данных поиска
  const filteredData =
  tabValue === 0
    ? criteriaData
        .filter((item) => item && item.name)
        .filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : tabValue === 1
    ? disciplinesData
        .filter((item) => item && item.name)
        .filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : tabValue === 2
    ? studentsData
        .filter((item) => item && item.lastname)
        .filter((item) =>
          item.lastname.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((item) => ({
          ...item,
          group: item.group?.groupNumber || "Нет группы",
        }))
    : tabValue === 3
    ? documentsData
        .filter((item) => item && item.downloadDate)
        .filter((item) =>
          item.downloadDate.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : tabValue === 4
    ? documentTypesData
        .filter((item) => item && item.name)
        .filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : tabValue === 5
    ? employeesData
        .filter((item) => item && item.lastname)
        .filter((item) =>
          item.lastname.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : tabValue === 6
    ? gradesData
        .filter((item) => item && item.gradeId)
        .filter((item) =>
          item.gradeId.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
    : tabValue === 7
    ? groupsData
        .filter((item) => item && item.groupNumber)
        .filter((item) =>
          item.groupNumber.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : tabValue === 8
    ? lessonsData
        .filter((item) => item && item.lessonDate)
        .filter((item) =>
          item.lessonDate.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((item) => ({
          ...item,
          disciplineName: item.discipline?.name || "Нет дисциплины",
          employeeName: item.employee?.lastname || "Нет преподавателя",
          time: item.lessonTime?.startTime || "Нет времени",
        }))
    : tabValue === 9
    ? rolesData
        .filter((item) => item && item.name)
        .filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : [];

  return (
    <Box sx={{ width: "100%" }}>
      {/* Вкладки */}
      <Tabs
        value={tabValue}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
      <Tab label="Критерии" />
      <Tab label="Дисциплины" />
      <Tab label="Студенты" />
      <Tab label="Документы" />
      <Tab label="Типы документов" />
      <Tab label="Работники" />
      <Tab label="Оценки" />
      <Tab label="Группы" />
      <Tab label="Занятия" />
      <Tab label="Роли" />
        {/* Добавьте другие вкладки */}
      </Tabs>

      {/* Содержимое вкладок */}
      <Box sx={{ p: 3 }}>
  {/* Критерии */}
  {tabValue === 0 && (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Критерии</Typography>
      <SearchBar onSearch={setSearchQuery} />
      {isCriteriaLoading ? (
        <CircularProgress />
      ) : (
        <DataTable
          data={filteredData}
          columns={["criteriaId", "name"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Paper>
  )}

  {/* Дисциплины */}
  {tabValue === 1 && (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Дисциплины</Typography>
      <SearchBar onSearch={setSearchQuery} />
      {isDisciplinesLoading ? (
        <CircularProgress />
      ) : (
        <DataTable
          data={filteredData}
          columns={["disciplineId", "name"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Paper>
  )}

  {/* Студенты */}
  {tabValue === 2 && (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Студенты</Typography>
      <SearchBar onSearch={setSearchQuery} />
      {isStudentsLoading ? (
        <CircularProgress />
      ) : (
        <DataTable
          data={filteredData}
          columns={["studentId", "lastname", "firstname", "patronymic", "genderCode", "login", "birthDate", "group"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Paper>
  )}

  {/* Документы */}
  {tabValue === 3 && (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Документы</Typography>
      <SearchBar onSearch={setSearchQuery} />
      {isDocumentsLoading ? (
        <CircularProgress />
      ) : (
        <DataTable
          data={filteredData}
          columns={["documentId", "studentId", "filePath","score","downloadDate"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Paper>
  )}

  {/* Типы документов */}
  {tabValue === 4 && (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Типы документов</Typography>
      <SearchBar onSearch={setSearchQuery} />
      {isDocumentTypesLoading ? (
        <CircularProgress />
      ) : (
        <DataTable
          data={filteredData}
          columns={["documentTypeId","name","description"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Paper>
  )}

  {/* Работники */}
  {tabValue === 5 && (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Работники</Typography>
      <SearchBar onSearch={setSearchQuery} />
      {isEmployeesLoading ? (
        <CircularProgress />
      ) : (
        <DataTable
          data={filteredData}
          columns={["employeeId", "lastname", "firstname", "genderCode", "patronymic","birthDate","login","email", "telephone","roleId"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Paper>
  )}

  {/* Оценки */}
  {tabValue === 6 && (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Оценки</Typography>
      <SearchBar onSearch={setSearchQuery} />
      {isGradesLoading ? (
        <CircularProgress />
      ) : (
        <DataTable
          data={filteredData}
          columns={["gradeId", "lessonId", "studentId", "value"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Paper>
  )}

  {/* Группы */}
  {tabValue === 7 && (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Группы</Typography>
      <SearchBar onSearch={setSearchQuery} />
      {isGroupsLoading ? (
        <CircularProgress />
      ) : (
        <DataTable
          data={filteredData}
          columns={["groupId", "groupNumber"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Paper>
  )}

  {/* Занятия */}
  {tabValue === 8 && (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Занятия</Typography>
      <SearchBar onSearch={setSearchQuery} />
      {isLessonsLoading ? (
        <CircularProgress />
      ) : (
        <DataTable
          data={filteredData}
          columns={["lessonId","disciplineName","employeeName","lessonDate","time" ]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Paper>
  )}

  {/* Роли */}
  {tabValue === 9 && (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6">Роли</Typography>
      <SearchBar onSearch={setSearchQuery} />
      {isRolesLoading ? (
        <CircularProgress />
      ) : (
        <DataTable
          data={filteredData}
          columns={["roleId", "name"]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </Paper>
  )}
</Box>
    </Box>
  );
};