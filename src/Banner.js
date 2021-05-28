// import "./Banner.css";

// function Banner() {
//     console.log('Hiiiiiii');
//     return (
//         <section>
//             <div class="grid-item22"><img src = "./SalluBhai.jpeg" height="250" width = "100%" alt="NotAvailable"></img>
//             </div>
//         </section>
// );
// }

// export default Banner;



import React from "react";
import "./Banner.css";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

function Banner() {
  return (
    <div className="App">
     <AliceCarousel autoPlay activeIndex infinite disableButtonsControls autoPlayInterval="3000">
     <img src="https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_WonderWomen84Launch/2a4fd577-c5a6-483c-a910-23afbc2ba9f7._UR3000,600_SX1500_FMjpg_.jpeg" alt="Wonder Woman 1984" loading="eager"/>
     <img src="https://m.media-amazon.com/images/G/01/digital/video/sonata/PV_IN_Parasite/e8ecb5db-1b56-4f5a-b9da-378844d164f9._UR3000,600_SX1500_FMjpg_.jpg" alt="Parasite" loading="eager"/>
     <img src="https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_AnotherRoundLaunch/39c67b1e-150e-4e4f-8e9c-98cbecebd7ca._UR3000,600_SX1500_FMjpg_.jpeg" alt="Another Round" loading="eager"/>
     <img src="https://m.media-amazon.com/images/S/sonata-images-prod/PV_IN_MinariwithAwards/2790c72d-d52c-4d53-8573-db62c0b1be37._UR3000,600_SX1500_FMjpg_.jpeg" alt="Minari" loading="eager"/>
    </AliceCarousel>
    </div>
  );
}

export default Banner;