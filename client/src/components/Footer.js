import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTiktok, faTwitter, faYoutube, faTelegram } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const footerStyle = {
    backgroundColor: '#333',
    color: 'white',
    textAlign: 'center',
    padding: '10px',
  };

  const copyrightStyle = {
    color: 'white',
    marginTop: '1em',
    textAlign: 'center',
  };

  const contactStyle = {
    color: 'white',
    marginTop: '0.5em',
    textAlign: 'center',
  };

  const socialIconsStyle = {
    fontSize: '24px',
    marginTop: '1em',
  };

  return (
    <footer style={footerStyle}>
      <p style={copyrightStyle}>&copy; 2023 Doggybnb Platform. All rights reserved.</p>
      <p style={contactStyle}>Contacts: +254 711223344 | City: Nairobi | Street: 00100 Moi Avenue</p>

      <div style={socialIconsStyle}>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} style={{ color: 'white', margin: '10px' }} />
        </a>
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTiktok} style={{ color: 'white', margin: '10px' }} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} style={{ color: 'white', margin: '10px' }} />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} style={{ color: 'white', margin: '10px' }} />
        </a>
        <a href="https://t.me/your-telegram-link" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTelegram} style={{ color: 'white', margin: '10px' }} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
