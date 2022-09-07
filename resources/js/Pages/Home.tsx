import React from 'react';
import Slider from '../Components/Home/Slider';
import WhoWeAre from '../Components/Home/WhoWeAre';
import Services from '../Components/Home/Services';
import Quotes from '../Components/Home/Quotes';
import Committees from '../Components/Home/Committees';
import Gallery from '../Components/Home/Gallery';
import Facts from '../Components/Home/Facts';

const Home = () => {
    return (
        <>
            <Slider />
            <WhoWeAre />
            <Services />
            <Quotes />
            <Committees />
            <Gallery />
            <Facts />
            <div className="my-32">d</div>
        </>
    );
};
export default Home;

