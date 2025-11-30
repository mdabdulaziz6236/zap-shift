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
  const handleAcceptDelivery = (parcel) => {
    console.log(parcel);
    const statusInfo = { deliveryStatus: "rider_arriving" };
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        console.log(res.data)
        if (res.data.modifiedCount) {
          refetch()
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Thank you for accepting this ' ${parcel.parcelName} ' parcel.`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
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
                  <button
                    onClick={() => {
                      handleAcceptDelivery(parcel);
                    }}
                    className="btn btn-primary text-black"
                  >
                    Accept
                  </button>
                  <button className="btn btn-warning text-black">Reject</button>
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
