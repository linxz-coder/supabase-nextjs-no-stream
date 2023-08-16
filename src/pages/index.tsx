import { useEffect, useState } from 'react';
import { run } from '../utils/supabase';
import { AnswerDisplay } from '../components/AnswerDisplay';

export default function Home() {
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await run();
      setResult(res);
    }
    fetchData();
  }, []);

  return (
    <>
      <h1>欢迎</h1>
      <AnswerDisplay result={result} />
    </>
  );
}
