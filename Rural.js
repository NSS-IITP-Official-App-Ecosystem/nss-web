import React from 'react';
import './Rural.css';

function Rural() {
    return (
        <div className="rural-page-container">

            {/* 1. Main Heading at the absolute top of the page */}
            <h1 className="top-page-title">RURAL DEVELOPMENT</h1>

            {/* 2. Middle Content Area */}
            <div className="content-wrapper">

                {/* Transparent Ellipse containing the passage */}
                <div className="ellipse-badge">
                    <p>
                        Rural development means improving the living conditions of people
                        in villages and rural areas. It includes better education, healthcare,
                        roads, electricity, and employment opportunities. Agriculture plays
                        an important role in rural development, as most rural people depend
                        on farming for their livelihood. Development in rural areas helps
                        reduce poverty and improves the overall growth of India.
                    </p>
                </div>

            </div>
        </div>
    );
}

export default Rural;