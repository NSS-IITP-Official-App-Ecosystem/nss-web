export const getWingBadgeStyle = (wingName) => {
    const name = wingName.toLowerCase();
    if (name.includes('health') || name.includes('chetna')) {
        return 'bg-rose-50 text-rose-700 border-rose-100';
    }
    if (name.includes('environment')) {
        return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    }
    if (name.includes('rural')) {
        return 'bg-amber-50 text-amber-700 border-amber-100';
    }
    if (name.includes('teaching') || name.includes('education') || name.includes('technical') || name.includes('adhyayan')) {
        return 'bg-indigo-50 text-indigo-700 border-indigo-100';
    }
    if (name.includes('prayatna') || name.includes('pr')) {
        return 'bg-purple-50 text-purple-700 border-purple-100';
    }
    return 'bg-slate-50 text-slate-600 border-slate-200';
};
