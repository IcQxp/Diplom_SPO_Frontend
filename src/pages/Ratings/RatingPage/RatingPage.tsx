import { useEffect, useState } from "react"
import styles from "./RatingPage.module.scss"
import { getTopRating } from "../../../api/api-utils";
import { ResponsiveBar } from '@nivo/bar'
import { RatingWithArray } from "../../../components/Ratings/RatingWithArray";

// const originalData = {
//   keys: [
//       "Достижения, предшествующие назначению стипендии",
//       "Наличие у студента публикации в научном или ином издании",
//       "Участие студента в НИД в течение года"
//   ],
//   data: [
//       {
//           country: "Грицюк Мария",
//           "Достижения, предшествующие назначению стипендии": 5,
//           "Наличие у студента публикации в научном или ином издании": 0,
//           "Участие студента в НИД в течение года": 0
//       },
//       {
//           country: "Ляшов Илья",
//           "Достижения, предшествующие назначению стипендии": 1,
//           "Наличие у студента публикации в научном или ином издании": 3,
//           "Участие студента в НИД в течение года": 0
//       }
//   ]
// };

export const RatingPage = () => {

  const [rating, setRating] = useState<{ data: any, keys: string[] }>();

  useEffect(() => {
    const FetchData = async () => {
      const data = (await getTopRating(5)).data
      setRating(data);
      setSelectedKeys(data.keys);
    }
    FetchData()
  }, [])




  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // Обработчик изменения состояния чекбокса
  const handleCheckboxChange = (key:string) => {
    if (selectedKeys.includes(key)) {
      setSelectedKeys(selectedKeys.filter(selectedKey => selectedKey !== key));
    } else {
      setSelectedKeys([...selectedKeys, key]);
    }
  };

  return (
    <div className={styles.page} style={{ width: '100%', height: '300px' }}>
      {rating &&
        <>
          <ResponsiveBar
            data={rating.data}
            keys={selectedKeys}
            indexBy="country"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            colors={{ scheme: 'blues' }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'country',
              legendPosition: 'middle',
              legendOffset: 32
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'food',
              legendPosition: 'middle',
              legendOffset: -40
            }}
          />

          {rating.keys.map((key) => (
            <label key={key} style={{ display: "block" }}>
              <input
                type="checkbox"
                checked={selectedKeys.includes(key)}
                onChange={() => handleCheckboxChange(key)}
              />
              {key}
            </label>
          ))}
        </>
      }
      <div>
        <div>
<RatingWithArray/>
        </div>
        {/* <pre>{JSON.stringify({ keys: selectedKeys, data: rating.data }, null, 2)}</pre> */}
      </div>
    </div>
  )
}