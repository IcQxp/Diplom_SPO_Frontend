// // import {
// //   getUserDocumentByID,
// //   updateDocumentStatus,
// // } from "../../../api/api-utils";
// // import {
// //   Button,
// // } from "@mui/material";
// // import "@react-pdf-viewer/core/lib/styles/index.css";
// // import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// // // // // // // // export const DocumentPage = () => {
// // // // // // // //   const { id } = useParams();
// // // // // // // //   const [document, setDocument] = useState<any>(null);
// // // // // // // //   const [criteriaId, setCriteriaId] = useState<number | null>(null);
// // // // // // // //   const [score, setScore] = useState<number | null>(null);
// // // // // // // //   const [isChecking, setIsChecking] = useState<boolean>(false);
// // // // // // // //   const [pdfFile, setPdfFile] = useState<string | null>(null); // URL или base64 PDF
// // // // // // // //   const [pdfError, setPdfError] = useState<string | null>(null);

// // // // // // // //   const navigate = useNavigate();
// // // // // // // //   const currentUser = useSelector((state: any) => state.user);
// // // // // // // //   const defaultLayoutPluginInstance = defaultLayoutPlugin();

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!id || isNaN(Number(id))) {
// // // // // // // //       console.error("Некорректный ID документа:", id);
// // // // // // // //       navigate("/rating/docs");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     const fetchDocument = async () => {
// // // // // // // //       try {
// // // // // // // //         const response = await getUserDocumentByID(Number(id));
// // // // // // // //         if (!response.data) {
// // // // // // // //           console.error("Документ не найден");
// // // // // // // //           navigate("/");
// // // // // // // //           return;
// // // // // // // //         }
// // // // // // // //         setDocument(response.data);
// // // // // // // //       } catch (error) {
// // // // // // // //         console.error("Ошибка при загрузке документа:", error);
// // // // // // // //         navigate("/");
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchDocument();
// // // // // // // //   }, [id, navigate]);

// // // // // // // //   const handleDownloadPdf = async () => {
// // // // // // // //     try {
// // // // // // // //       const response = await fetch(`/api/documents/download2/${id}`);
// // // // // // // //       if (!response.ok) {
// // // // // // // //         throw new Error("Failed to fetch PDF");
// // // // // // // //       }

// // // // // // // //       const data = await response.json();
// // // // // // // //       if (!data.fileData || !data.fileType) {
// // // // // // // //         throw new Error("PDF data or file type is missing");
// // // // // // // //       }

// // // // // // // //       // Преобразуем base64 обратно в URL
// // // // // // // //       const pdfUrl = `data:${data.fileType};base64,${data.fileData}`;
// // // // // // // //       console.log("Загруженный PDF URL:", pdfUrl); // Отладочный вывод
// // // // // // // //       setPdfFile(pdfUrl);
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Ошибка при загрузке PDF:", error);
// // // // // // // //       setPdfError("Не удалось загрузить PDF файл.");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   useEffect(() => {
// // // // // // // //     if (document) {
// // // // // // // //       handleDownloadPdf(); // Автоматически загружаем PDF при загрузке документа
// // // // // // // //     }
// // // // // // // //   }, [document]);

// // // // // // // //   if (!document) {
// // // // // // // //     return (
// // // // // // // //       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
// // // // // // // //         <CircularProgress />
// // // // // // // //       </Box>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   const isDocumentOnReview = document.status.id === 5; // Статус "На проверке"
// // // // // // // //   const isCurrentUserReviewer = document.employeeId === currentUser.id;

// // // // // // // //   if (isDocumentOnReview && !isCurrentUserReviewer) {
// // // // // // // //     return (
// // // // // // // //       <Box p={4}>
// // // // // // // //         <Typography variant="h6" color="error">
// // // // // // // //           У вас нет прав для взаимодействия с этим документом.
// // // // // // // //         </Typography>
// // // // // // // //       </Box>
// // // // // // // //     );
// // // // // // // //   }

// // // // // // // //   const startChecking = () => {
// // // // // // // //     setIsChecking(true);
// // // // // // // //   };

// // // // // // // //   const completeChecking = async () => {
// // // // // // // //     if (!criteriaId || score === null) {
// // // // // // // //       alert("Пожалуйста, выберите критерии и укажите оценку.");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     try {
// // // // // // // //       const payload = {
// // // // // // // //         StatusId: 6, // Предположим, что статус "Проверен" имеет ID = 6
// // // // // // // //         CriteriaId: criteriaId,
// // // // // // // //         EmployeeId: currentUser.id,
// // // // // // // //         Score: score,
// // // // // // // //       };

// // // // // // // //       await updateDocumentStatus(document.documentId, payload);
// // // // // // // //       alert("Документ успешно проверен!");
// // // // // // // //       navigate("/rating/docs");
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error("Ошибка при обновлении статуса документа:", error);
// // // // // // // //       alert("Произошла ошибка при обновлении статуса документа.");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <Box p={4}>
// // // // // // // //       <Card>
// // // // // // // //         <CardContent>
// // // // // // // //           <Typography variant="h4" gutterBottom>
// // // // // // // //             Документ
// // // // // // // //           </Typography>
// // // // // // // //           <Typography variant="body1">
// // // // // // // //             <strong>ID:</strong> {document.documentId}
// // // // // // // //           </Typography>
// // // // // // // //           <Typography variant="body1">
// // // // // // // //             <strong>Статус:</strong> {document.status.name}
// // // // // // // //           </Typography>
// // // // // // // //           <Typography variant="body1">
// // // // // // // //             <strong>Тип документа:</strong> {document.documentType?.name || "Не указан"}
// // // // // // // //           </Typography>
// // // // // // // //           <Typography variant="body1">
// // // // // // // //             <strong>Дата загрузки:</strong>{" "}
// // // // // // // //             {new Date(document.downloadDate).toLocaleDateString()}
// // // // // // // //           </Typography>

// // // // // // // //           {/* Предпросмотр PDF */}
// // // // // // // //           <Box mt={4}>
// // // // // // // //   <Typography variant="h5" gutterBottom>
// // // // // // // //     Предпросмотр PDF
// // // // // // // //   </Typography>

// // // // // // // //   {pdfError && (
// // // // // // // //     <Typography color="error">
// // // // // // // //       {pdfError}
// // // // // // // //     </Typography>
// // // // // // // //   )}



// // // // // // // //   {pdfFile ? (
// // // // // // // //     <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
// // // // // // // //       <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]} />
// // // // // // // //     </Worker>
// // // // // // // //   ) : (
// // // // // // // //     <Box display="flex" justifyContent="center" alignItems="center" height="200px">
// // // // // // // //       <CircularProgress />
// // // // // // // //       <Typography variant="body1" ml={2}>
// // // // // // // //         Загрузка PDF...
// // // // // // // //       </Typography>
// // // // // // // //     </Box>
// // // // // // // //   )}
// // // // // // // // </Box>

// // // // // // // //           {!isDocumentOnReview && (
// // // // // // // //             <Button
// // // // // // // //               variant="contained"
// // // // // // // //               color="primary"
// // // // // // // //               onClick={startChecking}
// // // // // // // //               disabled={isChecking}
// // // // // // // //               sx={{ mt: 2 }}
// // // // // // // //             >
// // // // // // // //               Начать проверку
// // // // // // // //             </Button>
// // // // // // // //           )}

// // // // // // // //           {isChecking && (
// // // // // // // //             <Box mt={4}>
// // // // // // // //               <Typography variant="h5" gutterBottom>
// // // // // // // //                 Проверка документа
// // // // // // // //               </Typography>

// // // // // // // //               {/* Ввод оценки */}
// // // // // // // //               <TextField
// // // // // // // //                 label="Оценка"
// // // // // // // //                 type="number"
// // // // // // // //                 value={score || ""}
// // // // // // // //                 onChange={(e) => setScore(Number(e.target.value))}
// // // // // // // //                 placeholder="Введите оценку"
// // // // // // // //                 fullWidth
// // // // // // // //                 margin="normal"
// // // // // // // //               />

// // // // // // // //               <Button
// // // // // // // //                 variant="contained"
// // // // // // // //                 color="success"
// // // // // // // //                 onClick={completeChecking}
// // // // // // // //                 sx={{ mt: 2 }}
// // // // // // // //               >
// // // // // // // //                 Завершить проверку
// // // // // // // //               </Button>
// // // // // // // //             </Box>
// // // // // // // //           )}
// // // // // // // //         </CardContent>
// // // // // // // //       </Card>
// // // // // // // //     </Box>
// // // // // // // //   );
// // // // // // // // };

// // import {
// //   TextField,
// // } from "@mui/material";

// // // // // // // export const DocumentPage = () => {
// // // // // // //   const { id } = useParams();
// // // // // // //   const [document, setDocument] = useState<any>(null);
// // // // // // //   let criteriaId:number|null = null;
// // // // // // //   // const [criteriaId, setCriteriaId] = useState<number | null>(null);
// // // // // // //   const [score, setScore] = useState<number | null>(null);
// // // // // // //   const [isChecking, setIsChecking] = useState<boolean>(false);
// // // // // // //   const [pdfFile, setPdfFile] = useState<string | null>(null); // URL или base64 PDF
// // // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // // //   const navigate = useNavigate();
// // // // // // //   const currentUser = useSelector((state: any) => state.user);

// // // // // // //    const getDocumentPdfBase64 = async (documentId: number) => {
// // // // // // //   const response = await fetch(`/api/documents/pdf/${documentId}`);
// // // // // // //   if (!response.ok) throw new Error("Не удалось загрузить PDF");
// // // // // // //   return await response.json(); // вернет объект с fileData и fileName
// // // // // // // };

// // // // // // //   useEffect(() => {
// // // // // // //     if (!id || isNaN(Number(id))) {
// // // // // // //       console.error("Некорректный ID документа:", id);
// // // // // // //       navigate("/rating/docs");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     const fetchDocument = async () => {
// // // // // // //       try {

// // // // // // // //         const response = await fetch(`/api/documents/stream/${id}`);
// // // // // // // // const blob = await response.blob();
// // // // // // // // const url = window.URL.createObjectURL(blob);

// // // // // // // // setPdfFile(url);
// // // // // // // const pdfResponse = await getDocumentPdfBase64(Number(id));

// // // // // // //         // Преобразуем Base64 в data URL
// // // // // // //         const fileUrl = `data:${pdfResponse.mimeType};base64,${pdfResponse.fileData}`;
// // // // // // //         setPdfFile(fileUrl);

// // // // // // //         // const response = await getUserDocumentByID(Number(id));
// // // // // // //         // if (!response.data) {
// // // // // // //         //   console.error("Документ не найден");
// // // // // // //         //   navigate("/");
// // // // // // //         //   return;
// // // // // // //         // }
// // // // // // //         // setDocument(response.data);
// // // // // // //       } catch (error) {
// // // // // // //         console.error("Ошибка при загрузке документа:", error);
// // // // // // //         // navigate("/");
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchDocument();
// // // // // // //   }, [id, navigate]);

// // // // // // //   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     const file = event.target.files?.[0];
// // // // // // //     if (!file) {
// // // // // // //       setError("Файл не выбран.");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     if (file.type !== "application/pdf") {
// // // // // // //       setError("Выбранный файл не является PDF.");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setIsLoading(true);
// // // // // // //     setError(null);

// // // // // // //     // Преобразуем файл в URL
// // // // // // //     const fileUrl = URL.createObjectURL(file);
// // // // // // //     console.log("Загруженный PDF URL:", fileUrl);
// // // // // // //     setPdfFile(fileUrl);
// // // // // // //     setIsLoading(false);
// // // // // // //   };

// // // // // // //   const isDocumentOnReview = document?.status?.id === 5; // Статус "На проверке"
// // // // // // //   const isCurrentUserReviewer = document?.employeeId === currentUser.id;

// // // // // // //   if (isDocumentOnReview && !isCurrentUserReviewer) {
// // // // // // //     return (
// // // // // // //       <Box p={4}>
// // // // // // //         <Typography variant="h6" color="error">
// // // // // // //           У вас нет прав для взаимодействия с этим документом.
// // // // // // //         </Typography>
// // // // // // //       </Box>
// // // // // // //     );
// // // // // // //   }

// // // // // // //   const startChecking = () => {
// // // // // // //     setIsChecking(true);
// // // // // // //   };

// // // // // // //   const completeChecking = async () => {
// // // // // // //     if (!criteriaId || score === null) {
// // // // // // //       alert("Пожалуйста, выберите критерии и укажите оценку.");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     try {
// // // // // // //       const payload = {
// // // // // // //         StatusId: 6, // Предположим, что статус "Проверен" имеет ID = 6
// // // // // // //         CriteriaId: criteriaId,
// // // // // // //         EmployeeId: currentUser.id,
// // // // // // //         Score: score,
// // // // // // //       };

// // // // // // //       await updateDocumentStatus(document.documentId, payload);
// // // // // // //       alert("Документ успешно проверен!");
// // // // // // //       navigate("/rating/docs");
// // // // // // //     } catch (error) {
// // // // // // //       console.error("Ошибка при обновлении статуса документа:", error);
// // // // // // //       alert("Произошла ошибка при обновлении статуса документа.");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <Box p={4}>
// // // // // // //       <Card>
// // // // // // //         <CardContent>
// // // // // // //           <Typography variant="h4" gutterBottom>
// // // // // // //             Документ
// // // // // // //           </Typography>
// // // // // // //           <Typography variant="body1">
// // // // // // //             <strong>ID:</strong> {document?.documentId}
// // // // // // //           </Typography>
// // // // // // //           <Typography variant="body1">
// // // // // // //             <strong>Статус:</strong> {document?.status?.name}
// // // // // // //           </Typography>
// // // // // // //           <Typography variant="body1">
// // // // // // //             <strong>Тип документа:</strong> {document?.documentType?.name || "Не указан"}
// // // // // // //           </Typography>
// // // // // // //           <Typography variant="body1">
// // // // // // //             <strong>Дата загрузки:</strong>{" "}
// // // // // // //             {new Date(document?.downloadDate).toLocaleDateString()}
// // // // // // //           </Typography>

// // // // // // //           {/* Кнопка для загрузки PDF */}
// // // // // // //           <Box mt={4}>
// // // // // // //             <Typography variant="h5" gutterBottom>
// // // // // // //               Загрузите PDF для предпросмотра
// // // // // // //             </Typography>
// // // // // // //             <Button variant="contained" component="label" sx={{ mb: 2 }}>
// // // // // // //               Загрузить PDF
// // // // // // //               <input type="file" hidden accept="application/pdf" onChange={handleFileUpload} />
// // // // // // //             </Button>

// // // // // // //             {/* Ошибки */}
// // // // // // //             {error && (
// // // // // // //               <Typography color="error" sx={{ mt: 2 }}>
// // // // // // //                 {error}
// // // // // // //               </Typography>
// // // // // // //             )}

// // // // // // //             {/* Индикатор загрузки */}
// // // // // // //             {isLoading && (
// // // // // // //               <Box display="flex" justifyContent="center" alignItems="center" height="100px">
// // // // // // //                 <CircularProgress />
// // // // // // //                 <Typography variant="body1" ml={2}>
// // // // // // //                   Загрузка PDF...
// // // // // // //                 </Typography>
// // // // // // //               </Box>
// // // // // // //             )}

// // // // // // //             {/* Предпросмотр PDF */}
// // // // // // //             {/* {pdfFile && (
// // // // // // //               <Box mt={4}>
// // // // // // //                 <Typography variant="h5" gutterBottom>
// // // // // // //                   Предпросмотр PDF
// // // // // // //                 </Typography>
// // // // // // //                 <iframe
// // // // // // //                   src={pdfFile}
// // // // // // //                   title="PDF Preview"
// // // // // // //                   width="100%"
// // // // // // //                   height="600px"
// // // // // // //                   style={{ border: "1px solid #ccc" }}
// // // // // // //                 />
// // // // // // //               </Box>
// // // // // // //             )} */}
// // // // // // //             {pdfFile ? (
// // // // // // //         <Box mt={4}>
// // // // // // //           <Typography variant="h5" gutterBottom>
// // // // // // //             Предпросмотр документа
// // // // // // //           </Typography>
// // // // // // //           <iframe
// // // // // // //             src={pdfFile}
// // // // // // //             title="PDF Preview"
// // // // // // //             width="100%"
// // // // // // //             height="600px"
// // // // // // //             style={{ border: "1px solid #ccc" }}
// // // // // // //           />
// // // // // // //         </Box>
// // // // // // //       ) : (
// // // // // // //         <Typography>Документ не найден или не загружен</Typography>
// // // // // // //       )}
// // // // // // //           </Box>

// // // // // // //           {!isDocumentOnReview && (
// // // // // // //             <Button
// // // // // // //               variant="contained"
// // // // // // //               color="primary"
// // // // // // //               onClick={startChecking}
// // // // // // //               disabled={isChecking}
// // // // // // //               sx={{ mt: 2 }}
// // // // // // //             >
// // // // // // //               Начать проверку
// // // // // // //             </Button>
// // // // // // //           )}

// // // // // // //           {isChecking && (
// // // // // // //             <Box mt={4}>
// // // // // // //               <Typography variant="h5" gutterBottom>
// // // // // // //                 Проверка документа
// // // // // // //               </Typography>

// // // // // // //               {/* Ввод оценки */}
// // // // // // //               <TextField
// // // // // // //                 label="Оценка"
// // // // // // //                 type="number"
// // // // // // //                 value={score || ""}
// // // // // // //                 onChange={(e) => setScore(Number(e.target.value))}
// // // // // // //                 placeholder="Введите оценку"
// // // // // // //                 fullWidth
// // // // // // //                 margin="normal"
// // // // // // //               />

// // // // // // //               <Button
// // // // // // //                 variant="contained"
// // // // // // //                 color="success"
// // // // // // //                 onClick={completeChecking}
// // // // // // //                 sx={{ mt: 2 }}
// // // // // // //               >
// // // // // // //                 Завершить проверку
// // // // // // //               </Button>
// // // // // // //             </Box>
// // // // // // //           )}
// // // // // // //         </CardContent>
// // // // // // //       </Card>
// // // // // // //     </Box>
// // // // // // //   );
// // // // // // // };

// // // // // // export const DocumentPage = () => {
// // // // // //   const { id } = useParams();
// // // // // //   const [document, setDocument] = useState<any>(null);
// // // // // //   const [score, setScore] = useState<number | null>(null);
// // // // // //   const [isChecking, setIsChecking] = useState<boolean>(false);
// // // // // //   const [pdfFile, setPdfFile] = useState<string | null>(null);
// // // // // //   const [isLoading, setIsLoading] = useState(false);
// // // // // //   const [error, setError] = useState<string | null>(null);

// // // // // //   const navigate = useNavigate();
// // // // // //   const currentUser  = useSelector((state: any) => state.user);

// // // // // //   const getDocumentPdfBase64 = async (documentId: number) => {
// // // // // //     const response = await fetch(`/api/documents/pdf/${documentId}`);
// // // // // //     if (!response.ok) throw new Error("Не удалось загрузить PDF");
// // // // // //     return await response.json(); // вернет объект с fileData и fileName
// // // // // //   };

// // // // // //   useEffect(() => {
// // // // // //     if (!id || isNaN(Number(id))) {
// // // // // //       console.error("Некорректный ID документа:", id);
// // // // // //       navigate("/rating/docs");
// // // // // //       return;
// // // // // //     }

// // // // // //     const fetchDocument = async () => {
// // // // // //       try {
// // // // // //         const pdfResponse = await getDocumentPdfBase64(Number(id));
// // // // // //         const fileUrl = `data:${pdfResponse.mimeType};base64,${pdfResponse.fileData}`;
// // // // // //         setPdfFile(fileUrl);
// // // // // //       } catch (error) {
// // // // // //         console.error("Ошибка при загрузке документа:", error);
// // // // // //         setError("Ошибка при загрузке документа.");
// // // // // //       }
// // // // // //     };

// // // // // //     fetchDocument();
// // // // // //   }, [id, navigate]);

// // // // // //   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //     const file = event.target.files?.[0];
// // // // // //     if (!file) {
// // // // // //       setError("Файл не выбран.");
// // // // // //       return;
// // // // // //     }

// // // // // //     if (file.type !== "application/pdf") {
// // // // // //       setError("Выбранный файл не является PDF.");
// // // // // //       return;
// // // // // //     }

// // // // // //     setIsLoading(true);
// // // // // //     setError(null);
// // // // // //     const fileUrl = URL.createObjectURL(file);
// // // // // //     setPdfFile(fileUrl);
// // // // // //     setIsLoading(false);
// // // // // //   };

// // // // // //   const isDocumentOnReview = document?.status?.id === 5;
// // // // // //   const isCurrentUserReviewer = document?.employeeId === currentUser .id;

// // // // // //   if (isDocumentOnReview && !isCurrentUserReviewer) {
// // // // // //     return (
// // // // // //       <Box p={4}>
// // // // // //         <Typography variant="h6" color="error">
// // // // // //           У вас нет прав для взаимодействия с этим документом.
// // // // // //         </Typography>
// // // // // //       </Box>
// // // // // //     );
// // // // // //   }

// // // // // //   const startChecking = () => {
// // // // // //     setIsChecking(true);
// // // // // //   };

// // // // // //   const completeChecking = async () => {
// // // // // //     if (!score) {
// // // // // //       alert("Пожалуйста, укажите оценку.");
// // // // // //       return;
// // // // // //     }

// // // // // //     try {
// // // // // //       const payload = {
// // // // // //         StatusId: 6,
// // // // // //         EmployeeId: currentUser .id,
// // // // // //         Score: score,
// // // // // //       };

// // // // // //       await updateDocumentStatus(document.documentId, payload);
// // // // // //       alert("Документ успешно проверен!");
// // // // // //       navigate("/rating/docs");
// // // // // //     } catch (error) {
// // // // // //       console.error("Ошибка при обновлении статуса документа:", error);
// // // // // //       alert("Произошла ошибка при обновлении статуса документа.");
// // // // // //     }
// // // // // //   };

// // // // // //   return (
// // // // // //     <Box p={4}>
// // // // // //       <Card>
// // // // // //         <CardContent>
// // // // // //           <Typography variant="h4" gutterBottom>
// // // // // //             Документ
// // // // // //           </Typography>
// // // // // //           <Typography variant="body1">
// // // // // //             <strong>ID:</strong> {document?.documentId}
// // // // // //           </Typography>
// // // // // //           <Typography variant="body1">
// // // // // //             <strong>Статус:</strong> {document?.status?.name}
// // // // // //           </Typography>
// // // // // //           <Typography variant="body1">
// // // // // //             <strong>Тип документа:</strong> {document?.documentType?.name || "Не указан"}
// // // // // //           </Typography>
// // // // // //           <Typography variant="body1">
// // // // // //             <strong>Дата загрузки:</strong> {new Date(document?.downloadDate).toLocaleDateString()}
// // // // // //           </Typography>

// // // // // //           <Box mt={4}>
// // // // // //             <Typography variant="h5" gutterBottom>
// // // // // //               Загрузите PDF для предпросмотра
// // // // // //             </Typography>
// // // // // //             <Button variant="contained" component="label" sx={{ mb: 2 }}>
// // // // // //               Загрузить PDF
// // // // // //               <input type="file" hidden accept="application/pdf" onChange={handleFileUpload} />
// // // // // //             </Button>

// // // // // //             {error && (
// // // // // //               <Typography color="error" sx={{ mt: 2 }}>
// // // // // //                 {error}
// // // // // //               </Typography>
// // // // // //             )}

// // // // // //             {isLoading && (
// // // // // //               <Box display="flex" justifyContent="center" alignItems="center" height="100px">
// // // // // //                 <CircularProgress />
// // // // // //                 <Typography variant="body1" ml={2}>
// // // // // //                   Загрузка PDF...
// // // // // //                 </Typography>
// // // // // //               </Box>
// // // // // //             )}

// // // // // //             {pdfFile ? (
// // // // // //               <Box mt={4}>
// // // // // //                 <Typography variant="h5" gutterBottom>
// // // // // //                   Предпросмотр документа
// // // // // //                 </Typography>
// // // // // //                 <iframe
// // // // // //                   src={pdfFile}
// // // // // //                   title="PDF Preview"
// // // // // //                   width="100%"
// // // // // //                   height="600px"
// // // // // //                   style={{ border: "1px solid #ccc" }}
// // // // // //                 />
// // // // // //               </Box>
// // // // // //             ) : (
// // // // // //               <Typography>Документ не найден или не загружен</Typography>
// // // // // //             )}
// // // // // //           </Box>

// // // // // //           {!isDocumentOnReview && (
// // // // // //             <Button
// // // // // //               variant="contained"
// // // // // //               color="primary"
// // // // // //               onClick={startChecking}
// // // // // //               disabled={isChecking}
// // // // // //               sx={{ mt: 2 }}
// // // // // //             >
// // // // // //               Начать проверку
// // // // // //             </Button>
// // // // // //           )}

// // // // // //           {isChecking && (
// // // // // //             <Box mt={4}>
// // // // // //               <Typography variant="h5" gutterBottom>
// // // // // //                 Проверка документа
// // // // // //               </Typography>
// // // // // //               <TextField
// // // // // //                 label="Оценка"
// // // // // //                 type="number"
// // // // // //                 value={score || ""}
// // // // // //                 onChange={(e) => setScore(Number(e.target.value))}
// // // // // //                 placeholder="Введите оценку"
// // // // // //                 fullWidth
// // // // // //                 margin="normal"
// // // // // //               />
// // // // // //               <Button
// // // // // //                 variant="contained"
// // // // // //                 color="success"
// // // // // //                 onClick={completeChecking}
// // // // // //                 sx={{ mt: 2 }}
// // // // // //               >
// // // // // //                 Завершить проверку
// // // // // //               </Button>
// // // // // //             </Box>
// // // // // //           )}
// // // // // //         </CardContent>
// // // // // //       </Card>
// // // // // //     </Box>
// // // // // //   );
// // // // // // };


// // export const DocumentPage = () => {
// //   const { id } = useParams();
// //   const [document, setDocument] = useState<any>(null);
// //   const [score, setScore] = useState<number | null>(null);
// //   const [isChecking, setIsChecking] = useState<boolean>(false);
// //   const [pdfFile, setPdfFile] = useState<string | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState<string | null>(null);

// //   const navigate = useNavigate();
// //   const currentUser  = useSelector((state: any) => state.user);

// //   const getDocumentPdfBase64 = async (documentId: number) => {
// //     const response = await fetch(`/api/documents/pdf/${documentId}`);
// //     if (!response.ok) throw new Error("Не удалось загрузить PDF");
// //     return await response.json(); // вернет объект с fileData и fileName
// //   };

// //   useEffect(() => {
// //     if (!id || isNaN(Number(id))) {
// //       console.error("Некорректный ID документа:", id);
// //       navigate("/rating/docs");
// //       return;
// //     }

// //     const fetchDocument = async () => {
// //       try {
// //         const pdfResponse = await getDocumentPdfBase64(Number(id));
// //         const fileUrl = `data:${pdfResponse.mimeType};base64,${pdfResponse.fileData}`;
// //         setPdfFile(fileUrl);
// //         setDocument(pdfResponse.document); // Предполагается, что документ также возвращается
// //       } catch (error) {
// //         console.error("Ошибка при загрузке документа:", error);
// //         setError("Ошибка при загрузке документа.");
// //       }
// //     };

// //     fetchDocument();
// //   }, [id, navigate]);

// //   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = event.target.files?.[0];
// //     if (!file) {
// //       setError("Файл не выбран.");
// //       return;
// //     }

// //     if (file.type !== "application/pdf") {
// //       setError("Выбранный файл не является PDF.");
// //       return;
// //     }

// //     setIsLoading(true);
// //     setError(null);
// //     const fileUrl = URL.createObjectURL(file);
// //     setPdfFile(fileUrl);
// //     setIsLoading(false);
// //   };

// //   const isDocumentOnReview = document?.status?.id === 5;
// //   const isCurrentUserReviewer = document?.employeeId === currentUser .id;

// //   if (isDocumentOnReview && !isCurrentUserReviewer) {
// //     return (
// //       <Box p={4}>
// //         <Typography variant="h6" color="error">
// //           У вас нет прав для взаимодействия с этим документом.
// //         </Typography>
// //       </Box>
// //     );
// //   }

// //   const startChecking = () => {
// //     setIsChecking(true);
// //   };

// //   const completeChecking = async () => {
// //     if (!score) {
// //       alert("Пожалуйста, укажите оценку.");
// //       return;
// //     }

// //     try {
// //       const payload = {
// //         StatusId: 6,
// //         EmployeeId: currentUser .id,
// //         Score: score,
// //       };

// //       await updateDocumentStatus(document.documentId, payload);
// //       alert("Документ успешно проверен!");
// //       navigate("/rating/docs");
// //     } catch (error) {
// //       console.error("Ошибка при обновлении статуса документа:", error);
// //       alert("Произошла ошибка при обновлении статуса документа.");
// //     }
// //   };

// //   return (
// //     <Box p={4}>
// //       <Card>
// //         <CardContent>
// //           <Typography variant="h4" gutterBottom>
// //             Документ
// //           </Typography>
// //           <Typography variant="body1">
// //             <strong>ID:</strong> {document?.documentId}
// //           </Typography>
// //           <Typography variant="body1">
// //             <strong>Статус:</strong> {document?.status?.name}
// //           </Typography>
// //           <Typography variant="body1">
// //             <strong>Тип документа:</strong> {document?.documentType?.name || "Не указан"}
// //           </Typography>
// //           <Typography variant="body1">
// //             <strong>Дата загрузки:</strong> {new Date(document?.downloadDate).toLocaleDateString()}
// //           </Typography>

// //           <Box mt={4}>
// //             <Typography variant="h5" gutterBottom>
// //               Загрузите PDF для предпросмотра
// //             </Typography>
// //             <Button variant="contained" component="label" sx={{ mb: 2 }}>
// //               Загрузить PDF
// //               <input type="file" hidden accept="application/pdf" onChange={handleFileUpload} />
// //             </Button>

// //             {error && (
// //               <Typography color="error" sx={{ mt: 2 }}>
// //                 {error}
// //               </Typography>
// //             )}

// //             {isLoading && (
// //               <Box display="flex" justifyContent="center" alignItems="center" height="100px">
// //                 <CircularProgress />
// //                 <Typography variant="body1" ml={2}>
// //                   Загрузка PDF...
// //                 </Typography>
// //               </Box>
// //             )}

// //             {pdfFile ? (
// //               <Box mt={4}>
// //                 <Typography variant="h5" gutterBottom>
// //                   Предпросмотр документа
// //                 </Typography>
// //                 <iframe
// //                   src={pdfFile}
// //                   title="PDF Preview"
// //                   width="100%"
// //                   height="600px"
// //                   style={{ border: "1px solid #ccc" }}
// //                 />
// //               </Box>
// //             ) : (
// //               <Typography>Документ не найден или не загружен</Typography>
// //             )}
// //           </Box>

// //           {!isDocumentOnReview && (
// //             <Button
// //               variant="contained"
// //               color="primary"
// //               onClick={startChecking}
// //               disabled={isChecking}
// //               sx={{ mt: 2 }}
// //             >
// //               Начать проверку
// //             </Button>
// //           )}

// //           {isChecking && (
// //             <Box mt={4}>
// //               <Typography variant="h5" gutterBottom>
// //                 Проверка документа
// //               </Typography>
// //               <TextField
// //                 label="Оценка"
// //                 type="number"
// //                 value={score || ""}
// //                 onChange={(e) => setScore(Number(e.target.value))}
// //                 placeholder="Введите оценку"
// //                 fullWidth
// //                 margin="normal"
// //               />
// //               <Button
// //                 variant="contained"
// //                 color="success"
// //                 onClick={completeChecking}
// //                 sx={{ mt: 2 }}
// //               >
// //                 Завершить проверку
// //               </Button>
// //             </Box>
// //           )}
// //         </CardContent>
// //       </Card>
// //     </Box>
// //   );
// // };

// // import '@react-pdf-viewer/core/lib/styles/index.css';
// // import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// // import React, { useEffect, useState } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import { useSelector } from "react-redux";
// // import {
// //   Box,
// //   Card,
// //   CardContent,
// //   CircularProgress,
// //   Typography,
// // } from "@mui/material";
// // import { Viewer, Worker } from '@react-pdf-viewer/core';
// // import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// // import '@react-pdf-viewer/core/lib/styles/index.css';
// // import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// // // Подставь свой API URL из .env
// // const API_URL = 'http://localhost:7003';

// // export const DocumentPage = () => {
// //   const { id } = useParams<{ id: string }>();
// //   const [document, setDocument] = useState<any>(null);
// //   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   const navigate = useNavigate();
// //   const defaultLayoutPluginInstance = defaultLayoutPlugin();

// //   useEffect(() => {
// //     if (!id || isNaN(Number(id))) {
// //       navigate("/rating/docs");
// //       return;
// //     }

// //     const fetchDocumentAndPDF = async () => {
// //       try {
// //         // Загружаем данные документа
// //         const docResponse = await axios.get(`${API_URL}/api/documents/doc/${id}`);
// //         setDocument(docResponse.data);

// //         // Получаем PDF как blob
// //         const pdfResponse = await axios.get(`${API_URL}/api/documents/download/${id}`, {
// //           responseType: 'blob', // Важно!
// //         });

// //         const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });
// //         const url = URL.createObjectURL(blob);
// //         setPdfUrl(url);
// //       } catch (err: any) {
// //         console.error("Ошибка загрузки:", err);
// //         setError(
// //           err.response?.data?.message ||
// //           err.message ||
// //           "Не удалось загрузить документ"
// //         );
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };

