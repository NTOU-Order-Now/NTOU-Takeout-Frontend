import PropTypes from 'prop-types';
import ItemCard from './ItemCard';

const ItemCardList = ({ dishDetailsList }) => {
    const dishDetails = dishDetailsList;

    return (
        <div className="flex flex-wrap justify-center mt-8">
            {dishDetails.map((dishDetail) => (
                <ItemCard key={dishDetail.dishId} dishDetail={dishDetail} />
            ))}
        </div>
    );
};

ItemCardList.propTypes = {
    dishDetailsList: PropTypes.arrayOf(
        PropTypes.shape({
            dishId: PropTypes.string.isRequired,
            dishName: PropTypes.string.isRequired,
            salesVolume: PropTypes.number.isRequired,
        })
    ).isRequired,
};

export default ItemCardList;
