import './Prayatna.css';

export default function Prayatna() {
    return (
        <div className="prayatna-wing-container">

            {/* Heading at the absolute top of the page viewport */}
            <h1 className="prayatna-title">PRAYATNA DRIVE</h1>

            {/* Centered content wrapper framework */}
            <div className="prayatna-content-wrapper">

                {/* High contrast text overlay bubble */}
                <div className="prayatna-ellipse">
                    <p>
                        Prayatna is a donation drive where we are trying to donate as much
                        as we can to help people in need. Through this initiative, we collect
                        essential items like clothes, books, food, and daily necessities to
                        support underprivileged communities. Our goal is to spread kindness,
                        bring smiles to lives, and encourage everyone to contribute for a
                        better society.
                    </p>
                </div>

            </div>
        </div>
    );
}