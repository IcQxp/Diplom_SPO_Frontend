import { useEffect, useState } from "react"
import { getAllCritea, getTopRatingWithCriteriaArray } from "../../api/api-utils";
import { ResponsiveBar } from "@nivo/bar";
import { Criterion } from "../../models";
import { Checkbox } from "@mui/material";

export interface RatingWithCriteria {
  count: number
  criteriaIDs: number[]
}
export interface nivoStudent {
  country: string; // Обязательное поле
  [key: string]: number | string; // Дополнительные поля с динамическими именами
}


export interface nivoDiagramm {
  data: nivoStudent[],
  keys: string[]

}

export const RatingWithArray = () => {

  const [ratingWithCriteriaData, setRatingWithCriteriaData] = useState<RatingWithCriteria>({ count: 1, criteriaIDs: [1, 5] });
  const [data, setData] = useState<nivoDiagramm>();
  const [allCriteria,setAllCriteria] = useState<Criterion[]>();


  useEffect(() => {
    const FD = async () => {
      const response = await getTopRatingWithCriteriaArray(ratingWithCriteriaData)
      setData(response.data);
const responseCriteria = await getAllCritea();
setAllCriteria(responseCriteria.data);
    }
    FD();


  }, [])
  const handleCriteriaToggle = (cID: number) => {
    setRatingWithCriteriaData((prevState) => {
      const isCriteriaSelected = prevState.criteriaIDs.includes(cID);

      // Если критерий уже выбран, удаляем его, иначе добавляем
      const updatedCriteriaIDs = isCriteriaSelected
        ? prevState.criteriaIDs.filter((id) => id !== cID)
        : [...prevState.criteriaIDs, cID];

      return {
        ...prevState,
        criteriaIDs: updatedCriteriaIDs,
      };
    });
  };

  const HandleRating = async () => {
    const response = await getTopRatingWithCriteriaArray(ratingWithCriteriaData)
      setData(response.data);
  }
  return (

    <div>
      {
        data && <>
       {  data.data.map(elem => <div>

{elem.country}
</div>)}
<div style={{width:"50%",height:"300px"}}>

<ResponsiveBar
            data={data.data}
            keys={data.keys}
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
      </div>
        </>
       
      }
      {
        allCriteria&&allCriteria.map(elem => <div>
          {elem.criteriaId}
          <Checkbox checked={ratingWithCriteriaData.criteriaIDs.includes(elem.criteriaId)} onChange={()=>handleCriteriaToggle(elem.criteriaId)}/>
          </div>
          )
      }
      <button onClick={HandleRating}>Обновить топ</button>
    </div>
  )
}