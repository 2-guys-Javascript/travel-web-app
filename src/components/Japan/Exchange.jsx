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

    if (storedLoginStatus) {
      onChangeIsLoggedIn(storedLoginStatus);
      onChangeUserId(storedUserId);
      onChangeDisplayName(storedDisplayName);
    }
  }, []);

  return (
    <div className='exchange-outer-div'>
      <h2 className='exchange-description'>💴</h2>
      <div className='real-exchangeRate' onClick={handleChangeKrwJpy}>
        <div className='exchange-click-description'>
          클릭해서 현재의 엔화 환율을 확인해요!
          <h4 className='base-currency'>현재의 엔화는</h4>
        </div>
        <h2>
          {isKrwToJpy === true
            ? `100엔에 ${krwToJpy['conversion_rate'] * 100} 원입니다!`
            : `1000원에 ${jpyToKrw['conversion_rate'] * 1000} 엔입니다!`}
        </h2>
      </div>
    </div>
  );
}

export default Exchange;
