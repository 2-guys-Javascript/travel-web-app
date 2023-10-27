import { useEffect, useState } from 'react';

function Exchange({ onChangeIsLoggedIn, onChangeUserId, onChangeDisplayName }) {
  const [krwToJpy, setKrwToJpy] = useState(0);
  const [jpyToKrw, setJpyToKrw] = useState(0);
  const [isKrwToJpy, setIsKrwToJpy] = useState(true);
  const apiKey = import.meta.env.VITE_EXCHANGE_API_KEY;

  async function getKrwToJpyExchange() {
    try {
      const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/jpy/krw`);
      const exchangeData = await response.json();

      setKrwToJpy(exchangeData);
    } catch (error) {
      console.log(error);
    }
  }

  async function getJpyToKrwExchange() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/krw/jpy`);
    const exchangeData = await response.json();

    setJpyToKrw(exchangeData);
  }

  function handleChangeKrwJpy() {
    setIsKrwToJpy(!isKrwToJpy);
  }

  useEffect(() => {
    getKrwToJpyExchange();
    getJpyToKrwExchange();
  }, []);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    const storedUserId = localStorage.getItem('userId');
    const storedDisplayName = localStorage.getItem('displayName');
    console.log(storedLoginStatus);
    console.log(storedUserId);
    console.log(storedDisplayName);

    if (storedLoginStatus) {
      onChangeIsLoggedIn(storedLoginStatus);
      onChangeUserId(storedUserId);
      onChangeDisplayName(storedDisplayName);
    }
  }, []);

  return (
    <div className='exchange-outer-div'>
      <h2 className='exchange-description'>일본 환율 화면입니다</h2>
      <div className='real-exchangeRate' onClick={handleChangeKrwJpy}>
        <div className='exchange-click-description'>
          Click to change a base currency
          <h4 className='base-currency'>Base currency is {isKrwToJpy === true ? 'Yen' : 'Won'}</h4>
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
