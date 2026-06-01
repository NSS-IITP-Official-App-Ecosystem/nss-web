"use client"
export default function GalleryPage() {
    return (
        <>
            <Banner></Banner>
            <Filters></Filters>
        </>
    )
}

function Banner() {
    return (
        <section className="h-[50vh] flex justify-center items-center max-h-125" style={{ background: "linear-gradient(135deg, var(--brand-blue) , var(--foreground))" }}>
            <div className="flex items-center flex-col">
                <p className="text-center uppercase pbs-2 pbe-2 ps-3 pe-3 rounded-full border border-border backdrop-blur-4xl bg-[#ffffff17] text-[0.6rem] text-white font-mono mb-2">Highlights of Our Events</p>
                <h1 className="text-center uppercase text-transparent font-mono text-6xl bg-clip-text" style={{
                    background: 'linear-gradient(135deg, #ff007b, #6b11ff, #00d2ff)', WebkitBackgroundClip: 'text'
                }}>Gallery</h1>
            </div>
        </section>
    )
}

function Filters() {
    // const urlParams = new URLSearchParams(location.search);
    // let startDate = urlParams.get('start-date') || (Date.now() - 3.154e+10);
    // let endDate = urlParams.get('end-date') || Date.now();
    // const date = new Date();

    
    
    return (
        <section className="mb-10 mt-10">
            <div className="">
                <h4 className="text-center">Select Date Range: </h4>
                <form className="flex justify-around flex-wrap gap-4">
                    <div className="border border-border p-2">
                        <label htmlFor="start-date">{'Start Date: '}</label>
                        <input type="date" name="start-date" id="start-date"></input>
                    </div>
                    <div className="border border-border p-2">
                        <label htmlFor="end-date">{'End Date: '}</label>
                        <input type="date" name="end-date" id="end-date"></input>
                    </div>

                    <button type="submit">Apply</button>
                </form>
            </div>
        </section>
    )
}

