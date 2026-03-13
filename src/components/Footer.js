import React from "react";

export default function Navbar(){
    return(
        <div className="footer">
            
            <div className="section-1" role="presentation">                
                <a className="systemStatus" target="_blank" rel="noreferrer" href="https://www.apple.com/support/systemstatus/" aria-label="System Status (opens in a new tab)">System Status</a>                                                            
                <a className="privacy" target="_blank" rel="noreferrer" href="https://www.apple.com/legal/privacy/" aria-label="Privacy Policy (opens in a new tab)">Privacy Policy</a>                
                <a className="terms" target="_blank" rel="noreferrer" href="https://www.apple.com/legal/internet-services/icloud/" aria-label="Terms &amp; Conditions (opens in a new tab)">Terms &amp; Conditions</a>    
            </div>

            <div className="section-2">
                <p>Copyright © 2026 Apple Inc. All rights reserved.</p>
                </div>

        </div>
    )
}
