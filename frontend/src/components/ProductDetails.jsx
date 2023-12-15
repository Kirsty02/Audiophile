import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ProductDetails.css';
import MyHeader from './MyHeader';
import TheFooter from './TheFooter';
import CategoryWidget from './CategoryWidget';
import BottomBanner from './BottomBanner';
import useWindowSize from '../hooks/useWindowSize';



function ProductDetails() {

    const [quantity, setQuantity] = useState(1);
    const [productDetails, setProductDetails] = useState(null);
    const [topImageUrl, setTopImageUrl] = useState('');
    const [bottomImageUrl, setBottomImageUrl] = useState('');
    const [largeImageUrl, setLargeImageUrl] = useState('');

    const { width } = useWindowSize(); 
    const { slug } = useParams();
    

    useEffect(() => {
        fetch(`/product/${slug}`)
            .then(response => response.json())
            .then(data => {
                setProductDetails(data);
                updateGalleryImages(data.gallery); // Call within the same useEffect
            })
            .catch(error => console.error('Error fetching product details:', error));
    }, [slug]);

    useEffect(() => {
        // Call updateGalleryImages again when width changes
        if (productDetails) {
            updateGalleryImages(productDetails.gallery);
        }
    }, [width, productDetails]);

    // Update to use current screen width from useWindowSize
    const updateGalleryImages = (gallery) => {
        const imageType = getImageType(width);

        const topImage = gallery.find(img => img.image_type === 'first');
        const bottomImage = gallery.find(img => img.image_type === 'second');
        const largeImage = gallery.find(img => img.image_type === 'third');

        setTopImageUrl(topImage ? topImage[imageType] : '');
        setBottomImageUrl(bottomImage ? bottomImage[imageType] : '');
        setLargeImageUrl(largeImage ? largeImage[imageType] : '');
    };


    if (!productDetails) {
        return <div>Loading...</div>; 
    }


    const increaseValue = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseValue = () => {
        setQuantity(prevQuantity => prevQuantity - 1 < 1 ? 1 : prevQuantity - 1);
    };

    // Determine the image type based on width
    const getImageType = (width) => {
        if (width <= 640) return 'mobile';
        if (width <= 1200) return 'tablet';
        return 'desktop';
    };

    const imageType = getImageType(width);
    const imageObject = productDetails.images.find(img => img.image_type === imageType);
    const imageUrl = imageObject ? imageObject.image_url : ''; 

    // Handler for when a product is clicked
    const handleProductClick = (slug) => {
        navigate(`/product/${slug}`); 
    };
  
    

    
    return (
    <>
        <MyHeader></MyHeader>
        <div className='top-black-bar'> 
        </div>
        <div className='container-desktop'>
            <div className='go-back-div'>
                <p >Go Back</p>
            </div>
            <div className='product_preview'>
                <div className='product_preview_image'  style={{ backgroundImage: `url(${imageUrl})` }}></div>
                <div className='product_preview_info'>
                    {productDetails.is_new && <h2 className='overline'>NEW PRODUCT</h2>}
                    <h2> {productDetails.name}</h2>
                    <p> {productDetails.description}</p>
                    <h6> £{productDetails.price}</h6>
                    <div className='product_cart_btn_flex'>
                        <div class="quantity-selector">
                            <button className="decrease" onClick={decreaseValue}>-</button>
                            <input type="text" id="quantity" value={quantity} readOnly/>
                            <button className="increase" onClick={increaseValue}>+</button>
                        </div>
                        <button className='orange-btn'> Add to cart</button>
                    </div>
                </div>
            </div>
            <div className='features_includes_box'>
                <div className='features_box'>
                    <h4> Features</h4>
                    <p>{productDetails.features}</p>
                </div>
                <div className='includes_box'>
                    <div>
                        <h4> In the box </h4> 
                    </div>
                    <div>
                        <ul className='box-list'>
                            {productDetails && productDetails.includes.map((include, index) => (
                                <li key={index}>
                                    <span className='quantity'>{include.quantity}x </span>
                                    <p> {include.item}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

            </div>
       
            <div className='product-gallery'>
                <div className='two-img-flex'> 
                    <div className="top-img" style={{ backgroundImage: `url(${topImageUrl})` }}></div>
                    <div className="bottom-img" style={{ backgroundImage: `url(${bottomImageUrl})` }}></div>
                </div>
                <div className='large-img' style={{ backgroundImage: `url(${largeImageUrl})` }}>  
                </div>
            </div>


            

            <div className='others-container'>
                <h4> You may also like</h4>
                <div className='others-flex'>
                    {productDetails.others && productDetails.others.map((other, index) => {
                        const imageType = getImageType(width);
                        const otherImageUrl = other[imageType];
                        return (
                            <div key={index} className='others-card'>
                                <div className='others-img' style={{ backgroundImage: `url(${otherImageUrl})` }}></div>
                                <h6>{other.other_product_name}</h6>
                                <button className='orange-btn' onClick={() => {handleProductClick(product.slug)}}> See product</button>
                            </div>
                        );
                    })}
                </div>
            </div>


        </div>
        <BottomBanner></BottomBanner>
        <TheFooter></TheFooter>
    </>
  )
}

export default ProductDetails
