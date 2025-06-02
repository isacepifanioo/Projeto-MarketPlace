import { useCallback, useEffect, useState } from "react";
import { InstacieAxios } from "../helper/Instancer";
// import { UserRegister } from "../interface/User";

interface Props {
    url: string,
    method: "get" | "post" | "patch" | 'delete',
}

export function useAxios<T>({ url, method }: Props) {
    const [data, setData] = useState<T | null>(null)
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false)
    
  useEffect(() => {
    const token = JSON.stringify(localStorage.getItem("token"));
    if (token) {
      InstacieAxios.defaults.headers.authorization = `beare ${token}`;
    }
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await InstacieAxios({ method, url });
      setData(response.data);
      setError({});
    } catch (err) {
      setError({err});
    } finally {
      setLoading(false);
    }
  }, [method, url]);

  useEffect(() => {
    setLoading(true)
    async function handleHttp() {
      await InstacieAxios[method](url).then((value) => {
        setData(value.data)
      }).catch((value) => {
        setError(value.message)
      }).finally(() => setLoading(false))
    }

    handleHttp();
  }, [url, method]);

  return { data, loading, error, refetch: fetchData }
}
