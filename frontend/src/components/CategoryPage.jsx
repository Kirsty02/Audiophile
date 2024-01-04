import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CategoryPage.css'
import MyHeader from './MyHeader';
import TheFooter from './TheFooter';
import CategoryWidget from './CategoryWidget';
import BottomBanner from './BottomBanner';
import useWindowSize from '../hooks/useWindowSize';

function CategoryPage({ category }) {
    const [products, setProducts] = useState([]); 
    const { width } = useWindowSize(); 

    //Fetching products and images
    useEffect(() => {
      fetch(`/products/${category}`) 
        .then(response => response.json())
        .then(data => {
            // Sort products so new products come first
            const sortedData = data.sort((a, b) => {
                return b.is_new - a.is_new;
            });
            setProducts(sortedData);
        })
        .catch(error => console.error('Error fetching data: ', error));
  }, [category]);


    // Determine the image type based on width
    const getImageType = (width) => {
        if (width <= 640) return 'mobile';
        if (width <= 1200) return 'tablet';
        return 'desktop';
    };

    const navigate = useNavigate();

    const handleProductClick = (slug) => {
      navigate(`/product/${slug}`); 
    };

    return (
    <>
        <MyHeader></MyHeader>
        <div className='top-black-banner'>
            <h2 className='categoryTitle'>{category.charAt(0).toUpperCase() + category.slice(1)}</h2> 
        </div>
        <div className='content'>
            <div className="container-desktop">
                {products.map((product, index) => {
                     const layoutClass = index % 2 === 0 ? "item-flex" : "item-flex-reverse";
                     const imageType = getImageType(width);
                     const imageUrl = product.images[imageType]; 
                     return(
                        <div key={product.product_id} className={`item-preview-card ${layoutClass}`}>
                            <div className='item-preview-img'  style={{ backgroundImage: `url(${imageUrl})` }}>
                            </div>
                            <div className='item-preview-content'>
                                {product.is_new && <h2 className='overline'>NEW PRODUCT</h2>}
                                <h2>{product.name}</h2>
                                <p>{product.description}</p>
                                <button className='orange-btn' onClick={() => handleProductClick(product.slug)}> See product</button>
                            </div>
                        </div>
                     );   
                    }
                )}
            </div> 
        </div>
        <CategoryWidget></CategoryWidget>
        <BottomBanner></BottomBanner>
        <TheFooter></TheFooter>
    </>
  )
}

export default CategoryPage
