import React from 'react'

import facebookLogo from './../assets/Facebook_Logo_Primary.png'
import instagramLogo from './../assets/Instagram_Glyph_Gradient.png'
import twitterLogo from './../assets/LI-In-Bug.png'
import linkedinLogo from './../assets/logo-black.png'

/**
 * Share To Social Media
 * 
 * Social media links to their respective websites.
 * 
 * Facebook logo sourced from: https://about.meta.com/uk/brand/resources/facebook/logo/
 * Instagram logo sourced from: https://about.meta.com/uk/brand/resources/instagram/instagram-brand/
 * Twitter logo sourced from: https://about.x.com/en/who-we-are/brand-toolkit
 * LinkedIn logo sourced from: https://brand.linkedin.com/downloads
 * 
 * @author Aiden Anderson W21047714
 */

function Share() {

  return (
    <div>
        <ul>
            <li>
                <a href="https://www.facebook.com/" rel="noopener noreferrer" target="_blank">
                    <img src={facebookLogo} alt="Facebook logo" />
                </a>
            </li>
            <li>
                <a href="https://www.instagram.com/" rel="noopener noreferrer" target="_blank">
                    <img src={instagramLogo} alt="Instagram logo" />
                </a>
            </li>
            <li>
                
                <a href="https://twitter.com/" rel="noopener noreferrer" target="_blank">
                    <img src={twitterLogo} alt="X logo also know as Twitters logo" />
                </a>
            </li>
            <li>
                <a href="https://www.linkedin.com/" rel="noopener noreferrer" target="_blank">
                    <img src={linkedinLogo} alt="LinkedIn logo" />
                </a>
            </li>
        </ul>
    </div>
  )

}

export default Share