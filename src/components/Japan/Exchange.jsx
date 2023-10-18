import { useEffect, useState } from 'react';

function Exchange() {
  const [krwToJpy, setKrwToJpy] = useState(0);
  const [jpyToKrw, setJpyToKrw] = useState(0);
  const [isKrwToJpy, setIsKrwToJpy] = useState(true);
  const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;

  // 1엔이 한화로 몇 원인지를 구해주는 함수
  async function getKrwToJpyExchange() {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/jpy/krw`
      );
      const exchangeData = await response.json();

      setKrwToJpy(exchangeData);
    } catch (error) {
      console.log(error);
    }
  }

  // 한화 1원이 일본화로 몇엔에 해당하는지를 구해주는 함수
  async function getJpyToKrwExchange() {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${apiKey}/pair/krw/jpy`
    );
    const exchangeData = await response.json();

    setJpyToKrw(exchangeData);
  }

  // 무엇을 보여줄지 바꿔주는 핸들링 함수 => 처음엔 1엔이 한화로 몇원인지, 클릭하면 반대로
  function handleChangeKrwJpy() {
    setIsKrwToJpy(!isKrwToJpy);
  }

  // 첫 화면이 나타날 때 환율을 구하는 함수들이 한번씩 실행됨
  useEffect(() => {
    getKrwToJpyExchange();
    getJpyToKrwExchange();
  }, []);

  return (
    <div className='exchange-outer-div'>
      <h2 className='exchange-description'>일본 환율 화면입니다</h2>
      <div className='real-exchangeRate' onClick={handleChangeKrwJpy}>
        <div>Click here to change a base currency
          <h4 className='base-currency'>Base currency is {isKrwToJpy === true? 'Yen': 'Won'}</h4>
        </div>
        <h2>{isKrwToJpy === true ? `${krwToJpy['conversion_rate']}₩` : `${jpyToKrw['conversion_rate']}¥`}</h2>
        {isKrwToJpy === true ? (
          <div>1 Yen is equal to {krwToJpy['conversion_rate']} Won</div>
        ) : (
          <div>1 Won is equal to {jpyToKrw['conversion_rate']} Yen</div>
        )}
      </div>
    </div>
  );
}

export default Exchange;
