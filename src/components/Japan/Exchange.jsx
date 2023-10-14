import { useEffect, useState } from 'react';

function Exchange() {
  const [krwToJpy, setKrwToJpy] = useState(0);
  const [jpyToKrw, setJpyToKrw] = useState(0);
  const [isKrwToJpy, setIsKrwToJpy] = useState(true);
  const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;

  // 1엔이 한화로 몇 원인지를 구해주는 함수
  async function getKrwToJpyExchange() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/jpy/krw`);
    const exchangeData = await response.json();

    setKrwToJpy(exchangeData);
  }

  // 한화 1원이 일본화로 몇엔에 해당하는지를 구해주는 함수
  async function getJpyToKrwExchange() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/krw/jpy`);
    const exchangeData = await response.json();

    setJpyToKrw(exchangeData);
  }

  // 무엇을 보여줄지 바꿔주는 핸들링 함수 => 처음엔 1엔이 한화로 몇원인지, 클릭하면 반대로
  function handleChangeKrwJpy() {
    setIsKrwToJpy(!isKrwToJpy);
  }

  useEffect(() => {
    getKrwToJpyExchange();
    getJpyToKrwExchange();
  }, []);

  return (
    <div className='exchange-outer-div'>
      <div>일본 환율 화면입니다</div>
      <div className='real-exchangeRate' onClick={handleChangeKrwJpy}>
        {isKrwToJpy === true ? <div>{krwToJpy['conversion_rate']}</div> : <div>{jpyToKrw['conversion_rate']}</div>}
      </div>
    </div>
  );
}

export default Exchange;
