'use client'
import {useSearchParams} from 'next/navigation'
export function Filters() {
    const searchParams = useSearchParams();
    let startDate = new Date(searchParams.get('start-date') || (Date.now() - 3.154e+10));
    let endDate = new Date(searchParams.get('end-date') || Date.now());

    
    
    return (
        <section className="mb-10 mt-10">
            <div className="">
                <h4 className="text-center">Select Date Range: </h4>
                <form className="flex justify-around flex-wrap gap-4">
                    <div className="border border-border p-2">
                        <label htmlFor="start-date">{'Start Date: '}</label>
                        <input type="date" defaultValue={`${startDate.getFullYear()}-${String(startDate.getMonth()).padStart(2,'0')}-${String(startDate.getDate()).padStart(2, '0')}`} name="start-date" id="start-date"/>
                    </div>
                    <div className="border border-border p-2">
                        <label htmlFor="end-date">{'End Date: '}</label>
                        <input type="date" defaultValue={`${endDate.getFullYear()}-${String(endDate.getMonth()).padStart(2,'0')}-${String(endDate.getDate()).padStart(2, '0')}`} name="end-date" id="end-date"/>
                    </div>

                    <button type="submit">Apply</button>
                </form>
            </div>
        </section>
    )
}
