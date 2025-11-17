import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLoaderData } from "react-router";

const Coverage = () => {
  const position = [23.685, 90.3563];
  const warehouses = useLoaderData();
  const mapRef = useRef(null);
  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = warehouses.find((w) =>
      w.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      console.log(district, coord);
      /* go to the location */
      mapRef.current.flyTo(coord, 14);
    }
  };
  return (
    <div className="">
      <div className="p-20 shadow rounded my-8">
        <h2 className="text-5xl">We are available in 64 districts</h2>
        <div>
          {/* search */}
          <form onSubmit={handleSearch} className="my-5 ">
            <label className="input">
              <svg
                className="h-[2em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                name="location"
                type="search"
                className="grow font-bold text-secondary text-xl"
                placeholder="Search here."
              />
            </label>
          </form>
        </div>
        {/*  */}
        <div className="border w-full h-[800px]">
          <MapContainer
            center={position}
            zoom={8}
            scrollWheelZoom={false}
            className="h-[800px]"
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {warehouses.map((warehouse, index) => (
              <Marker
                key={index}
                position={[warehouse.latitude, warehouse.longitude]}
              >
                <Popup>
                  {" "}
                  <strong>{warehouse.district}</strong> <br /> Service Area:{" "}
                  {warehouse.covered_area.join(", ")}.
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
