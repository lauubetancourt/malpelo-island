import './Section.css'
import React from 'react';

const Section = ({name, image, description}) => {

  return(
    <>
      <div className='section'> 
        <img className="section-image" src={image} alt={name} />
        <div>
          <h3 className='section-name'>{name}</h3>
          <p className='section-decription'>{description}</p>
        </div>
      </div>
    </>
  );
}

export default Section;