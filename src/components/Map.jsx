import { useState, useEffect, useRef } from "react";

const Map = () => {
    const [data, setData] = useState(null);
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const infoWindowRef = useRef(null);

    // Load counts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/stateCounts.json");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        async function initMap() {
            try {
                const { Map, InfoWindow } = await google.maps.importLibrary("maps");

                if (!mapRef.current) return;

                // Create map
                mapInstanceRef.current = new Map(mapRef.current, {
                    center: { lat: 20.5937, lng: 78.9629 },
                    zoom: 5,
                    mapId: "62554ffef83baf70e8bec90c",
                });

                // Create one InfoWindow for hover
                infoWindowRef.current = new InfoWindow();

                styleSetter();
            } catch (error) {
                console.error("Error initializing map:", error);
            }
        }

        function styleSetter() {
            try {
                if (mapInstanceRef.current && data) {
                    const datasetLayer =
                        mapInstanceRef.current.getDatasetFeatureLayer(
                            "3a90f68c-c8f6-4f16-9934-2cf7353c3067"
                        );

                    // Style states based on counts
                    datasetLayer.style = (params) => {
                        const datasetFeature = params.feature;
                        const stateName = datasetFeature.datasetAttributes["NAME_1"];
                        const count = data[stateName] || 0;

                        let fillColor = "#f7f7f7"; // default
                        if (count > 10) fillColor = "#bd0026";
                        else if (count > 5) fillColor = "#f03b20";
                        else if (count > 3) fillColor = "#fd8d3c";
                        else if (count > 0) fillColor = "#fecc5c";

                        return {
                            fillColor,
                            strokeColor: "#555",
                            strokeWeight: 1,
                            fillOpacity: 0.8,
                        };
                    };

                    // Hover event → show tooltip
                    datasetLayer.addListener("mousemove", (e) => {
                        if (e.features && e.features.length > 0) {
                            const feature = e.features[0];
                            const stateName = feature.datasetAttributes["NAME_1"];
                            const count = data[stateName] || 0;

                            infoWindowRef.current.setContent(
                                `<div style="font-size:14px;">
                                    <strong>${stateName}</strong><br/>
                                    Count: ${count}
                                </div>`
                            );

                            infoWindowRef.current.setPosition(e.latLng);
                            infoWindowRef.current.open({
                                map: mapInstanceRef.current,
                                shouldFocus: false,
                            });
                        }
                    });

                    // Hide tooltip when mouse leaves state
                    datasetLayer.addListener("mouseout", () => {
                        infoWindowRef.current.close();
                    });
                }
            } catch (error) {
                console.error("Error setting map styles:", error);
            }
        }

        if (data) {
            initMap();
        }
    }, [data]);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-5">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    Manufacturer Non-Compliant Distribution Map
                </h3>
                <p className="text-sm text-gray-600">
                    Geographic distribution of non-compliant product manufacturers
                </p>
            </div>
            <div
                ref={mapRef}
                className="w-full h-96 rounded-lg border border-gray-200"
                style={{ minHeight: "400px" }}
            />
        </div>
    );
};

export default Map;
