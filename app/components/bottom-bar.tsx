import { Link, useLoaderData, useLocation } from "@remix-run/react";
import diceImg from "~/assets/icons/dice.png"
import diceSleepImg from "~/assets/icons/diceSleep.png"
import jackImg from "~/assets/icons/jack.png"
import jackSleepImg from "~/assets/icons/jackSleep.png"
import walletImg from "~/assets/icons/wallet.png"
import walletSleepImg from "~/assets/icons/walletSleep.png"
import profileImg from "~/assets/icons/profile.png"
import profileSleepImg from "~/assets/icons/profileSleep.png"
import moreImg from "~/assets/icons/moreSleep.png"
import { authenticator } from 'utils/auth.server';
import { getXataClient } from 'utils/xata';
import { LoaderFunction,  json } from "@remix-run/node";


const link = [
    {id: 1,
        link: '/discover',
        to: 'Disover',
        favIconActive: diceImg,
        favIcon:  diceSleepImg,
    },
    {id: 2,
        link: '/jackpot',
        to: 'Jackpot',
          favIconActive: jackImg,
        favIcon:  jackSleepImg,
    },
    {id: 3,
        link: '/wallet',
        to: 'Wallet',
          favIconActive: walletImg,
        favIcon:  walletSleepImg,
    },
    {id: 4,
        link: '/profile',
        to: 'Profile',
          favIconActive: profileImg,
        favIcon:  profileSleepImg,
    },
    {id: 5,
        link: '/more',
        to: 'More',
          favIconActive: moreImg,
        favIcon:  diceSleepImg,
    },
]
const BottomBar = ({pots = []}) => {
    const location = useLocation();

  

    return ( <div className="flex items-center  py-1 w-full px-3 justify-between relative z-20   text-[9px] bg-[#0B0C0C]">

        {link.map((data, index) =>
        
{   
  const link = data.link === '/jackpot' && pots.length > 0 ? '/jackpot/tickets' : data.link;
  return   (
        <Link to={link} className={`${location.pathname.startsWith(data.link) ? 'text-white' : 'text-[#A7B1AB]'}`} key={index}>
          <div className={`flex flex-col  items-center text-center  px-5`}>

<img src={location.pathname.startsWith(data.link) ? data.favIconActive : data.favIcon} alt=""/>

{data.to}

</div>
</Link>
      )}
        )}

    </div> );
}
 
export default BottomBar;