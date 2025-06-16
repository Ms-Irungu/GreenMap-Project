import { useState, useEffect } from 'react';

type WardFeature = {
        properties: {
            id: string;
            ward_name: string;
            mean_LST: number;
            mean_NDVI: number;
            time_range: string;
        };
    };

    type WardData = {
        features: WardFeature[];
    };

export const useWardData = () => {
    const [wardData, setWardData] = useState<WardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchWardData = async () => {
            try {
                const response = await fetch('/data/wardStats.geojson'); // Adjust the API endpoint as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch ward data');
                }
                const data = await response.json();
                setWardData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchWardData();
    }, []);

    return { wardData, isLoading, error };

}