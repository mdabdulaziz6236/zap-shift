import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaEye, FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveRiders = () => {
  const axiosSecure = useAxiosSecure();
 

  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });
  /* handle update Rider Status */
  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status is set to ${status} `,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  /* handle Approval */
  const handleApproval = (rider) => {
    updateRiderStatus(rider, "approved");
  };
  /* handle Rejection */
  const handleRejection = (rider) => {
    updateRiderStatus(rider, "rejected");
  };

  return (
    <div>
      <h2 className="text-5xl">Riders Pending Approval:{riders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Application Status</th>
              <th>Work Status</th>
              <th>District</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>
                  <p
                    className={`${
                      rider.status === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>
                  <p
                    className={`${
                      rider.workStatus === "available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {rider.workStatus}
                  </p>
                </td>
                <td>{rider.district}</td>
                <td className="flex space-x-1">
                  <button onClick={() => handleApproval(rider)} className="btn">
                    <FaUserCheck />
                  </button>
                  <button className="btn">
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleRejection(rider)}
                    className="btn"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                  <button className="btn">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
    </div>
  );
};

export default ApproveRiders;
