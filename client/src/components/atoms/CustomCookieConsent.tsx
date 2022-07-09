import React from 'react';
import CookieConsent from 'react-cookie-consent';

function CustomCookieConsent() {
  return (
    <CookieConsent
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', opacity: '0.8' }}
      buttonStyle={{ color: '#4e503b', fontSize: '16px', borderRadius: '10px' }}
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  );
}

export default CustomCookieConsent;