// //     fetchDocumentAndPDF();

// //     return () => {
// //       if (pdfUrl) URL.revokeObjectURL(pdfUrl); // Очистка
// //     };
// //   }, [id]);

// //   if (isLoading) {
// //     return (
// //       <Box display="flex" justifyContent="center" p={4}>
// //         <CircularProgress />
// //       </Box>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Box p={4}>
// //         <Typography color="error">Ошибка: {error}</Typography>
// //       </Box>
// //     );
// //   }

// //   return (
// //     <Box p={4}>
// //       <Card>
// //         <CardContent>
// //           <Typography variant="h5" gutterBottom>
// //             {document?.name || "Документ"}
// //           </Typography>

// //           {pdfUrl ? (
// //             <Box mt={4} sx={{ height: '750px' }}>
// //               <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"> 
// //                 <Viewer
// //                   fileUrl={pdfUrl}
// //                   plugins={[defaultLayoutPluginInstance]}
// //                 />
// //               </Worker>
// //             </Box>
// //           ) : (
// //             <Typography>Файл недоступен</Typography>
// //           )}
// //         </CardContent>
// //       </Card>
// //     </Box>
// //   );
// // };
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useSelector } from 'react-redux';
// import {
//   Box,
//   Card,
//   CardContent,
//   CircularProgress,
//   Typography,
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
// } from '@mui/material';
// import { Viewer, Worker } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import { getAllCritea, getAlldocumentTypes } from '../../../api/api-utils';

