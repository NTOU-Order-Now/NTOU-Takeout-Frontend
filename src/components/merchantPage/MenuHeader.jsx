import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShareNodes, faStar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import useLoadingStore from '../../stores/loadingStore';

const MenuHeader = ({
    title = '海洋大學店',          // default title
    distance = 100,               // default distance
    averageCost = 800,           // default average cost
    rating = 4.2,                // default rating
    reviews = 100,               // default reviews
    informationLink = 'https://google.com', // defaults information link
    bannerLink = 'https://i.imgur.com/S1OPVB6.jpeg', // default banner link
}) => {
    
    // get state from store
    const { isLoading, setIsLoading } = useLoadingStore();

    // loading screen test, test 500ms loading time
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [setIsLoading]);

    if (isLoading) {
        return (
            <div className="loading-screen">
                <p>Loading...</p>
            </div>
        );
    }
    return (
        <header className="fixed top-0 left-0 w-full width-100 menu-header">
            <div
                className="banner bg-cover bg-center h-64 relative before:content-[''] before:absolute before:w-full before:h-full before:backdrop-blur-sm"
                style={{ backgroundImage: `url(${bannerLink})` }}
            >
            </div>
            <div className="pt-1 pb-1 pl-2 pr-2 return-btn absolute top-10 left-4 transform -translate-y-1/2 bg-white/60 rounded-full">
                <FontAwesomeIcon icon={faArrowLeft} className="text-slate-800" />
            </div>
            <div className="pt-1 pb-1 pl-2 pr-2 share-btn absolute top-10 right-4 transform -translate-y-1/2 bg-white/60 rounded-full">
                <FontAwesomeIcon icon={faShareNodes} className="text-slate-800" />
            </div>
            {/* Store information */}
            <div className="bg-white rounded-t-2xl p-4 relative -top-8 left-0 right-0 z-10 font-notoTC">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold">{title}</h2>
                        <p className="text-gray-400 text-sm">距離您約{distance}公里</p>
                        <p className="text-green-600 text-sm mt-1">平均花費約{averageCost}元</p>
                    </div>
                    <div className="flex items-center mt-10">
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 ml-2 mt-1" />
                        <span className="text-xl font-semibold">&nbsp;{rating}</span>
                        <span className="text-gray-400 ml-1 mt-0.5">({reviews}+)</span>
                    </div>
                    <div className="absolute top-4 right-4 text-xl text-gray-500">
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </div>
                </div>
            </div>
        </header>
    
    )
};

MenuHeader.propTypes = {
    title: PropTypes.string,
    distance: PropTypes.number,
    averageCost: PropTypes.number,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    informationLink: PropTypes.string,
    bannerLink: PropTypes.string,
};

export default MenuHeader;
