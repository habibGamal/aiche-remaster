import React from 'react';
import Slider from '../Components/Home/Slider';
import WhoWeAre from '../Components/Home/WhoWeAre';
import Services from '../Components/Home/Services';
import Quotes from '../Components/Home/Quotes';
import Committees from '../Components/Home/Committees';
import Gallery from '../Components/Home/Gallery';
import Facts from '../Components/Home/Facts';
import { Committe, CommitteDB } from '../Models/Committe';
import { AppConfig, AppConfigDB } from '../Models/AppConfig';
import { EventImages, EventImagesDB } from '../Models/EventImages';

const Home = ({ committesDB, presidentPhotoDB, sliderPhotosDB, eventImagesDB }: { committesDB: CommitteDB[], presidentPhotoDB: AppConfigDB, sliderPhotosDB: AppConfigDB, eventImagesDB: EventImagesDB[] }) => {
    const presidentPhoto = (new AppConfig(presidentPhotoDB)).presidentPhoto();
    const sliderPhotos = (new AppConfig(sliderPhotosDB)).sliderPhotos();
    const eventImages = eventImagesDB.map(event => new EventImages(event));
    return (
        <>
            <Slider sliderPhotos={sliderPhotos} />
            <WhoWeAre presidentPhoto={presidentPhoto} />
            <Services />
            <Quotes />
            <Committees committes={committesDB.map(committe => new Committe(committe))} />
            <Gallery eventImages={eventImages}/>
            <Facts />
        </>
    );
};
export default Home;

