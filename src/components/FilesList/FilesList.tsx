import axios from "axios";
import { useEffect, useState } from "react"
import { DocumentList } from "./FilesList.props";
import styles from "./FilesList.module.scss"

export const FilesList = () => {
const [data,setData] = useState<DocumentList[]>([]); 
const [status,setStatus] = useState<number>(0);
  useEffect(() => {

    const FetchData = async () => {


      const token = localStorage.getItem('token');  // Убедитесь, что вы получили токен после входа
      const response = await axios.get('https://localhost:7003/api/documents', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setData(response.data);
      setStatus(response.status);
      console.log(response);
    }

      ;
    FetchData();
  }
    , []
  )

  return (
    <main className={styles.page}>
      {data&&data.map(elem => <div key={elem.filePath}>
        <div> ID: {elem.documentId}</div>
        <div> File: {elem.filePath  }
          </div>
        </div>
        )}

        {status===500&&"Ошибка на сервере"}
        {status===403&&"Нет доступа"}

    </main>
  )
}