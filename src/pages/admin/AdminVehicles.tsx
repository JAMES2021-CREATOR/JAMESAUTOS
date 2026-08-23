import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Car,
  X,
  Upload,
} from "lucide-react";

import { supabase } from "../../lib/supabase";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number | null;
  transmission: string | null;
  fuel_type: string | null;
  description: string | null;
  image_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

interface VehicleForm {
  brand: string;
  model: string;
  year: string;
  price: string;
  mileage: string;
  transmission: string;
  fuel_type: string;
  description: string;
  status: string;
}

const emptyForm: VehicleForm = {
  brand: "",
  model: "",
  year: "",
  price: "",
  mileage: "",
  transmission: "",
  fuel_type: "",
  description: "",
  status: "available",
};

const AdminVehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);

  const [editingVehicle, setEditingVehicle] =
    useState<Vehicle | null>(null);

  const [form, setForm] =
    useState<VehicleForm>(emptyForm);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState<string | null>(null);

  const [saving, setSaving] = useState(false);


  // =====================================================
  // LOAD VEHICLES
  // =====================================================

  const loadVehicles = async () => {
    try {
      setLoading(true);

      const {
        data,
        error,
      } = await supabase
        .from("vehicles")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        throw error;
      }

      setVehicles(data || []);

    } catch (error) {
      console.error(
        "Error loading vehicles:",
        error
      );
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadVehicles();
  }, []);


  // =====================================================
  // OPEN ADD MODAL
  // =====================================================

  const openAddModal = () => {
    setEditingVehicle(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
    setModalOpen(true);
  };


  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const openEditModal = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);

    setForm({
      brand: vehicle.brand,
      model: vehicle.model,
      year: String(vehicle.year),
      price: String(vehicle.price),
      mileage:
        vehicle.mileage !== null
          ? String(vehicle.mileage)
          : "",
      transmission:
        vehicle.transmission || "",
      fuel_type:
        vehicle.fuel_type || "",
      description:
        vehicle.description || "",
      status:
        vehicle.status || "available",
    });

    setImageFile(null);

    setImagePreview(
      vehicle.image_url || null
    );

    setModalOpen(true);
  };


  // =====================================================
  // CLOSE MODAL
  // =====================================================

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingVehicle(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
  };


  // =====================================================
  // FORM CHANGE
  // =====================================================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  // =====================================================
  // IMAGE SELECT
  // =====================================================

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImageFile(file);

    const preview =
      URL.createObjectURL(file);

    setImagePreview(preview);
  };


  // =====================================================
  // UPLOAD IMAGE
  // =====================================================

  const uploadImage = async (
    file: File
  ) => {
    const fileExtension =
      file.name.split(".").pop();

    const fileName =
      `${crypto.randomUUID()}.${fileExtension}`;

    const filePath =
      `vehicles/${fileName}`;

    const {
      error: uploadError,
    } = await supabase.storage
      .from("vehicle-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const {
      data,
    } = supabase.storage
      .from("vehicle-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };


  // =====================================================
  // SAVE VEHICLE
  // =====================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      let imageUrl =
        editingVehicle?.image_url || null;


      // Upload new image
      if (imageFile) {
        imageUrl =
          await uploadImage(imageFile);
      }


      const vehicleData = {
        brand: form.brand.trim(),
        model: form.model.trim(),
        year: Number(form.year),
        price: Number(form.price),
        mileage:
          form.mileage.trim() === ""
            ? null
            : Number(form.mileage),
        transmission:
          form.transmission.trim() || null,
        fuel_type:
          form.fuel_type.trim() || null,
        description:
          form.description.trim() || null,
        image_url: imageUrl,
        status: form.status,
        updated_at: new Date().toISOString(),
      };


      // EDIT
      if (editingVehicle) {

        const {
          error,
        } = await supabase
          .from("vehicles")
          .update(vehicleData)
          .eq(
            "id",
            editingVehicle.id
          );

        if (error) {
          throw error;
        }

      }

      // ADD
      else {

        const {
          error,
        } = await supabase
          .from("vehicles")
          .insert([
            vehicleData,
          ]);

        if (error) {
          throw error;
        }
      }


      closeModal();

      await loadVehicles();

    } catch (error) {
      console.error(
        "Error saving vehicle:",
        error
      );

      alert(
        "Unable to save vehicle. Check the console for details."
      );

    } finally {
      setSaving(false);
    }
  };


  // =====================================================
  // DELETE VEHICLE
  // =====================================================

  const handleDelete = async (
    vehicle: Vehicle
  ) => {

    const confirmed =
      window.confirm(
        `Delete ${vehicle.brand} ${vehicle.model}?`
      );

    if (!confirmed) return;

    try {

      const {
        error,
      } = await supabase
        .from("vehicles")
        .delete()
        .eq("id", vehicle.id);

      if (error) {
        throw error;
      }

      await loadVehicles();

    } catch (error) {

      console.error(
        "Error deleting vehicle:",
        error
      );

      alert(
        "Unable to delete vehicle."
      );
    }
  };


  // =====================================================
  // SEARCH
  // =====================================================

  const filteredVehicles =
    vehicles.filter((vehicle) => {

      const searchText =
        `${vehicle.brand} ${vehicle.model} ${vehicle.year}`
          .toLowerCase();

      return searchText.includes(
        search.toLowerCase()
      );
    });


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-500">
            Inventory
          </p>

          <h1 className="mt-2 text-3xl font-black">
            Vehicles
          </h1>

          <p className="mt-2 text-gray-400">
            Manage all vehicles listed on JamesAutos.
          </p>

        </div>


        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 font-bold text-black transition hover:bg-yellow-400"
        >

          <Plus size={19} />

          Add Vehicle

        </button>

      </div>


      {/* SEARCH */}

      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111720] px-4">

        <Search
          size={19}
          className="text-gray-500"
        />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search vehicles..."
          className="h-12 w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
        />

      </div>


      {/* TABLE */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111720]">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px] text-left">

            <thead className="border-b border-white/10 bg-white/[0.02]">

              <tr className="text-xs uppercase tracking-wider text-gray-500">

                <th className="px-6 py-4">
                  Vehicle
                </th>

                <th className="px-6 py-4">
                  Year
                </th>

                <th className="px-6 py-4">
                  Price
                </th>

                <th className="px-6 py-4">
                  Status
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>

              </tr>

            </thead>


            <tbody className="divide-y divide-white/5">

              {loading ? (

                <tr>

                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    Loading vehicles...
                  </td>

                </tr>

              ) : filteredVehicles.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center"
                  >

                    <Car
                      size={40}
                      className="mx-auto text-gray-700"
                    />

                    <p className="mt-3 text-gray-500">
                      No vehicles found.
                    </p>

                    <button
                      type="button"
                      onClick={openAddModal}
                      className="mt-4 text-sm font-semibold text-yellow-500 hover:text-yellow-400"
                    >
                      Add your first vehicle
                    </button>

                  </td>

                </tr>

              ) : (

                filteredVehicles.map(
                  (vehicle) => (

                    <tr
                      key={vehicle.id}
                      className="transition hover:bg-white/[0.02]"
                    >

                      {/* VEHICLE */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-4">

                          {vehicle.image_url ? (

                            <img
                              src={vehicle.image_url}
                              alt={`${vehicle.brand} ${vehicle.model}`}
                              className="h-14 w-20 rounded-lg object-cover"
                            />

                          ) : (

                            <div className="flex h-14 w-20 items-center justify-center rounded-lg bg-yellow-500/10 text-yellow-500">
                              <Car size={22} />
                            </div>

                          )}

                          <div>

                            <p className="font-semibold">
                              {vehicle.brand}{" "}
                              {vehicle.model}
                            </p>

                            <p className="mt-1 text-xs text-gray-500">
                              {vehicle.fuel_type ||
                                "Fuel not specified"}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* YEAR */}

                      <td className="px-6 py-5 text-gray-400">
                        {vehicle.year}
                      </td>


                      {/* PRICE */}

                      <td className="px-6 py-5 font-semibold">
                        ₦
                        {Number(
                          vehicle.price
                        ).toLocaleString()}
                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-5">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            vehicle.status.toLowerCase() ===
                            "available"
                              ? "bg-green-500/10 text-green-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          {vehicle.status}
                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td className="px-6 py-5">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              openEditModal(
                                vehicle
                              )
                            }
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-yellow-500/10 hover:text-yellow-500"
                            title="Edit vehicle"
                          >
                            <Edit size={18} />
                          </button>


                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                vehicle
                              )
                            }
                            className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                            title="Delete vehicle"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ==================================================
          ADD / EDIT MODAL
      ================================================== */}

      {modalOpen && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0c121a] shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

              <div>

                <h2 className="text-xl font-bold">

                  {editingVehicle
                    ? "Edit Vehicle"
                    : "Add Vehicle"}

                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Enter the vehicle information below.
                </p>

              </div>


              <button
                type="button"
                onClick={closeModal}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <X size={20} />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6"
            >

              {/* IMAGE */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Vehicle Image
                </label>

                <div className="rounded-xl border border-dashed border-white/10 bg-[#080d14] p-4">

                  {imagePreview ? (

                    <div className="relative">

                      <img
                        src={imagePreview}
                        alt="Vehicle preview"
                        className="h-56 w-full rounded-lg object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="absolute right-3 top-3 rounded-lg bg-black/70 p-2 text-white hover:bg-red-500"
                      >
                        <X size={18} />
                      </button>

                    </div>

                  ) : (

                    <label className="flex cursor-pointer flex-col items-center justify-center py-10 text-center">

                      <Upload
                        size={30}
                        className="text-yellow-500"
                      />

                      <p className="mt-3 font-medium">
                        Upload vehicle image
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        PNG, JPG or WEBP
                      </p>

                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                      />

                    </label>

                  )}

                </div>

              </div>


              {/* BRAND + MODEL */}

              <div className="grid gap-5 md:grid-cols-2">

                <InputField
                  label="Brand"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="Toyota"
                  required
                />

                <InputField
                  label="Model"
                  name="model"
                  value={form.model}
                  onChange={handleChange}
                  placeholder="Land Cruiser"
                  required
                />

              </div>


              {/* YEAR + PRICE */}

              <div className="grid gap-5 md:grid-cols-2">

                <InputField
                  label="Year"
                  name="year"
                  type="number"
                  value={form.year}
                  onChange={handleChange}
                  placeholder="2025"
                  required
                />

                <InputField
                  label="Price"
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="120000000"
                  required
                />

              </div>


              {/* MILEAGE + TRANSMISSION */}

              <div className="grid gap-5 md:grid-cols-2">

                <InputField
                  label="Mileage (km)"
                  name="mileage"
                  type="number"
                  value={form.mileage}
                  onChange={handleChange}
                  placeholder="15000"
                />

                <SelectField
                  label="Transmission"
                  name="transmission"
                  value={form.transmission}
                  onChange={handleChange}
                  options={[
                    "Automatic",
                    "Manual",
                    "CVT",
                  ]}
                />

              </div>


              {/* FUEL + STATUS */}

              <div className="grid gap-5 md:grid-cols-2">

                <SelectField
                  label="Fuel Type"
                  name="fuel_type"
                  value={form.fuel_type}
                  onChange={handleChange}
                  options={[
                    "Petrol",
                    "Diesel",
                    "Hybrid",
                    "Electric",
                  ]}
                />

                <SelectField
                  label="Status"
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  options={[
                    "available",
                    "sold",
                  ]}
                />

              </div>


              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Enter vehicle description..."
                  className="w-full rounded-xl border border-white/10 bg-[#080d14] px-4 py-3 text-sm text-white outline-none transition focus:border-yellow-500"
                />

              </div>


              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/5 disabled:opacity-50"
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-xl bg-yellow-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? "Saving..."
                    : editingVehicle
                    ? "Update Vehicle"
                    : "Add Vehicle"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
};


// =====================================================
// INPUT FIELD
// =====================================================

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const InputField = ({
  label,
  name,
  value,
  type = "text",
  placeholder,
  required = false,
  onChange,
}: InputFieldProps) => {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className="h-12 w-full rounded-xl border border-white/10 bg-[#080d14] px-4 text-sm text-white outline-none transition focus:border-yellow-500"
      />

    </div>
  );
};


// =====================================================
// SELECT FIELD
// =====================================================

interface SelectFieldProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const SelectField = ({
  label,
  name,
  value,
  options,
  onChange,
}: SelectFieldProps) => {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="h-12 w-full rounded-xl border border-white/10 bg-[#080d14] px-4 text-sm text-white outline-none transition focus:border-yellow-500"
      >

        <option value="">
          Select {label}
        </option>

        {options.map((option) => (

          <option
            key={option}
            value={option}
          >
            {option}
          </option>

        ))}

      </select>

    </div>
  );
};


export default AdminVehicles;