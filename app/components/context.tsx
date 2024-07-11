import { useSubmit } from '@remix-run/react';
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
  const [activeDiv, setActiveDiv] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState({ 1: "", 2: "", 3: "", 4: "" });
  const [error, setError] = useState("")
  const handleDivClick = (divId) => {
    setActiveDiv(divId);
  };

  const handleNumberClick = (number) => {
    if (activeDiv !== null) {
      setSelectedNumbers((prev) => ({ ...prev, [activeDiv]: number }));
    }
  };

  const handleChange = (e, pot) => {
    const value = e.target.value;
    setSelectedNumbers((prev) => ({ ...prev, [pot]: value }));
  };
  const getPotText = () => {
    if (!activeDiv) {
        return 'Choose any pot above';
    } else {
        return `Select a number below for POT ${activeDiv}`;
    }
};
const resetToDefault = () => {
  setActiveDiv(null);
  setSelectedNumbers({ 1: "", 2: "", 3: "", 4: "" });
};

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

  const submit = useSubmit();
  const handlePotsSubmit = () => {

    if (!selectedNumbers[1] || !selectedNumbers[2] || !selectedNumbers[3] || !selectedNumbers[4]) {
      setError("You didn’t select a number in some pots. Select a number in all pots to submit this ticket.");
      return;
    }
    const formId = "potForm"; // Specify the ID of the form you want to submit
    const form = document.getElementById(formId);
    const actionInput = form.querySelector('input[name="action"]');
    if (form && actionInput) {
      actionInput.value = "addPot";
      submit(form);
      setError(""); // Clear error after successful submission
      togglePayPopup();
      togglePaySucessfulPopup();
      setTimeout(() => {
        setIsJackpotSucessfulVisible(true);
        setTimeout(() => setJackpotSucessful(true), 500);
      }, 3000);
    }
  };
  const [pay, setPay] = useState(false);
  const [isPayVisible, setIsPayVisible] = useState(false);
  const payRef = useRef(null);

  const togglePayPopup = () => {
    if (!pay) {
      setPay(true);
      setIsPayVisible(true);
    } else {
      setIsPayVisible(false);
      setTimeout(() => setPay(false), 500);
    }
  };
  const [paySucessful, setPaySucessful] = useState(false);
  const [isPaySucessfulVisible, setIsPaySucessfulVisible] = useState(false);
  const [jackpotSucessful, setJackpotSucessful] = useState(false);
  const [isJackpotSucessfulVisible, setIsJackpotSucessfulVisible] = useState(false);
  const paySucessfulRef = useRef(null);
  const defaultSelectedNumbers = { 1: "", 2: "", 3: "", 4: "" };
  const PlayAgain =()=> {
    setTimeout(() => setJackpotSucessful(false), 1000);
setSelectedNumbers(defaultSelectedNumbers);
  }
  const toggleJackpotSucessfulPopup = () => {
    if (!jackpotSucessful) {
      setJackpotSucessful(true);
      setIsJackpotSucessfulVisible(true);
      
    } else {
      setIsJackpotSucessfulVisible(false);
      setTimeout(() => setJackpotSucessful(false), 500);
    }
  };
  // setTimeout(() => setIsJackpotSucessfulVisible(true), 500);
  // setTimeout(() => setJackpotSucessful(true), 500);
  const togglePaySucessfulPopup = () => {
    if (!paySucessful) {
      setPaySucessful(true);
      setIsPaySucessfulVisible(true);
      setTimeout(() => {
        setIsPaySucessfulVisible(false);
        setTimeout(() => setPaySucessful(false), 500);
      }, 3000);
    } else {
      setIsPaySucessfulVisible(false);
      setTimeout(() => setPaySucessful(false), 500);
    }
  };

  const [deleteAcctPop, setDeleteAcctPop] = useState(false);
  const toggleDeletePopup = () => {
    setDeleteAcctPop(prevState => !prevState);
  };

  return (
    <FormContext.Provider value={{ 
       clearFormState, isVisible, popupRef, togglePopup, showInfo, setShowInfo, isUnderstood, isBiddingVisible,popupBidRef, toggleBid, bidding,setBidding, mainNumbers, minorNumbers, plusNumbers, isSpinning, getRandomNumber , generateLottoNumbers, resetNumbers, handlePotsSubmit, selectedNumbers, setSelectedNumbers, handleDivClick, handleNumberClick , handleChange, getPotText, activeDiv, setActiveDiv, resetToDefault, pay, setPay, isPayVisible, setIsPayVisible, payRef, togglePayPopup, error, paySucessful, setPaySucessful, isPaySucessfulVisible, setIsPaySucessfulVisible, paySucessfulRef, togglePaySucessfulPopup, toggleJackpotSucessfulPopup, jackpotSucessful, setJackpotSucessful,
       isJackpotSucessfulVisible, setIsJackpotSucessfulVisible, PlayAgain, toggleDeletePopup, deleteAcctPop, setDeleteAcctPop
}}>
      {/* <button className='p-4 bg-[#fff] fixed top-0 z-20' onClick={clearFormState}>

      </button> */}
      {children}
    </FormContext.Provider>
  );
};

export { FormProvider, FormContext };
