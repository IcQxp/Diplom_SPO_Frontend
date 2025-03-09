import axios from "axios";
import { useEffect, useState } from "react"

export const FilesList = () => {
const [data,setData] = useState(); 
  useEffect(() => {

    const FetchData = async () => {


      const token = localStorage.getItem('token');  // Убедитесь, что вы получили токен после входа
      const response = await axios.get('https://localhost:7003/api/documents', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setData(response.data);
      console.log(response);
    }

      ;
    FetchData();
  }
    , []
  )

  return (
    <div>

    </div>
  )
}