import { useEffect, useState } from "react";

type Gender = {
    Code: string,
    Name: string
}

export const GenderComponent = () => {

    const [Gender,setGenders] = useState<Gender[]>();
    // const [loading, setLoading] = useState<boolean>(true); // To handle loading state
    // const [error, setError] = useState<string | null >(null); // To handle errors
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch("https://localhost:7003/api/gender");
    
            if (!response.ok) {
              throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
    
            const data = await response.json();
            setGenders(data);
          } catch (err) {
            if (err instanceof Error) {
              // setError(err.message);
            } 
          } finally {
            // setLoading(false);
          }
        };
    
        fetchData();
      }, []);
      console.log(Gender)
    return (<>
    {Gender?.map(element => <div>

      {element.Name}
    </div>
      )}
    
    </>)
}