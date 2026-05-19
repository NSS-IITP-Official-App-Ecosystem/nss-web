import './Environmental.css';

export default function Environmental() {
    return (
        <div className="environmental-page-container">

            {/* Heading at the absolute top of the page viewport */}
            <h1 className="environmental-title">ENVIRONMENTAL WING</h1>

            {/* Centered content wrapper framework */}
            <div className="environmental-content-wrapper">

                {/* High contrast text overlay bubble */}
                <div className="environmental-ellipse">
                    <p>
                        Saving the environment is important for a healthy and safe future.
                        We should plant more trees, reduce pollution, save water, and avoid
                        wasting natural resources. Using eco-friendly products and recycling
                        waste can also help protect nature. If everyone takes small steps,
                        we can make the Earth cleaner and greener for future generations.
                    </p>
                </div>

            </div>
        </div>
    );
}