import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import BusinessHoursSelector from '../../authPage/BusinessHoursSelector';
import useStoreForm from '../../../stores/storeInfoStore';

function StoreForm() {
    const {
        storeName,
        setStoreName,
        storeDescription,
        setStoreDescription,
        filePath,
        setFile,
        storeAddress,
        setStoreAddress,
        storePhone,
        setStorePhone,
        businessHours,
        setBusinessHours,
    } = useStoreForm();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file.name);
        if (file) {
            const localPath = event.target.value;                        
            setFile(file, localPath);
            console.log(filePath);
            
        }
    };    

    return (
        <div className="p-4 max-w-screen">
            <form className="p-4 space-y-4 font-semibold font-notoTC">
                {/* Store name */}
                <div>
                    <label className="block text-gray-700 mb-1">商家名稱：</label>
                    <input
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="輸入商家名稱"
                    />
                </div>

                {/* Store description */}
                <div>
                    <label className="block text-gray-700 mb-1">商家描述：</label>
                    <textarea
                        rows="3"
                        value={storeDescription}
                        onChange={(e) => setStoreDescription(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="輸入商家描述"
                    />
                </div>

                {/* Upload image */}
                <div className="w-full">
                    <label className="block text-gray-700 mb-1">圖片：</label>
                    <div className="flex items-center w-full space-x-2">
                        <div className="flex-1">
                            <input
                                type="text"
                                value={filePath}
                                readOnly
                                className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                placeholder="請選擇圖片"
                            />
                        </div>
                        <div className="flex-none w-30">
                            <label
                                htmlFor="file-upload"
                                className="bg-orange-500 text-white px-4 py-2 rounded-lg cursor-pointer whitespace-nowrap"
                            >
                                <FontAwesomeIcon icon={faUpload} className="mr-1" />
                                上傳圖片
                            </label>
                        </div>
                        <input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                </div>

                {/* Store address */}
                <div>
                    <label className="block text-gray-700 mb-1">商家地址：</label>
                    <input
                        type="text"
                        value={storeAddress}
                        onChange={(e) => setStoreAddress(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="輸入商家地址"
                    />
                </div>

                {/* Store phone number */}
                <div>
                    <label className="block text-gray-700 mb-1">商家電話：</label>
                    <input
                        type="number"
                        value={storePhone}
                        onChange={(e) => setStorePhone(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="輸入商家電話"
                    />
                </div>

                {/* Store business hours */}
                <div>
                    <label className="block text-gray-700 mb-1">營業時間：</label>
                    <BusinessHoursSelector
                        businessHours={businessHours}
                        onUpdate={setBusinessHours}
                    />
                </div>
            </form>
        </div>
    );
}

export default StoreForm;
