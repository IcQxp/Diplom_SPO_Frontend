// import { useEffect, useState } from "react";
// import { DocumentList } from "./FilesList.props";
// import styles from "./FilesList.module.scss";
// import { getAllDocuments, getAlldocumentTypes, getAllStatuses } from "../../api/api-utils";
// import { Status } from "../../models";

// export const FilesList = () => {
//   const [data, setData] = useState<DocumentList[]>([]);
//   const [filteredData, setFilteredData] = useState<DocumentList[]>([]);
//   const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([]); // Выбранные статусы
//   const [selectedDocumentTypes, setSelectedDocumentTypes] = useState<string[]>([]); // Выбранные типы документов
//   const [documentTypes, setDocumentTypes] = useState<string[]>([]); // Все типы документов из базы
//   const [searchQuery, setSearchQuery] = useState<string>("");
//   const [sortField, setSortField] = useState<keyof DocumentList>("documentId");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
//   const [statuses, setStatuses] = useState<Status[]>([]); // Все статусы из базы

//   // Загрузка данных при монтировании компонента
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         // Загрузка документов
//         const documentsResponse = await getAllDocuments(token);
//         setData(documentsResponse.data);
//         setFilteredData(documentsResponse.data);

//         // Загрузка типов документов
//         const typesResponse = await getAlldocumentTypes();
//         setDocumentTypes(typesResponse.data.map((type: any) => type.name));

//         // Загрузка статусов
//         const statusesResponse = await getAllStatuses();
//         setStatuses(statusesResponse.data);
//       } catch (error) {
//         console.error("Ошибка при загрузке данных:", error);
//       }
//     };
//     fetchData();
//   }, []);

//   // Обработчик изменения выбранных статусов
//   const handleStatusChange = (status: Status) => {
//     if (selectedStatuses.some((s) => s.statusId === status.statusId)) {
//       setSelectedStatuses(selectedStatuses.filter((s) => s.statusId !== status.statusId));
//     } else {
//       setSelectedStatuses([...selectedStatuses, status]);
//     }
//   };

//   // Обработчик изменения выбранных типов документов
//   const handleDocumentTypeChange = (type: string) => {
//     if (selectedDocumentTypes.includes(type)) {
//       setSelectedDocumentTypes(selectedDocumentTypes.filter((t) => t !== type));
//     } else {
//       setSelectedDocumentTypes([...selectedDocumentTypes, type]);
//     }
//   };

//   // Применение фильтров и поиска
//   useEffect(() => {
//     let filtered = data;

//     // Фильтрация по статусам
//     if (selectedStatuses.length > 0) {
//       filtered = filtered.filter((doc) =>
//         selectedStatuses.some((status) => status.name === doc.status.name)
//       );
//     }

//     // Фильтрация по типам документов
//     if (selectedDocumentTypes.length > 0) {
//       filtered = filtered.filter(
//         (doc) => doc.documentType && selectedDocumentTypes.includes(doc.documentType.name)
//       );
//     }

//     // Поиск по нескольким полям
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(
//         (doc) =>
//           String(doc.documentId).includes(query) ||
//           doc.filePath.toLowerCase().includes(query) ||
//           doc.status.name.toLowerCase().includes(query)
//       );
//     }

//     // Сортировка
//     filtered = filtered.sort((a, b) => {
//       if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
//       if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });

//     setFilteredData(filtered);
//   }, [data, selectedStatuses, selectedDocumentTypes, searchQuery, sortField, sortOrder]);

//   // Обработчик сортировки
//   const handleSort = (field: keyof DocumentList) => {
//     if (sortField === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortOrder("asc");
//     }
//   };

//   return (
//     <main className={styles.page}>
//       {/* Панель фильтров */}
//       <div className={styles.filtersContainer}>
//         <div className={styles.searchBar}>
//           <input
//             type="text"
//             placeholder="Поиск..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         {/* Чекбоксы для статусов */}
//         <div className={styles.filterGroup}>
//           <strong>Статусы:</strong>
//           <div className={styles.checkboxGroup}>
//             {statuses.map((status) => (
//               <label key={status.statusId} className={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   checked={selectedStatuses.some((s) => s.statusId === status.statusId)}
//                   onChange={() => handleStatusChange(status)}
//                 />
//                 <span>{status.name}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Чекбоксы для типов документов */}
//         <div className={styles.filterGroup}>
//           <strong>Типы документов:</strong>
//           <div className={styles.checkboxGroup}>
//             {documentTypes.map((type) => (
//               <label key={type} className={styles.checkboxLabel}>
//                 <input
//                   type="checkbox"
//                   checked={selectedDocumentTypes.includes(type)}
//                   onChange={() => handleDocumentTypeChange(type)}
//                 />
//                 <span>{type}</span>
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Таблица документов */}
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th onClick={() => handleSort("documentId")}>ID</th>
//             <th onClick={() => handleSort("filePath")}>Файл</th>
//             <th>Статус</th>
//             <th>Тип документа</th>
//             <th onClick={() => handleSort("downloadDate")}>Дата загрузки</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((elem) => (
//             <tr key={elem.documentId}>
//               <td>{elem.documentId}</td>
//               <td>{elem.filePath}</td>
//               <td>{elem.status.name}</td>
//               <td>{elem.documentType?.name || "Не указан"}</td>
//               <td>{new Date(elem.downloadDate).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </main>
//   );
// };
import { useEffect, useState } from "react";
import { DocumentList } from "./FilesList.props";
import styles from "./FilesList.module.scss";
import { getAllDocuments, getAlldocumentTypes, getAllStatuses } from "../../api/api-utils";
import { Status } from "../../models";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

