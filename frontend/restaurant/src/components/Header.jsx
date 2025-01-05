import React from 'react';
import '../components/styles.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-section">
        <img src="/src/assets/3d@4x.png" alt="Logo" className="logo" />

       
      </div>

      <div className='banner'>

      <h1 className="slogen">Flavors of Italy, Served with Passion</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Category Name"
          className="category-name"
        />
        <button className="search-button">Search</button>
      </div>
      <img src='/src/assets/bannerImage.png' className='banner-img'></img>
      </div>
     
    </header>
  );
};

export default Header;
