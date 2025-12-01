import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";

const ParcelTrack = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();
  const { data: tracings = [] } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });
  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <h3 className="text-center pb-10 text-3xl font-bold">
        Track your parcel : {trackingId}
      </h3>
      <p>Logs so far : {tracings.length}</p>
      <ul className="timeline timeline-vertical">
        {/* id
692c0fb2e22239cccfa26016
trackingId
"PRCL-20251130-7B9577"
status
"parcel_delivered"
details
"parcel_delivered"
createdAt
2025-11-30T09:34:42.841+00:00 */}
        {tracings.map((log) => (
          <li key={log._id}>
            <div className="timeline-start">
              <span className=" font-bold">
                {new Date(log.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box">
              <span className="text-xl font-bold">
                {log.details.split("_").join(" ")}
              </span>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParcelTrack;
