import React from 'react';

const Button = (url,blank=false) => {
  const openUrl = () => {
    if(blank===true){
        window.open(url, '_blank'); // Opens the URL in a new tab
    }else{
        window.open(url);        
    }
  };

  return (
    <button onClick={openUrl}>Open URL</button>
  );
};

export default Button;
