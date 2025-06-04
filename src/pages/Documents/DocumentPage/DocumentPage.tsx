// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   getUserDocumentByID,
//   updateDocumentStatus,
// } from "../../../api/api-utils";
// import { useSelector } from "react-redux";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CircularProgress,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// export const DocumentPage = () => {
//   const { id } = useParams();
//   const [document, setDocument] = useState<any>(null);
//   const [criteriaId, setCriteriaId] = useState<number | null>(null);
//   const [score, setScore] = useState<number | null>(null);
//   const [isChecking, setIsChecking] = useState<boolean>(false);
//   const [pdfFile, setPdfFile] = useState<string | null>(null); // URL или base64 PDF
//   const [pdfError, setPdfError] = useState<string | null>(null);

//   const navigate = useNavigate();
//   const currentUser = useSelector((state: any) => state.user);
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   useEffect(() => {
//     if (!id || isNaN(Number(id))) {
//       console.error("Некорректный ID документа:", id);
//       navigate("/rating/docs");
//       return;
//     }

//     const fetchDocument = async () => {
//       try {
//         const response = await getUserDocumentByID(Number(id));
//         if (!response.data) {
//           console.error("Документ не найден");
//           navigate("/");
//           return;
//         }
//         setDocument(response.data);
//       } catch (error) {
//         console.error("Ошибка при загрузке документа:", error);
//         navigate("/");
//       }
//     };

//     fetchDocument();
//   }, [id, navigate]);

//   const handleDownloadPdf = async () => {
//     try {
//       const response = await fetch(`/api/documents/download2/${id}`);
//       if (!response.ok) {
//         throw new Error("Failed to fetch PDF");
//       }

//       const data = await response.json();
//       if (!data.fileData || !data.fileType) {
//         throw new Error("PDF data or file type is missing");
//       }

//       // Преобразуем base64 обратно в URL
//       const pdfUrl = `data:${data.fileType};base64,${data.fileData}`;
//       console.log("Загруженный PDF URL:", pdfUrl); // Отладочный вывод
//       setPdfFile(pdfUrl);
//     } catch (error) {
//       console.error("Ошибка при загрузке PDF:", error);
//       setPdfError("Не удалось загрузить PDF файл.");
//     }
//   };

//   useEffect(() => {
//     if (document) {
//       handleDownloadPdf(); // Автоматически загружаем PDF при загрузке документа
//     }
//   }, [document]);

//   if (!document) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const isDocumentOnReview = document.status.id === 5; // Статус "На проверке"
//   const isCurrentUserReviewer = document.employeeId === currentUser.id;

//   if (isDocumentOnReview && !isCurrentUserReviewer) {
//     return (
//       <Box p={4}>
//         <Typography variant="h6" color="error">
//           У вас нет прав для взаимодействия с этим документом.
//         </Typography>
//       </Box>
//     );
//   }

//   const startChecking = () => {
//     setIsChecking(true);
//   };

//   const completeChecking = async () => {
//     if (!criteriaId || score === null) {
//       alert("Пожалуйста, выберите критерии и укажите оценку.");
//       return;
//     }

//     try {
//       const payload = {
//         StatusId: 6, // Предположим, что статус "Проверен" имеет ID = 6
//         CriteriaId: criteriaId,
//         EmployeeId: currentUser.id,
//         Score: score,
//       };

//       await updateDocumentStatus(document.documentId, payload);
//       alert("Документ успешно проверен!");
//       navigate("/rating/docs");
//     } catch (error) {
//       console.error("Ошибка при обновлении статуса документа:", error);
//       alert("Произошла ошибка при обновлении статуса документа.");
//     }
//   };

//   return (
//     <Box p={4}>
//       <Card>
//         <CardContent>
//           <Typography variant="h4" gutterBottom>
//             Документ
//           </Typography>
//           <Typography variant="body1">
//             <strong>ID:</strong> {document.documentId}
//           </Typography>
//           <Typography variant="body1">
//             <strong>Статус:</strong> {document.status.name}
//           </Typography>
//           <Typography variant="body1">
//             <strong>Тип документа:</strong> {document.documentType?.name || "Не указан"}
//           </Typography>
//           <Typography variant="body1">
//             <strong>Дата загрузки:</strong>{" "}
//             {new Date(document.downloadDate).toLocaleDateString()}
//           </Typography>

//           {/* Предпросмотр PDF */}
//           <Box mt={4}>
//   <Typography variant="h5" gutterBottom>
//     Предпросмотр PDF
//   </Typography>

//   {pdfError && (
//     <Typography color="error">
//       {pdfError}
//     </Typography>
//   )}



//   {pdfFile ? (
//     <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
//       <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
//     </Worker>
//   ) : (
//     <Box display="flex" justifyContent="center" alignItems="center" height="200px">
//       <CircularProgress />
//       <Typography variant="body1" ml={2}>
//         Загрузка PDF...
//       </Typography>
//     </Box>
//   )}
// </Box>

//           {!isDocumentOnReview && (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={startChecking}
//               disabled={isChecking}
//               sx={{ mt: 2 }}
//             >
//               Начать проверку
//             </Button>
//           )}

//           {isChecking && (
//             <Box mt={4}>
//               <Typography variant="h5" gutterBottom>
//                 Проверка документа
//               </Typography>

//               {/* Ввод оценки */}
//               <TextField
//                 label="Оценка"
//                 type="number"
//                 value={score || ""}
//                 onChange={(e) => setScore(Number(e.target.value))}
//                 placeholder="Введите оценку"
//                 fullWidth
//                 margin="normal"
//               />

//               <Button
//                 variant="contained"
//                 color="success"
//                 onClick={completeChecking}
//                 sx={{ mt: 2 }}
//               >
//                 Завершить проверку
//               </Button>
//             </Box>
//           )}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getUserDocumentByID,
  updateDocumentStatus,
} from "../../../api/api-utils";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

export const DocumentPage = () => {
  const { id } = useParams();
  const [document, setDocument] = useState<any>(null);
  let criteriaId:number|null = null;
  // const [criteriaId, setCriteriaId] = useState<number | null>(null);
  const [score, setScore] = useState<number | null>(null);
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [pdfFile, setPdfFile] = useState<string | null>(null); // URL или base64 PDF
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state.user);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      console.error("Некорректный ID документа:", id);
      navigate("/rating/docs");
      return;
    }

    const fetchDocument = async () => {
      try {
        const response = await getUserDocumentByID(Number(id));
        if (!response.data) {
          console.error("Документ не найден");
          navigate("/");
          return;
        }
        setDocument(response.data);
      } catch (error) {
        console.error("Ошибка при загрузке документа:", error);
        navigate("/");
      }
    };

    fetchDocument();
  }, [id, navigate]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setError("Файл не выбран.");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Выбранный файл не является PDF.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Преобразуем файл в URL
    const fileUrl = URL.createObjectURL(file);
    console.log("Загруженный PDF URL:", fileUrl);
    setPdfFile(fileUrl);
    setIsLoading(false);
  };

  const isDocumentOnReview = document?.status?.id === 5; // Статус "На проверке"
  const isCurrentUserReviewer = document?.employeeId === currentUser.id;

  if (isDocumentOnReview && !isCurrentUserReviewer) {
    return (
      <Box p={4}>
        <Typography variant="h6" color="error">
          У вас нет прав для взаимодействия с этим документом.
        </Typography>
      </Box>
    );
  }

  const startChecking = () => {
    setIsChecking(true);
  };

  const completeChecking = async () => {
    if (!criteriaId || score === null) {
      alert("Пожалуйста, выберите критерии и укажите оценку.");
      return;
    }

    try {
      const payload = {
        StatusId: 6, // Предположим, что статус "Проверен" имеет ID = 6
        CriteriaId: criteriaId,
        EmployeeId: currentUser.id,
        Score: score,
      };

      await updateDocumentStatus(document.documentId, payload);
      alert("Документ успешно проверен!");
      navigate("/rating/docs");
    } catch (error) {
      console.error("Ошибка при обновлении статуса документа:", error);
      alert("Произошла ошибка при обновлении статуса документа.");
    }
  };

  return (
    <Box p={4}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Документ
          </Typography>
          <Typography variant="body1">
            <strong>ID:</strong> {document?.documentId}
          </Typography>
          <Typography variant="body1">
            <strong>Статус:</strong> {document?.status?.name}
          </Typography>
          <Typography variant="body1">
            <strong>Тип документа:</strong> {document?.documentType?.name || "Не указан"}
          </Typography>
          <Typography variant="body1">
            <strong>Дата загрузки:</strong>{" "}
            {new Date(document?.downloadDate).toLocaleDateString()}
          </Typography>

          {/* Кнопка для загрузки PDF */}
          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              Загрузите PDF для предпросмотра
            </Typography>
            <Button variant="contained" component="label" sx={{ mb: 2 }}>
              Загрузить PDF
              <input type="file" hidden accept="application/pdf" onChange={handleFileUpload} />
            </Button>

            {/* Ошибки */}
            {error && (
              <Typography color="error" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}

            {/* Индикатор загрузки */}
            {isLoading && (
              <Box display="flex" justifyContent="center" alignItems="center" height="100px">
                <CircularProgress />
                <Typography variant="body1" ml={2}>
                  Загрузка PDF...
                </Typography>
              </Box>
            )}

            {/* Предпросмотр PDF */}
            {pdfFile && (
              <Box mt={4}>
                <Typography variant="h5" gutterBottom>
                  Предпросмотр PDF
                </Typography>
                <iframe
                  src={pdfFile}
                  title="PDF Preview"
                  width="100%"
                  height="600px"
                  style={{ border: "1px solid #ccc" }}
                />
              </Box>
            )}
          </Box>

          {!isDocumentOnReview && (
            <Button
              variant="contained"
              color="primary"
              onClick={startChecking}
              disabled={isChecking}
              sx={{ mt: 2 }}
            >
              Начать проверку
            </Button>
          )}

          {isChecking && (
            <Box mt={4}>
              <Typography variant="h5" gutterBottom>
                Проверка документа
              </Typography>

              {/* Ввод оценки */}
              <TextField
                label="Оценка"
                type="number"
                value={score || ""}
                onChange={(e) => setScore(Number(e.target.value))}
                placeholder="Введите оценку"
                fullWidth
                margin="normal"
              />

              <Button
                variant="contained"
                color="success"
                onClick={completeChecking}
                sx={{ mt: 2 }}
              >
                Завершить проверку
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};