// // Подставь свой API URL из .env
// const API_URL = 'http://localhost:7003';

// export const DocumentPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const [document, setDocument] = useState<any>(null);
//   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isChecking, setIsChecking] = useState(false);
//   const [score, setScore] = useState<number | null>(null);
//   const [selectedDocType, setSelectedDocType] = useState<number | ''>('');
//   const [selectedCriterion, setSelectedCriterion] = useState<number | ''>('');
//   const [docTypes, setDocTypes] = useState<any[]>([]);
//   const [criteria, setCriteria] = useState<any[]>([]);

//   const navigate = useNavigate();
//   const currentUser = useSelector((state: any) => state.user);
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   // Получение данных документа и PDF
//   // useEffect(() => {
//   //   if (!id || isNaN(Number(id))) {
//   //     navigate('/rating/docs');
//   //     return;
//   //   }

//   //   const fetchDocumentAndPDF = async () => {
//   //     try {
//   //       const docResponse = await axios.get(`${API_URL}/api/documents/doc/${id}`);
//   //       setDocument(docResponse.data);

//   //       const pdfResponse = await axios.get(`${API_URL}/api/documents/download/${id}`, {
//   //         responseType: 'blob',
//   //       });

//   //       const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });
//   //       const url = URL.createObjectURL(blob);
//   //       setPdfUrl(url);
//   //     } catch (err: any) {
//   //       console.error('Ошибка загрузки:', err);
//   //       setError(
//   //         err.response?.data?.message ||
//   //         err.message ||
//   //         'Не удалось загрузить документ'
//   //       );
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   };

