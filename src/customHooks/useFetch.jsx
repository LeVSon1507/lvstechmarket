import axios from 'axios';
import { useEffect, useState } from 'react';

function useFetch(url) {
   const [data, setData] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);
         try {
            const response = await axios.get(url);
            setData(response.data);
         } catch (error) {
            console.log(error);
         } finally {
            setIsLoading(false);
         }
      };
      fetchData();
   }, [url]);

   return { data, isLoading };
}

export default useFetch;
