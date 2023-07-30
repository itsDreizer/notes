import { useState } from "react";

export default function useFetching(callback) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(``);

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
}
