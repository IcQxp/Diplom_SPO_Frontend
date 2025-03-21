import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { FC, useState } from "react"
import FileUpload from "../FileUpload/FileUpload";
import FileDownload from "../FileDownload/FileDownload";
import { StudentList } from "../StudentList/StudentList";
import { GenderComponent } from "../Gender/Gender";
import AuthComponent from "../../pages/auth/auth";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { FilesList } from "../FilesList/FilesList";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.scss"
import { ResponsiveRadar } from '@nivo/radar'

export const HomePage: FC = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [pdfFile, setPdfFile] = useState<string | null>(null);
  const [pdfError, setPdfError] = useState<string>('');

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



  const data = [
    {
      "taste": "fruity",
      "chardonay": 42,
      "carmenere": 23,
      "syrah": 82
    },
    {
      "taste": "bitter",
      "chardonay": 47,
      "carmenere": 52,
      "syrah": 78
    },
    {
      "taste": "heavy",
      "chardonay": 70,
      "carmenere": 117,
      "syrah": 63
    },
    {
      "taste": "strong",
      "chardonay": 102,
      "carmenere": 20,
      "syrah": 79
    },
    {
      "taste": "sunny",
      "chardonay": 35,
      "carmenere": 66,
      "syrah": 22
    }
  ]




  return (
    <div className={styles.container}>
      <Link to={"/Profile"}>Profile </Link>
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
        <StudentList />
        <GenderComponent />
        <AuthComponent />
        <FilesList />
        <div>
          <RadarChart />
          <ResponsiveRadar
            data={[
              {
                "taste": "fruity",
                "chardonay": 50,
                "carmenere": 64,
                "syrah": 31
              },
              {
                "taste": "bitter",
                "chardonay": 39,
                "carmenere": 87,
                "syrah": 38
              },
              {
                "taste": "heavy",
                "chardonay": 90,
                "carmenere": 116,
                "syrah": 58
              },
              {
                "taste": "strong",
                "chardonay": 23,
                "carmenere": 101,
                "syrah": 79
              },
              {
                "taste": "sunny",
                "chardonay": 95,
                "carmenere": 60,
                "syrah": 45
              }
            ]}
            keys={['chardonay', 'carmenere', 'syrah']}
            indexBy="taste"
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
          />

        </div>
      </div>
    </div>
  )
}

import React from 'react';

const RadarChart = () => {
  // Данные для диаграммы
  const data = [
    {
      taste: 'fruity',
      chardonay: 50,
      carmenere: 64,
      syrah: 31,
    },
    {
      taste: 'bitter',
      chardonay: 39,
      carmenere: 87,
      syrah: 38,
    },
    {
      taste: 'heavy',
      chardonay: 90,
      carmenere: 116,
      syrah: 58,
    },
    {
      taste: 'strong',
      chardonay: 23,
      carmenere: 101,
      syrah: 79,
    },
    {
      taste: 'sunny',
      chardonay: 95,
      carmenere: 60,
      syrah: 45,
    },
  ];

  // Ключи для отображения данных
  const keys = ['chardonay', 'carmenere', 'syrah'];

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <ResponsiveRadar
        data={data} // Данные для диаграммы
        keys={keys} // Ключи для отображения данных
        indexBy="taste" // Поле, используемое как индекс (метки осей)
        valueFormat=">-.2f" // Формат отображения значений
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }} // Отступы
        borderColor={{ from: 'color' }} // Цвет границ
        gridLabelOffset={36} // Смещение меток сетки
        dotSize={10} // Размер точек
        dotColor={{ theme: 'background' }} // Цвет точек
        dotBorderWidth={2} // Ширина границ точек
        colors={{ scheme: 'nivo' }} // Цветовая схема
        blendMode="multiply" // Режим наложения цветов
        motionConfig="wobbly" // Анимация
        legends={[
          {
            anchor: 'top-left', // Расположение легенды
            direction: 'column', // Направление элементов легенды
            translateX: -50, // Смещение по X
            translateY: -40, // Смещение по Y
            itemWidth: 80, // Ширина элемента легенды
            itemHeight: 20, // Высота элемента легенды
            itemTextColor: '#999', // Цвет текста легенды
            symbolSize: 12, // Размер символа легенды
            symbolShape: 'circle', // Форма символа
            effects: [
              {
                on: 'hover', // Эффект при наведении
                style: {
                  itemTextColor: '#000', // Изменение цвета текста
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default RadarChart;