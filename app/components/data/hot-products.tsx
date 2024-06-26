import earImg from "~/assets/images/ear.png"
import earTwoImg from "~/assets/images/earTwo.png"
import earThreeImg from "~/assets/images/earThree.png"
import laptopImg from '~/assets/images/laptop.png'
import phoneImg from '~/assets/images/phone.png'

import phoneTwoImg from "~/assets/images/phoneTwo.png"
import phoneThreeImg from "~/assets/images/phoneThree.png"
import laptopTwoImg from "~/assets/images/laptopTwo.png"
import laptopThreeImg from "~/assets/images/laptopThree.png"
export const hotproducts = [

    {id: 1,
        imgName: 'bluetooth-earphone',
        product: earImg,
        name: 'S20 Wireless Bluetooth Earphone Touch LED Stereo Audio Black',
        price: '10',
        hot:  true,
        url: 's20-wireless-bluetooth-earphone',
feature: `Introducing the SonicWave Wireless Headset - your ultimate audio companion for work, play, and everything in between!
Immerse yourself in unparalleled sound quality with SonicWave's cutting-edge noise-canceling technology. Say goodbye to tangled cords and hello to complete freedom with a reliable wireless connection up to 30 feet. Enjoy seamless audio streaming and crystal-clear communication, whether you're grooving to your favorite tunes or conquering virtual meetings.`,
firstView: earImg,
secondView: earTwoImg,
thirdView: earThreeImg
    },
    {id: 2,
        imgName: 'laptop',
        product: laptopImg,
        name: 'HP EliteBook Core i7 11th generation',
        price: '500',
        hot:  true,
        url: 'hp-elitebook-core',
        firstView: laptopImg,
secondView: laptopTwoImg,
thirdView: laptopThreeImg,
feature: `High-fidelity six-speaker sound system with force-cancelling woofers.
Wide stereo sound.
Support for Spatial Audio when playing music or video with Dolby Atmos on built-in speakers.
Spatial Audio with dynamic head tracking when using AirPods (3rd generation), AirPods Pro, and AirPods Max.`,
    },
    {id: 3,
        imgName: 'Iphone',
        product: phoneImg,
        name: 'apple-iphone-15-pro-max',
        price: '750',
        hot:  true,
        url: 'apple-iphone-15-pro-max',
        firstView: phoneImg,
secondView: phoneTwoImg,
thirdView: phoneThreeImg,
feature: `Splash, Water and Dust Resistant 3 Rated IP68 (maximum depth of 6 metres up to 30 minutes) under IEC standard 60529.
Chip. A16 Bionic chip.
Camera. Advanced dual-camera system. ...
Video Recording. 4K video recording at 24 fps, 25 fps, 30 fps or 60 fps.
TrueDepth Camera. 12MP camera.`,
    },
]