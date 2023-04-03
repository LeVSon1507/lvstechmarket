import React from 'react';
import NameBanner from '../NameBanner/NameBanner';
import ProductList from '../ProductList/ProductList';
import './ShopCategories.css';

function ShopCategories() {
   const [category, setCategory] = React.useState('');
   const [searchValue, setSearchValue] = React.useState('');
   const onChooseCategory = productCate => {
      setCategory(productCate);
   };
   const handleSearch = e => {
      setSearchValue(e.target.value);
   };

   return (
      <div className='container-fluid'>
         <NameBanner name={'SHOP'} />
         <div className='row container-fluid cateWrap'>
            <div className='categoriesBar col-md-4'>
               <h3 className='titleCate'>CATEGORIES</h3>
               <ul className='container'>
                  <li className='subTitleCate blackBgr'>APPLE</li>
                  <li
                     className={`cateText ${category === '' ? 'active' : ''}`}
                     onClick={() => onChooseCategory('')}
                  >
                     All
                  </li>
                  <li className='subTitleCate'>IPHONE & MAC</li>
                  <li
                     onClick={() => onChooseCategory('iphone')}
                     className={`cateText ${category === 'iphone' ? 'active' : ''}`}
                  >
                     Iphone
                  </li>
                  <li
                     onClick={() => onChooseCategory('ipod')}
                     className={`cateText ${category === 'ipod' ? 'active' : ''}`}
                  >
                     Ipod
                  </li>
                  <li
                     onClick={() => onChooseCategory('macbook')}
                     className={`cateText ${category === 'macbook' ? 'active' : ''}`}
                  >
                     Macbook
                  </li>
                  <li className='subTitleCate'>WIRELESS</li>
                  <li
                     onClick={() => onChooseCategory('airpod')}
                     className={`cateText ${category === 'airpod' ? 'active' : ''}`}
                  >
                     Airpod
                  </li>
                  <li
                     onClick={() => onChooseCategory('watch')}
                     className={`cateText ${category === 'watch' ? 'active' : ''}`}
                  >
                     Watch
                  </li>
                  <li className='subTitleCate'>OTHER</li>
                  <li
                     onClick={() => onChooseCategory('mouse')}
                     className={`cateText ${category === 'mouse' ? 'active' : ''}`}
                  >
                     Mouse
                  </li>
                  <li
                     onClick={() => onChooseCategory('keyboard')}
                     className={`cateText ${category === 'keyboard' ? 'active' : ''}`}
                  >
                     Keyboard
                  </li>
                  <li
                     onClick={() => onChooseCategory('other')}
                     className={`cateText ${category === 'other' ? 'active' : ''}`}
                  >
                     Other
                  </li>
               </ul>
            </div>
            <div className='categoriesProduct col-md-8'>
               <div className='headerProductCate'>
                  <input
                     type='text'
                     className='searchProductIp '
                     placeholder='Enter Search Here!'
                     onChange={e => handleSearch(e)}
                  />
                  <select>
                     <option value='defaultSort'>Default sorting</option>
                  </select>
               </div>
               <ProductList category={category} isShopPage={true} searchValue={searchValue} />
            </div>
         </div>
      </div>
   );
}

export default ShopCategories;