//   //   const fetchAdditionalData = async () => {
//   //     try {
//   //       const [typesRes, criteriaRes] = await Promise.all([
//   //         axios.get(`${API_URL}/api/document-types`),
//   //         axios.get(`${API_URL}/api/criteria`),
//   //       ]);
//   //       setDocTypes(typesRes.data);
//   //       setCriteria(criteriaRes.data);
//   //     } catch (err) {
//   //       console.error('Ошибка загрузки справочников', err);
//   //     }
//   //   };

//   //   fetchDocumentAndPDF();
//   //   fetchAdditionalData();

//   //   return () => {
//   //     if (pdfUrl) URL.revokeObjectURL(pdfUrl);
//   //   };
//   // }, [id]);

//   useEffect(() => {
//   if (!id || isNaN(Number(id))) {
//     navigate('/rating/docs');
//     return;
//   }

//   const fetchDocumentAndPDF = async () => {
//     try {
//       const docResponse = await axios.get(`${API_URL}/api/documents/doc/${id}`);
//       setDocument(docResponse.data);

//       const pdfResponse = await axios.get(`${API_URL}/api/documents/download/${id}`, {
//         responseType: 'blob',
//       });

//       const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });
//       const url = URL.createObjectURL(blob);
//       setPdfUrl(url);
//     } catch (err: any) {
//       console.error('Ошибка загрузки:', err);
//       setError(
//         err.response?.data?.message ||
//         err.message ||
//         'Не удалось загрузить документ'
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchAdditionalData = async () => {
//     try {
//       const [typesRes, criteriaRes] = await Promise.all([
//         getAlldocumentTypes(),
//         getAllCritea(),
//       ]);

//       // Если возвращается полный response — раскомментируй следующую строку
//       setDocTypes(typesRes.data);
//       setCriteria(criteriaRes.data);

//       // Если возвращается сразу data — оставь так:
//       // setDocTypes(typesRes);
//       // setCriteria(criteriaRes);
//     } catch (err) {
//       console.error('Ошибка при загрузке справочников', err);
//     }
//   };

//   fetchDocumentAndPDF();
//   fetchAdditionalData();

//   return () => {
//     if (pdfUrl) URL.revokeObjectURL(pdfUrl);
//   };
// }, [id]);

//   const isDocumentOnReview = document?.status?.id === 5;
//   const isCurrentUserReviewer = document?.employeeId === currentUser.id;

//   if (isLoading) {
//     return (
//       <Box display="flex" justifyContent="center" p={4}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box p={4}>
//         <Typography color="error">Ошибка: {error}</Typography>
//       </Box>
//     );
//   }

//   const startChecking = () => {
//     setIsChecking(true);
//   };

//   // const completeChecking = async () => {
//   //   if (!score || !selectedDocType || !selectedCriterion) {
//   //     alert('Пожалуйста, заполните все поля.');
//   //     return;
//   //   }

//   //   try {
//   //     const payload = {
//   //       StatusId: 6,
//   //       EmployeeId: currentUser.id,
//   //       Score: score,
//   //       DocumentTypeId: selectedDocType,
//   //       CriterionId: selectedCriterion,
//   //     };

//   //     await axios.put(`${API_URL}/api/documents/update/${id}`, payload);
//   //     alert('Документ успешно проверен!');
//   //     navigate('/rating/docs');
//   //   } catch (error) {
//   //     console.error('Ошибка при обновлении статуса документа:', error);
//   //     alert('Произошла ошибка при обновлении статуса документа.');
//   //   }
//   // };

//   const completeChecking = async () => {
//   if (!selectedDocType) {
//     alert('Выберите тип документа.');
//     return;
//   }

//   if (!selectedCriterion) {
//     alert('Выберите критерий.');
//     return;
//   }

//   if (!score && score !== 0) {
//     alert('Введите оценку.');
//     return;
//   }

//   // Находим выбранный критерий по ID
//   const selectedCrit = criteria.find((crit) => crit.id === selectedCriterion);

//   if (!selectedCrit) {
//     alert('Критерий не найден.');
//     return;
//   }

//   const { max_score } = selectedCrit;

//   if (score > max_score) {
//     alert(`Оценка не может быть больше ${max_score}.`);
//     return;
//   }

//   try {
//     const payload = {
//       StatusId: 6,
//       EmployeeId: currentUser.id,
//       Score: score,
//       DocumentTypeId: selectedDocType,
//       CriterionId: selectedCriterion,
//     };

//     await axios.put(`${API_URL}/api/documents/update/${id}`, payload);
//     alert('Документ успешно проверен!');
//     navigate('/rating/docs');
//   } catch (error) {
//     console.error('Ошибка при обновлении статуса документа:', error);
//     alert('Произошла ошибка при обновлении статуса документа.');
//   }
// };


//   return (
//     <Box p={4}>
//       <Card>
//         <CardContent>
//           <Typography variant="h5" gutterBottom>
//             {document?.name || 'Документ'}
//           </Typography>

//           <Typography variant="body1">
//             <strong>ID:</strong> {document?.documentId}
//           </Typography>
//           <Typography variant="body1">
//             <strong>Статус:</strong> {document?.status?.name}
//           </Typography>
//           <Typography variant="body1">
//             <strong>Дата загрузки:</strong>{' '}
//             {new Date(document?.downloadDate).toLocaleDateString()}
//           </Typography>

//           {pdfUrl && 
//             <Box mt={4} sx={{ height: '750px' }}>
//               <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"> 
//                 <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
//               </Worker>
//             </Box>
//           }

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

//               <FormControl fullWidth margin="normal">
//                 <InputLabel id="doc-type-label">Тип документа</InputLabel>
//                 <Select
//                   labelId="doc-type-label"
//                   value={selectedDocType}
//                   onChange={(e) => setSelectedDocType(e.target.value as number)}
//                   label="Тип документа"
//                 >
//                   {docTypes.map((type) => (
//                     <MenuItem key={type.id} value={type.id}>
//                       {type.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl fullWidth margin="normal">
//                 <InputLabel id="criterion-label">Критерий</InputLabel>
//                 <Select
//                   labelId="criterion-label"
//                   value={selectedCriterion}
//                   onChange={(e) => setSelectedCriterion(e.target.value as number)}
//                   label="Критерий"
//                 >
//                   {criteria.map((crit) => (
//                     <MenuItem key={crit.id} value={crit.id}>
//                       {crit.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               {/* <TextField
//                 label="Оценка"
//                 type="number"
//                 value={score ?? ''}
//                 onChange={(e) => setScore(Number(e.target.value))}
//                 placeholder="Введите оценку"
//                 fullWidth
//                 margin="normal"
//               /> */}
// <TextField
//   label="Оценка"
//   type="number"
//   value={score ?? ''}
//   onChange={(e) => setScore(Number(e.target.value))}
//   placeholder="Введите оценку"
//   fullWidth
//   margin="normal"
//   helperText={
//     selectedCriterion && selectedCrit
//       ? `Максимум: ${selectedCrit.max_score}`
//       : 'Выберите критерий'
//   }
//   error={!!selectedCriterion && score > selectedCrit?.max_score}
// />

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
import styles from "./DocumentPage.module.scss"
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { getAllCritea, getAlldocumentTypes } from '../../../api/api-utils';
import { Criterion, Document, DocumentType } from '../../../models';

// Подставь свой API URL из .env
const API_URL = 'http://localhost:7003';

export const DocumentPage = () => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<Document>();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [selectedDocType, setSelectedDocType] = useState<number | ''>('');
  const [selectedCriterion, setSelectedCriterion] = useState<number | ''>('');
  const [docTypes, setDocTypes] = useState<DocumentType[]>([]);
  const [criteria, setCriteria] = useState<Criterion[]>([]);

  const navigate = useNavigate();
  const currentUser = useSelector((state: any) => state.user);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // Получение данных документа и PDF
  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      navigate('/rating/docs');
      return;
    }

    const fetchDocumentAndPDF = async () => {
      try {
        const docResponse = await axios.get(`${API_URL}/api/documents/doc/${id}`);
        setDocument(docResponse.data);

        const pdfResponse = await axios.get(`${API_URL}/api/documents/download/${id}`, {
          responseType: 'blob',
        });

        const blob = new Blob([pdfResponse.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err: any) {
        console.error('Ошибка загрузки:', err);
        setError(
          err.response?.data?.message ||
          err.message ||
          'Не удалось загрузить документ'
        );
      } finally {
        setIsLoading(false);
      }
    };

    const fetchAdditionalData = async () => {
      try {
        const [typesRes, criteriaRes] = await Promise.all([
          getAlldocumentTypes(),
          getAllCritea(),
        ]);
console.table(typesRes.data);
console.table(criteriaRes.data);
        setDocTypes(typesRes.data || typesRes); // поддерживаем оба формата
        setCriteria(criteriaRes.data || criteriaRes);
      } catch (err) {
        console.error('Ошибка при загрузке справочников', err);
        setError('Не удалось загрузить справочники.');
      }
    };

    fetchDocumentAndPDF();
    fetchAdditionalData();

    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [id]);

  const isDocumentOnReview = document?.status?.statusId === 5;
  // const isCurrentUserReviewer = document?.employeeId === currentUser.id;

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Typography color="error">Ошибка: {error}</Typography>
      </Box>
    );
  }

  const startChecking = () => {
    setIsChecking(true);

    // Установить предыдущие значения, если они были
    if (document?.documentTypeId) setSelectedDocType(document.documentTypeId);
    if (document?.criteria?.criteriaId) setSelectedCriterion(document.criteria.criteriaId);
    if (document?.score) setScore(document.score);

async function SendOnCheck() {
  
    try {
      const payload = {
        StatusId: 5, // на проверке
        EmployeeId: currentUser.id,
//          public int StatusId { get; set; }
//  public int? CriteriaId { get; set; }
//  public int? EmployeeId { get; set; }
//  public int? DocumentTypeId { get; set; }
//  public int? Score { get; set; }
      };

// console.log(      JSON.stringify(payload));
      await axios.put(`${API_URL}/api/documents/update-status/${id}`, payload);
    } catch (error) {
      console.error('Ошибка при обновлении статуса документа:', error);
      navigate('/rating/docs');
      alert('Произошла ошибка при обновлении статуса документа.');
      return;
    }
  }
  
SendOnCheck() ;
  };

  const completeChecking = async () => {
    if (!selectedDocType) {
      alert('Выберите тип документа.');
      return;
    }

    if (!selectedCriterion) {
      alert('Выберите критерий.');
      return;
    }

    if (!score && score !== 0) {
      alert('Введите оценку.');
      return;
    }

    const selectedCrit = criteria.find((crit) => crit.criteriaId === selectedCriterion);
    if (!selectedCrit) {
      alert('Критерий не найден.');
      return;
    }

    const { maxScore } = selectedCrit;

    if (score > maxScore) {
      alert(`Оценка не может быть больше ${maxScore}.`);
      return;
    }

    try {
      const payload = {
        StatusId: 3, // проверен
        EmployeeId: currentUser.id,
        Score: score,
        DocumentTypeId: selectedDocType,
        CriteriaId: selectedCriterion,

//          public int StatusId { get; set; }
//  public int? CriteriaId { get; set; }
//  public int? EmployeeId { get; set; }
//  public int? DocumentTypeId { get; set; }
//  public int? Score { get; set; }
      };

// console.log(      JSON.stringify(payload));
      await axios.put(`${API_URL}/api/documents/update-status/${id}`, payload);
      alert('Документ успешно проверен!');
      navigate('/rating/docs');
    } catch (error) {
      console.error('Ошибка при обновлении статуса документа:', error);
      alert('Произошла ошибка при обновлении статуса документа.');
    }
  };

