import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { QrCodeIcon, XMarkIcon } from '@heroicons/react/24/solid';

const ResourceTradingModal = ({ resource, closeModal }) => {
    const ref = useRef();

    useEffect(() => {
        if (!resource) return;

        // Handle click outside to close the modal
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                closeModal();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [resource, closeModal]);

    if (!resource) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-85 flex items-center justify-center z-50 transition ease-in-out duration-200">
            <div ref={ref} className="relative bg-black text-white border-2 border-mlsa-sky-blue shadow-md rounded-lg w-[50%] h-[30rem] p-5">
                <div className='h-[90%] flex items-center justify-around'>
                    <XMarkIcon
                        className="absolute top-4 right-4 w-8 h-8 cursor-pointer text-mlsa-sky-blue transition hover:scale-110"
                        onClick={closeModal}
                    />
                    <div className="flex h-[80%] w-[50%] gap-4">
                        <img
                            src={resource.img || '/Demo_Image.png'}
                            alt={resource.title}
                            className="w-full h-full rounded-md border-2 border-mlsa-sky-blue object-cover"
                        />
                    </div>
                    <div className='flex flex-col items-start justify-start h-[80%] gap-4 w-[45%]'>
                        <h2 className="text-xl font-bold mb-2">{resource.title}</h2>
                        {/* <p className="text-sm italic text-gray-400">ProductID: {resource.}</p> */}
                        <p>Price: <span className="font-bold">${resource.price}</span></p>
                        <p>Quantity: <span className="font-bold">{resource.quantity}</span></p>
                    </div>
                </div>
                <button className="bg-mlsa-sky-blue px-4 py-2 rounded-md font-bold text-black w-full flex items-center justify-center">
                    View QR <QrCodeIcon className="size-5 ml-2" />
                </button>
            </div>
        </div>
    );
};

ResourceTradingModal.propTypes = {
    resource: PropTypes.shape({
        storeEmail: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        img: PropTypes.string,
        inReturn: PropTypes.string.isRequired,
    }).isRequired,
    user: PropTypes.shape({
        email: PropTypes.string.isRequired,
    }).isRequired,
    closeModal: PropTypes.func.isRequired,
};

export default ResourceTradingModal;