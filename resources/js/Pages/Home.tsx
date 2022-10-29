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
import { Slider as SliderModel, SliderDB } from '../Models/Slider';
import { ArticleCategoryDB } from '../Models/ArticleCategory';
interface HomeProps {
    committesDB: CommitteDB[];
    presidentPhotoDB: AppConfigDB;
    slidersDB: SliderDB[];
    presidentNameDB: AppConfigDB;
    eventImagesDB: EventImagesDB[];
    articleCategoriesDB: ArticleCategoryDB[];
}
const Home = ({ committesDB, presidentPhotoDB, slidersDB, eventImagesDB, presidentNameDB, articleCategoriesDB }: HomeProps) => {
    const presidentPhoto = (new AppConfig(presidentPhotoDB)).presidentPhoto();
    const presidentName = (new AppConfig(presidentNameDB)).presidentName();
    const sliders = slidersDB.map(slider => new SliderModel(slider));
    const eventImages = eventImagesDB.map(event => new EventImages(event));
    return (
        <>
            <Slider sliders={sliders} />
            <WhoWeAre presidentPhoto={presidentPhoto} presidentName={presidentName} />
            <Services articleCategoriesDB={articleCategoriesDB} />
            <Quotes />
            <Committees committes={committesDB.map(committe => new Committe(committe))} />
            <Gallery eventImages={eventImages} />
            <Facts />
        </>
    );
};
export default Home;

