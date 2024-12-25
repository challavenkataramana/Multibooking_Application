import React from "react";
import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-row">
          <div className="portal-details">
            <div className="portal-name"><h3>Booking Portal</h3></div>
            <div className="icons">
              <FontAwesomeIcon icon={faFacebook} style={{ fontSize: "24px", color: "#4267B2" }} />
              <FontAwesomeIcon icon={faYoutube} style={{ fontSize: "24px", color: "#4267B2" }} />
              <FontAwesomeIcon icon={faInstagram} style={{ fontSize: "24px", color: "#4267B2" }} />
              <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: "24px", color: "#4267B2" }} />
            </div>
          </div>
        </div>
        <div className="footer-row">
          <div className="country-dropdown">
            <select id="country-select" name="country" defaultValue="in">
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
              <option value="in">India</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
              <option value="de">Germany</option>
              <option value="fr">France</option>
            </select>
          </div>
        </div>
        <div className="footer-row">
           <div class="company-info">
                <p><a href="#">Company</a></p>
                <p><a href="#">Jobs</a></p>
                <p><a href="#">Press</a></p>
                <p><a href="#">Investor Relations</a></p>
                <p><a href="#">Mobile apps - searching on the go</a></p>
                <p><a href="#">Cyber Security</a></p>
           </div>
           <div class="company-info">
                <p><a href="#">Company</a></p>
                <p><a href="#">Jobs</a></p>
                <p><a href="#">Press</a></p>
                <p><a href="#">Investor Relations</a></p>
                <p><a href="#">Mobile apps - searching on the go</a></p>
                <p><a href="#">Cyber Security</a></p>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
