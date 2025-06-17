import { FC, useEffect, useState } from "react"
import { deleteDocument, getUserDocuments, updateDocument } from "../../api/api-utils";
import { Document } from "../../models";
import styles from "./DocumentsTable.module.scss"

interface DocumentsTableProps {
  id: number,
}

export const DocumentsTable: FC<DocumentsTableProps> = ({ id }) => {
  const [Docs, setDocs] = useState<Document[]>();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);
  const token = localStorage.getItem('token');  // Убедитесь, что вы получили токен после входа


  useEffect(() => {
    FetchData();
  }, [])


  const DeleteDocument = (docId: number) => {
    setSelectedDocumentId(docId);
    setIsDeletePopupOpen(true);
  }

  const EditDocument = (docId: number) => {
    setSelectedDocumentId(docId);
    setIsPopupOpen(true);
  }




  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get('file') as File;

    if (file && selectedDocumentId && token) {
      await updateDocument(token, selectedDocumentId, formData);
    }
  }

  const handleConfirmDelete = async () => {
    if (selectedDocumentId && token) {
      deleteDocument(token, selectedDocumentId);
      setIsDeletePopupOpen(false);
      setSelectedDocumentId(null);
      // Обновить список документов
      FetchData();
    }
  }


  const FetchData = async () => {
    if (token) {
      const docs = await getUserDocuments(token, id);

      setDocs(docs.data);
    }
  }

  return (
    <div className={styles.table__container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              ID

            </th>
            <th> Критерий </th>
            <th> Критерий. Max </th>
            <th> Тип  </th>
            <th> Проверяющий </th>
            <th> Статус </th>
            <th> Дата загрузки </th>
            <th> Кол-во баллов </th>
            <th> Название документа </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {Docs && Docs.map((document, index) =>
            <tr key={index + 1}>
              <td> {index + 1}</td>
              <td> {document.criteria?.name}</td>
              <td> {document.criteria?.maxScore}</td>
              <td> {document.documentType?.name}</td>
              <td> {document.employee?.lastname && document.employee?.firstname && `${document.employee?.lastname} ${document.employee?.firstname}`}</td>
              <td> {document.status.name}</td>
              <td> {new Date(document.downloadDate).toLocaleString()}</td>
              <td> {document.score}</td>
              <td> {document.filePath.replace("UploadedFiles\\1\\", "")}</td>
              <td>
                <button onClick={() => EditDocument(document.documentId)}>
                  <img src="/icons/pencil.svg" alt="Edit" />
                </button>
                <button onClick={() => DeleteDocument(document.documentId)}>
                  <img src="/icons/trash.svg" alt="Delete" />
                </button>
              </td>
            </tr>




          )
          }

        </tbody>
      </table>
      {isPopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h2>Редактировать документ</h2>
            <form onSubmit={handleSave}>
              <label htmlFor="file">Загрузить новый файл:</label>
              <input type="file" id="file" name="file" required />
              <div className={styles.popupButtons}>
                <button type="submit">Сохранить</button>
                <button type="button" onClick={() => setIsPopupOpen(false)}>Отмена</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isDeletePopupOpen && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <h2>Удалить документ</h2>
            <p>Вы уверены, что хотите удалить этот документ?</p>
            <div className={styles.popupButtons}>
              <button onClick={handleConfirmDelete}>Да</button>
              <button onClick={() => setIsDeletePopupOpen(false)}>Нет</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}