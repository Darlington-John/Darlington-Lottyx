
import spinIcon from '~/assets/icons/repeat.png'
import editIcon from "~/assets/icons/edit.png"
import useForm from './hooks/useForm';
const LottoNumberGenerator = (props: any) => {
const {mainNumbers, minorNumbers, plusNumbers, isSpinning,  generateLottoNumbers} = useForm();
  return (

    <div className="flex flex-col items-center w-full gap-3">
    <h1 className='text-sm text-[#A7B1AB]'>Use this code to check your winnings</h1>
    <div className="numbers-display flex gap-1  border  border-[#444A47] rounded-md flex-col  relative overflow-hidden font-semibold   bg-[#171817]">
      <div className='bg-[#00000070] w-full absolute p-3 top-0 left-0 z-30 blur-lg'></div>
      <div className='flex absolute -top-[38px] left-0 z-20'>

    {minorNumbers.split('').map((digit, index) => (
        <div key={index} className='relative overflow-hidden ' >

        <h2  className="text-[22px]  relative z-20 px-3 py-5 w-[45px] text-center  ">{digit}</h2>
        </div>
      ))}
      </div>
      <div className='flex relative z-10'>

      {mainNumbers.split('').map((digit, index) => (
        <div key={index} className='relative overflow-hidden ' >
          <div className='absolute left-0 bg-[#434945] p-6  z-10 blur-lg puffy'></div>
        <h2  className="text-[22px]  relative z-20 px-3 py-6 w-[45px] text-center  ">{digit}</h2>
        </div>
      ))}
      </div>
      <div className='flex absolute -bottom-[43px] left-0 z-20'>

{plusNumbers.split('').map((digit, index) => (
    <div key={index} className='relative overflow-hidden ' >

    <h2  className="text-[22px]  relative z-20 px-3 py-6 w-[45px] text-center  ">{digit}</h2>
    </div>
  ))}
  </div>
  <div className='bg-[#00000070] w-full absolute p-2 bottom-0 left-0 z-30 blur-lg'></div>
    </div>
    <div className='w-full flex  gap-2'>
    <button onClick={generateLottoNumbers} disabled={isSpinning} className="border  border-[#444A47] rounded-md flex gap-1 items-center text-[10px] py-1 w-full justify-center">
<img src={spinIcon} alt=''/>
      <h1>{isSpinning ? 'Spinning...' : 'Spin'}</h1>
    </button>
    <button  className="border  border-[#444A47] rounded-md flex gap-1 items-center text-[10px] py-1 w-full justify-center" onClick={props.onClick}>
<img src={editIcon} alt=''/>
      <h1>Edit code</h1>
    </button>
    </div>
  </div>
  );
};

export default LottoNumberGenerator;
