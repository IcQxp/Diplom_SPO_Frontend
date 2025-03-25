
import { getAllCritea, getTopRatingWithCriteriaArray } from "../../api/api-utils";
import { Button } from "@mui/material";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { FC, useEffect, useState } from "react"
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import FileUpload from "../FileUpload/FileUpload";
// import FileDownload from "../FileDownload/FileDownload";
// import { GenderComponent } from "../Gender/Gender";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// import { FilesList } from "../FilesList/FilesList";
// import { ResponsiveRadar } from '@nivo/radar'
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss"
import { BarChart } from "@mui/icons-material"
import { Loading } from "../Loading/Loading";
import { News } from "../News/News";
import { Criterion } from "../../models";


interface DataItem {
  criteria: string; // Название критерия
  [key: string]: number | string; // Динамические ключи (имена студентов) с числовыми значениями
}

// Интерфейс для всего ответа
export interface ChartResponse {
  keys: Array<{ [key: string]: string }>; // Массив объектов с ключами-идентификаторами пользователей
  data: DataItem[]; // Массив объектов с данными
}

export const HomePage: FC = () => {
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // const [pdfFile, setPdfFile] = useState<string | null>(null);
  // const [pdfError, setPdfError] = useState<string>('');
const [loading,setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  // const allowedFiles = ['application/pdf'];
  // const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   let selectedFile = e.target.files?.[0];
  //   // console.log(selectedFile.type);
  //   if (selectedFile) {
  //     if (selectedFile && allowedFiles.includes(selectedFile.type)) {
  //       let reader = new FileReader();
  //       reader.readAsDataURL(selectedFile);
  //       reader.onloadend = (e) => {
  //         setPdfError('');
  //         setPdfFile(e.target?.result as string | null);
  //       }
  //     }
  //     else {
  //       setPdfError('Not a valid pdf: Please select only PDF');
  //       setPdfFile('');
  //     }
  //   }
  //   else {
  //     console.log('please select a PDF');
  //   }
  // }

  const [rating, setRating] = useState<ChartResponse>();


  useEffect(() => {
    const FD = async () => {
    try {
      const criteriaResponse:Criterion[] = (await getAllCritea()).data;
      const response = await getTopRatingWithCriteriaArray({count:3,criteriaIDs:criteriaResponse.map(item => item.criteriaId)});
      console.log(response);
      setRating(response.data);
  }
    catch (error) {
      console.warn("Ошибка при получении данных:", error);
    }
    finally  {
      setLoading(false);
    }
  }
    FD()
  }, [])

  const calculateRatings = () => {
    if (!rating) return [];

    const studentRatings: { name: string; totalScore: number }[] = [];

    // Извлечение имён студентов из keys
    const studentNames = Object.values(rating.keys).map((keyObj) => Object.values(keyObj)[0]);

    // Расчёт суммы баллов для каждого студента
    studentNames.forEach((studentName) => {
      const totalScore = rating.data.reduce((sum, dataItem) => {
        const score = dataItem[studentName];
        return sum + (typeof score === "number" ? score : 0);
      }, 0);

      studentRatings.push({ name: studentName, totalScore });
    });

    // Сортировка студентов по убыванию рейтинга
    return studentRatings.sort((a, b) => b.totalScore - a.totalScore);
  };

  const sortedStudents = calculateRatings();



  return (
    <div className={styles.container}>

{/*
      {rating && rating.data.map(elem => <div>{elem.country}
        <p>
          Сумма значений:{" "}
          {Object.entries(elem)
            .filter(([key]) => key !== "country") // Исключаем ключ "country"
            .reduce((sum, [, value]) => sum + Number(value), 0)} 
        </p>
      </div>
      )}
            */}
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

              <h2 className={styles.top__title}>
                Наши лучшие студенты
              </h2>
        {/* {loading? (
          <Loading size={20} type="rating-3"/>
        ):
        rating ? (
          rating.data
          
            .map((elem, index) => {
              var totalSum = Object.entries(elem)
              .filter(([key]) => key !== "country" && key !== "studentid") // Исключаем ключ "country"
              .reduce((sum, [, value]) => sum + Number(value), 0);

              return (
                <Link to={`/profile/${elem.studentid}`}
                  key={elem.criteria}
                  className={styles.link}
                  
                >
                  <h2 style={{ margin: 0, color: index === 0 ? "#ff9800" : "#333" }}>
                    #{index + 1} {elem.criteria}
                  </h2>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
                    Общее кол-во баллов: <strong>{totalSum}</strong>
                  </p>
                </Link>
              );
            })
          ):(<div>ПУСТО</div>)} */}
          {loading ? (
          <Loading size={20} type="rating-3" />
        ) : sortedStudents.length > 0 ? (
          sortedStudents.map(({ name, totalScore }, index) => (
            <Link to={`/profile/${index + 1}`} key={name} className={styles.link}>
              <h2 style={{ margin: 0, color: index === 0 ? "#ff9800" : "#333" }}>
                #{index + 1} {name}
              </h2>
              <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
                Общее кол-во баллов: <strong>{totalScore}</strong>
              </p>
            </Link>
          ))
        ) : (
          <div>ПУСТО</div>
        )}
      </div>
      <Button startIcon={<BarChart />} variant="contained" size="medium" onClick={() => { navigate("/rating") }} sx={{margin:"20px 40px"}}>
        Перейти к рейтингу
      </Button>

<News/>

{/* 
      <form>
        <label><h5>Upload PDF</h5></label>
        <br></br>
        <input type='file' className="form-control"
          onChange={handleFile}></input>
        
        {pdfError && <span className='text-danger'>{pdfError}</span>}
      </form>
      <h5>View PDF</h5>
      <div className="viewer">
        {pdfFile && (<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfFile}
            plugins={[defaultLayoutPluginInstance]}></Viewer>
        </Worker>
        )}
        {!pdfFile && <>No file is selected yet</>}
        <FileUpload />
        <FileDownload />
        <GenderComponent />
        <FilesList />
        <div>

          {rating&&<div style={{width:"100%",height:"400px"}}><ResponsiveRadar 
            data={rating?.data}
            keys={rating?.keys}
            indexBy="country"
            valueFormat=">-.2f"
            margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
            borderColor={{ from: 'color' }}
            gridLabelOffset={36}
            dotSize={10}
            dotColor={{ theme: 'background' }}
            dotBorderWidth={2}
            colors={{ scheme: 'nivo' }}
            blendMode="multiply"
            motionConfig="wobbly"
            legends={[
              {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemTextColor: '#000'
                    }
                  }
                ]
              }
            ]}
          /></div>}

        </div> 
      </div> */}
    </div>
  )
}