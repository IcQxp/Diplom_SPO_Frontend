import { useState } from "react";
import { downloadDocument } from "../../api/api-utils";
import styles from "./FileUpload.module.scss"; // Импортируем стили
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const FileUpload = ({ onClose }: { onClose: () => void }) => {
  const user = useSelector((state: RootState) => state.user.userInfo);


  const token = localStorage.getItem("token");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (user) {

      if (!file) {
        alert("Please select a file first.");
        return;
      }
      
      const formData = new FormData();
      formData.append('file', file);
      formData.append('studentId', String(user.id)); // Добавляем studentId в FormData
      
      try {
      token && (await downloadDocument(token, formData));
      alert("File uploaded successfully!");
      onClose(); // Закрываем popup после успешной загрузки
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  }
  };

  return (
    <div className={styles.fileUploadContainer}>
      {/* Поле выбора файла */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className={styles.fileInput}
      />
      {/* Кнопка загрузки */}
      <button
        onClick={handleUpload}
        className={styles.uploadButton}
        disabled={!file} // Отключаем кнопку, если файл не выбран
      >
        Upload PDF
      </button>
    </div>
  );
};