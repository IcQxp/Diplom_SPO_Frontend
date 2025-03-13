import { useEffect, useState } from "react"
import { DocumentList } from "./FilesList.props";
import styles from "./FilesList.module.scss"
import { getAllDocuments } from "../../api/api-utils";

export const FilesList = () => {
  const [data, setData] = useState<DocumentList[]>([]);
  useEffect(() => {
    const FetchData = async () => {
      const token = localStorage.getItem('token');  // Убедитесь, что вы получили токен после входа
      token && setData(await getAllDocuments(token));
    };
    FetchData();
  }, []);

  return (
    <main className={styles.page}>
      {data && data.map(elem => <div key={elem.filePath}>
        <div> ID: {elem.documentId}</div>
        <div> File: {elem.filePath}
        </div>
      </div>
      )}


    </main>
  )
}