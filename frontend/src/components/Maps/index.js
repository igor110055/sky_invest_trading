import React from "react";

//Maps
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

const Map = () => {
    return (
        <GoogleMap
            defaultZoom={12}
            defaultCenter={{
                lat: 42.8719304,
                lng: 74.6114867,
            }}
        />
    );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

const MapContainer = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                borderRadius: 10,
            }}
        >
            <WrappedMap
                googleMapURL={
                    "https://maps.googleapis.com/maps/api/js?v=3.exp6libraries=geometry,drawing,places"
                }
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
            />
        </div>
    );
};

export default MapContainer;
