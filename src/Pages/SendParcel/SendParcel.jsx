import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    control,
    /*  formState: { errors }, */
  } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure();
  const warehouses = useLoaderData();
  const regionsDuplicate = warehouses.map((w) => w.region);
  const regions = [...new Set(regionsDuplicate)];
  // console.log(regions);
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const districtByRegion = (region) => {
    const regionDistricts = warehouses.filter((w) => w.region === region);
    // console.log(regionDistricts);
    const districts = regionDistricts.map((d) => d.district);
    // console.log(districts);
    return districts;
  };
  const handleSendParcel = (data) => {
    console.log(data);
    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);
    let cost = 0;
    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    data.cost = cost;
    Swal.fire({
      title: "Agree with the Cost ?",
      text: `You will be charged ${cost} Taka !`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and continue Payment!",
    }).then((result) => {
      if (result.isConfirmed) {
        /* save the data into the database */
        axiosSecure.post("/parcels", data).then((res) => {
          console.log("after saving data in db", res.data);
          alert('Alhamdulillah')
          if (res.data.insertedId) {

            navigate('/dashboard/my-parcels')
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Parcel has created. Please Pay",
              showConfirmButton: false,
              timer: 2500,
            });
          }
        });
        /* if confirmed  */
        // Swal.fire({
        //   title: "Successfully !",
        //   text: "Your parcel has been confirmed.",
        //   icon: "success"
        // });
      }
    });
    console.log("Cost:", cost);
  };
  return (
    <div className="p-20">
      <h2 className="text-5xl font-bold">Send A Parcel</h2>
      <form
        className="mt-12 text-black p-4"
        onSubmit={handleSubmit(handleSendParcel)}
      >
        {/* parcel type */}
        <div>
          <label className="label">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio"
              defaultChecked
            />{" "}
            Document
          </label>
          <label className="label ml-4">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="radio"
              defaultChecked
            />{" "}
            Non-Document
          </label>
        </div>
        {/* parcel info: name, weight */}
        <div className="grid grid-cols-1 my-8 md:grid-cols-2 gap-12 ">
          <fieldset className="fieldset">
            <label className="label">Parcel Name</label>
            <input
              type="text"
              {...register("parcelName")}
              className="input w-full"
              placeholder="Parcel Name"
            />
          </fieldset>
          <fieldset className="fieldset">
            <label className="label">Parcel Weight (kg)</label>
            <input
              type="text"
              required
              {...register("parcelWeight")}
              className="input w-full"
              placeholder="Parcel Weight"
            />
          </fieldset>
        </div>
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* -----------------sender Details------------ */}
          <div>
            <h3 className="text-3xl font-semibold">Sender Details</h3>
            <fieldset className="fieldset">
              {/* sender name */}
              <label className="label">Sender Name</label>
              <input
                type="text"
                defaultValue={user?.displayName}
                {...register("senderName")}
                className="input w-full"
                placeholder="Sender Name"
              />
              {/* sender Email */}
              <label className="label">Sender Email</label>
              <input
                type="email"
                {...register("senderEmail")}
                defaultValue={user?.email}
                className="input w-full"
                placeholder="Sender Email"
              />
              {/* sender region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender Region</legend>
                <select
                  {...register("senderRegion")}
                  defaultValue="Pick a Region"
                  className="select"
                >
                  <option disabled={true}>Pick a Region</option>
                  {regions.map((r, index) => (
                    <option key={index}>{r}</option>
                  ))}
                </select>
              </fieldset>
              {/* sender Districts */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Sender District</legend>
                <select
                  {...register("senderDistrict")}
                  defaultValue="Pick a District"
                  className="select"
                >
                  <option disabled={true}>Pick a District</option>
                  {districtByRegion(senderRegion).map((d, index) => (
                    <option key={index} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </fieldset>
              {/* sender address */}
              <label className="label mt-4">Sender Address</label>
              <input
                type="text"
                {...register("senderAddress")}
                className="input w-full"
                placeholder="Sender Address"
              />
            </fieldset>
          </div>
          {/* Receiver info */}
          <div>
            <h3 className="text-3xl font-semibold">Receiver Details</h3>
            <fieldset className="fieldset">
              {/* Receiver name */}
              <label className="label">Receiver Name</label>
              <input
                type="text"
                {...register("receiverName")}
                className="input w-full"
                placeholder="Receiver Name"
              />
              {/* Receiver Email */}
              <label className="label">Receiver Email</label>
              <input
                type="email"
                {...register("receiverEmail")}
                className="input w-full"
                placeholder="Receiver Name"
              />
              {/* receiver region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Receiver Region</legend>
                <select
                  {...register("receiverRegion")}
                  defaultValue="Pick a Region"
                  className="select"
                >
                  <option disabled={true}>Pick a Region</option>
                  {regions.map((r, index) => (
                    <option key={index}>{r}</option>
                  ))}
                </select>
              </fieldset>
              {/* Receiver District */}
              <label className="label mt-4">Receiver District</label>
              <select
                {...register("receiverDistrict")}
                defaultValue="Pick a District"
                className="select"
              >
                <option disabled={true}>Pick a District</option>
                {districtByRegion(receiverRegion).map((d, index) => (
                  <option value={d} key={index}>
                    {d}
                  </option>
                ))}
              </select>
              {/* Receiver address */}
              <label className="label mt-4">Receiver Address</label>
              <input
                type="text"
                {...register("receiverAddress")}
                className="input w-full"
                placeholder="Receiver Address"
              />
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          className="btn mt-8 bg-primary text-black"
          value="Proceed to Confirm Booking"
        />
      </form>
    </div>
  );
};

export default SendParcel;