const handleSendForChanges = async () => {
if (!window.confirm('Вы уверены, что хотите отправить документ на изменения?')) {
    return;
  }

  try {
    const payload = {
      StatusId: 4, // статус "На изменения"
      EmployeeId: currentUser.id,
    };

    await axios.put(`${API_URL}/api/documents/update-status/${id}`, payload);
    alert('Документ успешно отправлен на изменения');
    navigate('/rating/docs');
  } catch (error) {
    console.error('Ошибка при отправке документа на изменения:', error);
    alert('Не удалось отправить документ на изменения');
  }
}

  return (
    <Box p={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {document?.filePath?getFileName(document?.filePath): 'Документ'}
          </Typography>

          <Typography variant="body1">
            <strong>ID:</strong> {document?.documentId}
          </Typography>
          <Typography variant="body1">
            <strong>Статус:</strong> {document?.status?.name}
          </Typography>
          <Typography variant="body1">
  <strong>Проверяющий:</strong>{' '}
  {document?.employee ? `${document.employee.lastname} ${document.employee.firstname}` : <NotSelectComponent/>}
</Typography>
          <Typography variant="body1">
            <strong>Дата загрузки:</strong>{' '}
            {new Date(document?.downloadDate.toString()||"").toLocaleDateString()}
          </Typography>

          
          <Typography variant="body1">
            <strong>Кол-во баллов:</strong>{' '}
  {document?.score ? document.score : 0}
          </Typography>
          
          <Typography variant="body1">
            <strong>Критерий:</strong>{' '}
  {document?.criteria?.name? document.criteria.name : <NotSelectComponent/>}
          </Typography>

          <Typography variant="body1">
            <strong>Тип документа:</strong>{' '}
  {document?.documentType?.name ? document?.documentType?.name: <NotSelectComponent/>}
          </Typography>

          {pdfUrl && (
            <Box mt={4} sx={{ height: '750px' }}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js"> 
                <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
              </Worker>
            </Box>
          )}

          
            {/* <Button
              variant="contained"
              color="primary"
              onClick={startChecking}
              disabled={isChecking}
              sx={{ mt: 2 }}
            >
              {isDocumentOnReview?"Начать перепроверку":"Начать проверку"}
            </Button> */}
          <Button
  variant="contained"
  color="primary"
  onClick={startChecking}
  disabled={isChecking}
  sx={{ mt: 2, mr: 2 }} // mr: отступ справа
>
  {isDocumentOnReview ? "Начать перепроверку" : "Начать проверку"}
</Button>

<Button
  variant="contained"
  color="error" // красная кнопка
  onClick={handleSendForChanges}
  disabled={document?.status.statusId?document?.status.statusId==4:false } // на изменении
  sx={{ mt: 2 }}
>
  Отправить на изменения
</Button>
          
          
          

          {isChecking && (
            <Box mt={4}>
              <Typography variant="h5" gutterBottom>
                Проверка документа
              </Typography>

              <FormControl fullWidth margin="normal">
                <InputLabel id="doc-type-label">Тип документа</InputLabel>
                <Select
                  labelId="doc-type-label"
                  value={selectedDocType}
                  onChange={(e) => setSelectedDocType(e.target.value as number)}
                  label="Тип документа"
                >
                  {docTypes.length === 0 && (
                    <MenuItem disabled>Нет доступных типов</MenuItem>
                  )}
                  {docTypes.map((type) => (
                    <MenuItem key={type.documentTypeId} value={type.documentTypeId}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth margin="normal">
                <InputLabel id="criterion-label">Критерий</InputLabel>
                <Select
                  labelId="criterion-label"
                  value={selectedCriterion}
                  onChange={(e) => setSelectedCriterion(e.target.value as number)}
                  label="Критерий"
                >
                  {criteria.length === 0 && (
                    <MenuItem disabled>Нет доступных критериев</MenuItem>
                  )}
                  {criteria.map((crit) => (
                    <MenuItem key={crit.criteriaId} value={crit.criteriaId}>
                      {crit.name} (макс. {crit.maxScore})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Оценка"
                type="number"
                value={score ?? ''}
                onChange={(e) => setScore(Number(e.target.value))}
                placeholder="Введите оценку"
                fullWidth
                margin="normal"
                helperText={
                  selectedCriterion
                    ? `Максимум: ${
                        criteria.find((c) => c.criteriaId === selectedCriterion)?.maxScore || 0
                      }`
                    : 'Выберите критерий'
                }
                error={!!selectedCriterion && typeof score === 'number' && !!criteria.find(c => c.criteriaId === selectedCriterion) && score > (criteria.find(c => c.criteriaId === selectedCriterion)?.maxScore ?? 0)}
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

const NotSelectComponent = () => {
  return <span className={styles.NonSelect}>Не указан</span>
}

function getFileName(path:string):string {
  const parts = path.split('\\'); // Разделяем по обратным слешам
  return parts[parts.length - 1];  // Возвращаем последнюю часть
}

