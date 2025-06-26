import { useState } from "react";
import axios from "axios";
import { months } from "@/components/utils/constants";

export type OverlayResult = {
    mapId: string | null;
    downloadUrl: string | null;
};

const useMapOverlay = () => {
    const [ndvi, setNdvi] = useState<OverlayResult>({ mapId: null, downloadUrl: null });
    const [lst, setLst] = useState<OverlayResult>({ mapId: null, downloadUrl: null });
    const [precipitation, setPrecipitation] = useState<OverlayResult>({ mapId: null, downloadUrl: null })
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOverlay = async (year: number, monthIndex: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await axios.post(`http://139.84.241.215/api/ndvi/`, {
                year,
                month: months[monthIndex],
            });

            console.log("API response:", res.data); // This helps identify if the response structure is as expected

            setNdvi({
                mapId: res.data.ndvi?.map_id ?? null,
                downloadUrl: res.data.ndvi?.download_url ?? null,
            });
            setLst({
                mapId: res.data.lst?.map_id ?? null,
                downloadUrl: res.data.lst?.download_url ?? null,
            });
            setPrecipitation({
                mapId: res.data.precipitation?.map_id ?? null,
                downloadUrl: res.data.precipitation?.download_url ?? null,
            });
            setDownloadUrl(res.data.ndvi?.download_url ?? null);

        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to fetch overlay");
            }
        }
        setIsLoading(false);
    };

    return {
        ndvi,
        lst,
        precipitation,
        downloadUrl,
        isLoading,
        error,
        fetchOverlay,
    };

}
export default useMapOverlay;