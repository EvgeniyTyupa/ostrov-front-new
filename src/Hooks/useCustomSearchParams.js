import { useSearchParams } from "react-router-dom";

export const useCustomSearchParams = () => {
    const [search, setSearch] = useSearchParams();
    const searchParams = Object.fromEntries(
      new URLSearchParams(search)
    );
  
    return [searchParams, setSearch];
};