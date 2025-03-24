
import { nivoDiagramm } from "../Ratings/RatingWithArray";
import { getTopRating } from "../../api/api-utils";
import { Button } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import React, { FC, useEffect, useState } from "react"
import FileUpload from "../FileUpload/FileUpload";
import FileDownload from "../FileDownload/FileDownload";
import { GenderComponent } from "../Gender/Gender";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { FilesList } from "../FilesList/FilesList";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomePage.module.scss"
import { ResponsiveRadar } from '@nivo/radar'
import { BarChart } from "@mui/icons-material"
import { Loading } from "../Loading/Loading";
import { News } from "../News/News";


export const HomePage: FC = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string>('');
const [loading,setLoading] = useState<boolean>(true);

  const navigate = useNavigate();
  const allowedFiles = ['application/pdf'];
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let selectedFile = e.target.files?.[0];
    // console.log(selectedFile.type);
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError('');
          setPdfFile(e.target?.result as string | null);
        }
      }
      else {
        setPdfError('Not a valid pdf: Please select only PDF');
        setPdfFile('');
      }
    }
    else {
      console.log('please select a PDF');
    }
  }

  const [rating, setRating] = useState<nivoDiagramm>();
  useEffect(() => {
    const FD = async () => {
    try {
      const response = await getTopRating(3);
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
        {loading? (
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
                  key={elem.country}
                  className={styles.link}
                  
                >
                  <h2 style={{ margin: 0, color: index === 0 ? "#ff9800" : "#333" }}>
                    #{index + 1} {elem.country}
                  </h2>
                  <p style={{ margin: "5px 0", fontSize: "14px", color: "#555" }}>
                    Сумма значений: <strong>{totalSum}</strong>
                  </p>
                </Link>
              );
            })
          ):(<div>ПУСТО</div>)}
      </div>
      <Button startIcon={<BarChart />} variant="contained" size="medium" onClick={() => { navigate("/rating") }} sx={{margin:"20px 40px"}}>
        Перейти к рейтингу
      </Button>

<News/>


      {/* Upload PDF */}
      <form>
        <label><h5>Upload PDF</h5></label>
        <br></br>
        <input type='file' className="form-control"
          onChange={handleFile}></input>
        {/* we will display error message in case user select some file
        other than pdf */}
        {pdfError && <span className='text-danger'>{pdfError}</span>}
      </form>
      {/* View PDF */}
      <h5>View PDF</h5>
      <div className="viewer">
        {/* render this if we have a pdf file */}
        {pdfFile && (<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={pdfFile}
            plugins={[defaultLayoutPluginInstance]}></Viewer>
        </Worker>
        )}
        {/* render this if we have pdfFile state null   */}
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
      </div>
    </div>
  )
}