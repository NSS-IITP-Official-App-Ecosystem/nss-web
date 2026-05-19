import './Rural.css';

export default function Rural() {
    return (
        <div className="rural-page-container">

            {/* Heading at the absolute top of the page viewport */}
            <h1 className="top-page-title">RURAL DEVELOPMENT</h1>

            {/* Centered content wrapper framework */}
            <div className="content-wrapper">

                {/* High contrast text overlay bubble */}
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