import React from "react";
import { useForm, useWatch } from "react-hook-form";   
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    /*  formState: { errors }, */
  } = useForm();
  
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const warehouses = useLoaderData();
  const regionsDuplicate = warehouses.map((w) => w.region);
  const regions = [...new Set(regionsDuplicate)];
  // console.log(regions);
  const riderRegion = useWatch({ control, name: "region" });
  //   const receiverRegion = useWatch({ control, name: "receiverRegion" });
  const districtByRegion = (region) => {
    const regionDistricts = warehouses.filter((w) => w.region === region);
    // console.log(regionDistricts);
    const districts = regionDistricts.map((d) => d.district);
    // console.log(districts);
    return districts;
  };
  const handleRiderApplication = (data) => {
    console.log(data);
    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        navigate('/')
        Swal.fire({
          position: "top-end",
          icon: "success",
          title:
            "Your application has been submitted. We will reach to you in 145 days",
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  return (
    <div>
      <h3 className="text-4xl text-primary">Be a Rider</h3>
      <form
        className="mt-12 text-black p-4"
        onSubmit={handleSubmit(handleRiderApplication)}
      >
        {/* two column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* -----------------sender Details------------ */}
          <div>
            <h3 className="text-3xl font-semibold">Rider Details</h3>
            <fieldset className="fieldset">
              {/* Rider name */}
              <label className="label">Your Name</label>
              <input
                type="text"
                {...register("name")}
                className="input w-full"
                placeholder="Your Name"
              />
              {/* Rider Email */}
              <label className="label">Your Email</label>
              <input
                type="email"
                {...register("email")}
                className="input w-full"
                placeholder="Your Email"
              />
              {/* Rider region */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend"> Region</legend>
                <select
                  {...register("region")}
                  defaultValue="Pick a Region"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a Region</option>
                  {regions.map((r, index) => (
                    <option key={index}>{r}</option>
                  ))}
                </select>
              </fieldset>
              {/* sender Districts */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">District</legend>
                <select
                  {...register("district")}
                  defaultValue="Pick a District"
                  className="select w-full"
                >
                  <option disabled={true}>Pick a District</option>
                  {districtByRegion(riderRegion).map((d, index) => (
                    <option key={index} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* sender address */}
              <label className="label mt-4">Rider Address</label>
              <input
                type="text"
                {...register("address")}
                className="input w-full"
                placeholder="Your Address"
              />
            </fieldset>
          </div>
          <div>
            <h3 className="text-3xl font-semibold">More Details</h3>
            <fieldset className="fieldset">
              {/* Rider age */}
              <label className="label">Your Age</label>
              <input
                type="text"
                {...register("age")}
                className="input w-full"
                placeholder="Your Age"
              />
              {/* Rider driving license number */}
              <label className="label">Driving License Number</label>
              <input
                type="text"
                {...register("drivingLicense")}
                className="input w-full"
                placeholder="Driving License Number"
              />

              {/* Rider NID */}
              <label className="label mt-4">NID NO</label>
              <input
                type="number"
                {...register("nid")}
                className="input w-full"
                placeholder="Your NID Number"
              />
              {/* Rider Bike */}
              <label className="label mt-4">Bike</label>
              <input
                type="text"
                {...register("bike")}
                className="input w-full"
                placeholder="Your Bike info"
              />
            </fieldset>
          </div>
        </div>
        <input
          type="submit"
          className="btn mt-8 bg-primary text-black"
          value="Apply as a Rider"
        />
      </form>
    </div>
  );
};

export default Rider;