export const FilesList = () => {
  const [data, setData] = useState<DocumentList[]>([]);
  const [filteredData, setFilteredData] = useState<DocumentList[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]); // Выбранные статусы
  const [selectedDocumentTypes, setSelectedDocumentTypes] = useState<string[]>([]); // Выбранные типы документов
  const [documentTypes, setDocumentTypes] = useState<string[]>([]); // Все типы документов из базы
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortField, setSortField] = useState<keyof DocumentList>("documentId");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [statuses, setStatuses] = useState<Status[]>([]); // Все статусы из базы
  const navigate = useNavigate();

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await getAllDocuments(token);
        setData(response.data);
        setFilteredData(response.data);

        // Получаем уникальные типы документов из базы
        const typesResponse = await getAlldocumentTypes();
        setDocumentTypes(typesResponse.data.map((type: any) => type.name));

        // Получаем все статусы
        const statusesResponse = await getAllStatuses();
        setStatuses(statusesResponse.data);
      }
    };
    fetchData();
  }, []);

  // Обработчик изменения выбранных статусов
  const handleStatusChange = (status: string) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  // Обработчик изменения выбранных типов документов
  const handleDocumentTypeChange = (type: string) => {
    if (selectedDocumentTypes.includes(type)) {
      setSelectedDocumentTypes(selectedDocumentTypes.filter((t) => t !== type));
    } else {
      setSelectedDocumentTypes([...selectedDocumentTypes, type]);
    }
  };

  // Применение фильтров и поиска
  useEffect(() => {
    let filtered = data;

    // Фильтрация по статусам
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((doc) => selectedStatuses.includes(doc.status.name));
    }

    // Фильтрация по типам документов
    if (selectedDocumentTypes.length > 0) {
      filtered = filtered.filter(
        (doc) => doc.documentType && selectedDocumentTypes.includes(doc.documentType.name)
      );
    }

    // Поиск по нескольким полям
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (doc) =>
          String(doc.documentId).includes(query) ||
          doc.filePath.toLowerCase().includes(query) ||
          doc.status.name.toLowerCase().includes(query)
      );
    }

    // Сортировка
    filtered = filtered.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredData(filtered);
  }, [data, selectedStatuses, selectedDocumentTypes, searchQuery, sortField, sortOrder]);

  // Обработчик сортировки
  const handleSort = (field: keyof DocumentList) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <main className={styles.page}>
      {/* Панель фильтров */}
      <div className={styles.filtersContainer}>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Чекбоксы для статусов */}
        <div className={styles.filterGroup}>
          <strong>Статусы:</strong>
          <div className={styles.checkboxGroup}>
            {statuses.map((status) => (
              <label key={status.statusId} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status.name)}
                  onChange={() => handleStatusChange(status.name)}
                />
                <span>{status.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Чекбоксы для типов документов */}
        <div className={styles.filterGroup}>
          <strong>Типы документов:</strong>
          <div className={styles.checkboxGroup}>
            {documentTypes.map((type) => (
              <label key={type} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={selectedDocumentTypes.includes(type)}
                  onChange={() => handleDocumentTypeChange(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Таблица документов */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th onClick={() => handleSort("documentId")}>ID</th>
            <th onClick={() => handleSort("filePath")}>Файл</th>
            <th>Статус</th>
            <th>Тип документа</th>
            <th onClick={() => handleSort("downloadDate")}>Дата загрузки</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((elem) => (
            <tr key={elem.documentId}>
              <td>{elem.documentId}</td>
              <td>{elem.filePath.replace("UploadedFiles\\","")}</td>
              <td>{elem.status.name}</td>
              <td>{elem.documentType?.name || "Не указан"}</td>
              <td>{new Date(elem.downloadDate).toLocaleDateString()}</td>
              <td>
                <Button size="medium" variant="contained" onClick={() => navigate(`/rating/doc/${elem.documentId}`)}>
                  просмотр
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};