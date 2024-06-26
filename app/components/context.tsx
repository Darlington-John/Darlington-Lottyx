import { createContext, useEffect, useRef, useState} from 'react';

const FormContext = createContext();

const FormProvider = ({ children }) => {
 
  const clearFormState = async () => {
    localStorage.removeItem('hasSeenIntro');
    
    await new Promise((resolve) => setTimeout(resolve, 100));
  };
  
  const [showInfo, setShowInfo] = useState(false);
  const [ bidding, setBidding] = useState(false);
  const[isBiddingVisible, setIsBiddingVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isUnderstood, setIsUnderstood] = useState(false);
  const popupRef = useRef(null);
  const popupBidRef = useRef(null);
  const togglePopup = () => {
    setIsUnderstood(true);
    if (!showInfo) {
      setShowInfo(true);
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setTimeout(() => setShowInfo(false), 500); // Delay hiding the component until fade-out animation is done
    }
    
  };
  const toggleBid = () => {
    if (!bidding) {
      setBidding(true);
      setIsBiddingVisible(true);
    } else {
      setIsBiddingVisible(false);
      setTimeout(() => setBidding(false), 500); // Delay hiding the component until fade-out animation is done
    }
    
  };
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setIsVisible(false);
      setTimeout(() => setShowInfo(false), 500);
    }
    
  };
  const handleClickBidOutside = (event) => {
    if (popupBidRef.current && !popupBidRef.current.contains(event.target)) {
      setIsBiddingVisible(false);
      setTimeout(() => setBidding(false), 500);
    }
    
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickBidOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickBidOutside);
    };
  }, []);
  const [mainNumbers, setMainNumbers] = useState('000000');
  const [minorNumbers, setMinorNumbers] = useState('999999');
  const [plusNumbers, setPlusNumbers] = useState('111111');
  const [isSpinning, setIsSpinning] = useState(false);

  const getRandomNumber = () => {
    return Math.floor(Math.random() * 9) + 1;
  };

  const generateLottoNumbers = () => {
    if (isSpinning) return;

    setIsSpinning(true);

    const intervalId = setInterval(() => {
      let newMainNumbers = '';
      for (let i = 0; i < 6; i++) {
        newMainNumbers += getRandomNumber();
      }

      setMainNumbers(newMainNumbers);
      setMinorNumbers(newMainNumbers.split('').map(num => (parseInt(num) - 1 < 1 ? 9 : parseInt(num) - 1)).join(''));
      setPlusNumbers(newMainNumbers.split('').map(num => (parseInt(num) + 1 > 9 ? 1 : parseInt(num) + 1)).join(''));
    }, 100); 

    setTimeout(() => {
      clearInterval(intervalId);

      let finalMainNumbers = '';
      for (let i = 0; i < 6; i++) {
        finalMainNumbers += getRandomNumber();
      }

      setMainNumbers(finalMainNumbers);
      setMinorNumbers(finalMainNumbers.split('').map(num => (parseInt(num) - 1 < 1 ? 9 : parseInt(num) - 1)).join(''));
      setPlusNumbers(finalMainNumbers.split('').map(num => (parseInt(num) + 1 > 9 ? 1 : parseInt(num) + 1)).join(''));

      setIsSpinning(false);
    }, 3000); 
  };
  const resetNumbers = () => {
    setMainNumbers('000000');
    setMinorNumbers('999999');
    setPlusNumbers('111111');
  };
  return (
    <FormContext.Provider value={{ 
       clearFormState, isVisible, popupRef, togglePopup, showInfo, setShowInfo, isUnderstood, isBiddingVisible,popupBidRef, toggleBid, bidding,setBidding, mainNumbers, minorNumbers, plusNumbers, isSpinning, getRandomNumber , generateLottoNumbers, resetNumbers
}}>
      {/* <button className='p-4 bg-[#fff] fixed top-0 z-20' onClick={clearFormState}>

      </button> */}
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider, FormContext };
