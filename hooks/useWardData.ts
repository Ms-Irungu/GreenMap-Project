import { useState, useEffect } from 'react';

// Define a type for the feature structure
type WardFeature = {
  properties: {
    NAME_3: string;
    // Add other properties if needed
  };
};


export const useWardData = () => {
    const [wardNames, setWardNames] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchWardData = async () => {
            try {
                const response = await fetch('/data/nairobiWards.geojson'); // Adjust the API endpoint as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch ward data');
                }
                const data = await response.json();

                // Extract unique, non-empty ward names from NAME_3 in the geojson data
                const names = Array.from(
                    new Set<string>(
                        (data.features ?? [])
                        .map((f: WardFeature) => f.properties.NAME_3)
                        .filter((name: string) => typeof name === "string" && name.trim() !== '' )
                    )
                );

                setWardNames(names);

            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };

        fetchWardData();
    }, []);

    return { wardNames, isLoading, error };

};