import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AssignedDeliveries = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { refetch, data: parcels = [] } = useQuery({
    queryKey: ["parcels", user.emil, "driver_assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/parcels/rider?riderEmail=${user.email}&deliveryStatus=driver_assigned`
      );
      return res.data;
    },
  });
  const handleDeliveryStatusUpdate = (parcel, status) => {
    console.log(status);
    let message = `parcel status is updated with ${status
      .split("_")
      .join(" ")}`;
    const statusInfo = {
      deliveryStatus: status,
      riderId: parcel.riderId,
      trackingId: parcel.trackingId,
    };
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  console.log(parcels[1]);
  return (
    <div>
      <h3>Available Parcels for You: {parcels.length}</h3>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Place</th>
              <th>Cost</th>
              <th>Confirm</th>
              <th>Other Confirm</th>
              <th>Tracking Id</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.senderAddress}</td>
                <td>{parcel.cost}</td>
                <td className="flex space-x-1">
                  {parcel.deliveryStatus === "driver_assigned" ? (
                    <>
                      <button
                        onClick={() => {
                          handleDeliveryStatusUpdate(parcel, "rider_arriving");
                        }}
                        className="btn btn-primary text-black"
                      >
                        Accept
                      </button>
                      <button className="btn btn-warning text-black">
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-green-500 font-bold">
                      {parcel.deliveryStatus.split("_").join(" ")}
                    </span>
                  )}
                </td>
                <td className=" space-y-1 space-x-1">
                  {parcel.deliveryStatus !== "parcel_picked_up" && (
                    <button
                      onClick={() => {
                        handleDeliveryStatusUpdate(parcel, "parcel_picked_up");
                      }}
                      className="btn btn-primary text-black text-[10px]"
                    >
                      Mark as Picked Up
                    </button>
                  )}

                  <button
                    onClick={() => {
                      handleDeliveryStatusUpdate(parcel, "parcel_delivered");
                    }}
                    className="btn btn-primary text-black text-[10px]"
                  >
                    Mark as Delivered
                  </button>
                </td>
                <td>{parcel.trackingId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDeliveries;
