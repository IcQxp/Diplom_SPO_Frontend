import { useRef, useState } from "react";
import { Document, Page, View, Image, PDFViewer, Text, Font } from "@react-pdf/renderer";
import html2canvas from "html2canvas";
import { Bar } from "@nivo/bar";

// Импортируем шрифт
import RobotoRegular from "../../fonts/GeorgiaPro-Regular.ttf";

// Регистрируем шрифт
Font.register({
  family: "Roboto",
  src: RobotoRegular,
});

const styles = {
  page: {
    flexDirection: "column",
    padding: 20,
  },
  text: {
    fontFamily: "Roboto", // Используем зарегистрированный шрифт
    fontSize: 12,
    marginBottom: 10,
  },
};

const PdfGenerator = () => {
  const chartRef = useRef(null); // Ссылка на график
  const [chartImage, setChartImage] = useState<string | null>(null); // Состояние для хранения изображения графика

  // Функция для преобразования графика в изображение
  const captureChart = async () => {
    if (chartRef.current!=null)
    {

      const canvas = await html2canvas(chartRef.current);
      const imgData = canvas.toDataURL("image/png");
      setChartImage(imgData); // Сохраняем изображение в состояние
    }
  };

  return (
    <div>
      {/* График */}
      <div ref={chartRef} style={{ width: "200px", height: "400px" }}>
        <Bar
          width={200}
          height={200}
          data={[
            {
              country: "AD",
              "hot dog": 44,
              burger: 18,
              sandwich: 62,
              kebab: 191,
              fries: 112,
              donut: 138,
            },
            {
              country: "AE",
              "hot dog": 176,
              burger: 108,
              sandwich: 89,
              kebab: 52,
              fries: 38,
              donut: 168,
            },
            // Остальные данные...
          ]}
          keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
          indexBy="country"
        />
      </div>

      {/* Кнопка для захвата графика */}
      <button onClick={captureChart}>Сохранить график в PDF</button>

      {/* Предпросмотр PDF */}
      {chartImage && (
        <PDFViewer width="100%" height="600px">
          <Document>
            <Page size="A4" >
            {/* <Page size="A4" style={styles.page}> */}
              <View>
                <Text style={styles.text}>График:</Text>
                <Image src={chartImage} style={{width:"200px"}} />
              </View>
            </Page>
          </Document>
        </PDFViewer>
      )}
    </div>
  );
};

export default PdfGenerator;