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
// const API_URL = 'http://localhost:7003';
 const API_URL = "https://lyashovilyabackend.loca.lt";


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

        await axios.put(`${API_URL}/api/documents/update-status/${id}`, payload);
      } catch (error) {
        console.error('Ошибка при обновлении статуса документа:', error);
        navigate('/rating/docs');
        alert('Произошла ошибка при обновлении статуса документа.');
        return;
      }
    }

    SendOnCheck();
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
            {document?.filePath ? getFileName(document?.filePath) : 'Документ'}
          </Typography>

          <Typography variant="body1">
            <strong>ID:</strong> {document?.documentId}
          </Typography>
          <Typography variant="body1">
            <strong>Статус:</strong> {document?.status?.name}
          </Typography>
          <Typography variant="body1">
            <strong>Проверяющий:</strong>{' '}
            {document?.employee ? `${document.employee.lastname} ${document.employee.firstname}` : <NotSelectComponent />}
          </Typography>
          <Typography variant="body1">
            <strong>Дата загрузки:</strong>{' '}
            {new Date(document?.downloadDate.toString() || "").toLocaleDateString()}
          </Typography>


          <Typography variant="body1">
            <strong>Кол-во баллов:</strong>{' '}
            {document?.score ? document.score : 0}
          </Typography>

          <Typography variant="body1">
            <strong>Критерий:</strong>{' '}
            {document?.criteria?.name ? document.criteria.name : <NotSelectComponent />}
          </Typography>

          <Typography variant="body1">
            <strong>Тип документа:</strong>{' '}
            {document?.documentType?.name ? document?.documentType?.name : <NotSelectComponent />}
          </Typography>

          {pdfUrl && (
            <Box mt={4} sx={{ height: '750px' }}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
              </Worker>
            </Box>
          )}

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
            disabled={document?.status.statusId ? document?.status.statusId == 4 : false} // на изменении
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
                    ? `Максимум: ${criteria.find((c) => c.criteriaId === selectedCriterion)?.maxScore || 0
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

function getFileName(path: string): string {
  const parts = path.split('\\'); // Разделяем по обратным слешам
  return parts[parts.length - 1];  // Возвращаем последнюю часть
}

