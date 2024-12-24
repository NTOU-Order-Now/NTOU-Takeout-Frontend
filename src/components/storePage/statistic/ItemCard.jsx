import PropTypes from 'prop-types';

const ItemCard = ({ dishDetail }) => {
    const { dishName, salesVolume } = dishDetail;

    return (
        <div className="flex w-full">
            <div className="bg-orange-100 m-4 rounded-lg h-20 text-gray-800 text-lg mt-4 w-[90%] p-4 flex justify-between shadow-md items-center mx-auto font-notoTC">
                <p className="font-bold text-start">{dishName}</p>
                <p className="font-bold text-end">共賣出 {salesVolume} 項</p>
            </div>
        </div>
    );
};

ItemCard.propTypes = {
    dishDetail: PropTypes.shape({
        dishId: PropTypes.string.isRequired,
        dishName: PropTypes.string.isRequired,
        salesVolume: PropTypes.number.isRequired,
    }).isRequired,
};

export default ItemCard;
