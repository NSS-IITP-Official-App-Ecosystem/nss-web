import React from 'react';
import './Teaching.css';

function Teaching() {
    return (
        <div className="teaching-wing-container">

            {/* Heading at the absolute top of the page */}
            <h1 className="teaching-title">TEACHING WING</h1>

            {/* Centered content wrapper */}
            <div className="teaching-content-wrapper">

                {/* Transparent Ellipse containing your paragraph */}
                <div className="teaching-ellipse">
                    <p>
                        Teaching is a noble profession that helps shape the future of society.
                        Teachers guide students, share knowledge, and help them develop good
                        values and skills. Good teaching inspires students to learn and achieve
                        success in life. A teacher plays an important role in building a
                        strong and educated nation.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Teaching;