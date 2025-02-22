import { useEffect, useState } from "react";
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

  useEffect(() => {
    setLoading(true)
    async function handleHttp() {
      await InstacieAxios[method](url).then((value) => {
        setData(value.data)
      }).catch((value) => {
        setError(value)
      }).finally(() => setLoading(false))
    }

    handleHttp();
  }, [url, method]);

  return { data, loading, error }
}
