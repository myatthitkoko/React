import { useEffect, useState } from "react";

function aWeekInAdvance (date, slots) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const sixDaysLater = new Date(today);
    sixDaysLater.setHours(0,0,0,0);
    sixDaysLater.setDate(today.getDate() + 6);

    if (date <= sixDaysLater) {
        return null;
    }

    return slots;
};

export default function useFetchAvailability(selected) {
    const [availability, setAvailability] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    async function refetchAvailability () {
        setLoading(true);
        //the following two lines to clean out old data from a different date
        setAvailability(null);
        setError("");
        
        fetch(`/api/availability/${selected}`)
        .then((res) => res.json())
        .then((data) => setAvailability(aWeekInAdvance(new Date(selected), data)))
        .catch(() => setError("Unable to load availability."))
        .finally(() => setLoading(false))
    }

    useEffect (() => {
       refetchAvailability(); 
    }, [selected]);

    return { availability, loading, error, refetchAvailability };
}