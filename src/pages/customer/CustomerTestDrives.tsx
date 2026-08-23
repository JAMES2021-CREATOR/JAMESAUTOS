import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Calendar,
  Car,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  year: number;
  image_url: string | null;
}

interface TestDrive {
  id: string;
  vehicle_id: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
  notes: string | null;
  created_at: string;
  vehicles: Vehicle[] | null;
}

const CustomerTestDrives = () => {
  const [searchParams] = useSearchParams();

  const vehicleId = searchParams.get("vehicle");

  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [testDrives, setTestDrives] = useState<TestDrive[]>([]);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        // =================================================
        // LOAD SELECTED VEHICLE
        // =================================================

        if (vehicleId) {
          const {
            data: vehicleData,
            error: vehicleError,
          } = await supabase
            .from("vehicles")
            .select(
              "id, brand, model, year, image_url"
            )
            .eq("id", vehicleId)
            .single();

          if (vehicleError) {
            console.error(
              "Vehicle loading error:",
              vehicleError
            );
          } else if (vehicleData) {
            setVehicle(vehicleData);
          }
        }

        // =================================================
        // LOAD CUSTOMER TEST DRIVES
        // =================================================

        const {
          data,
          error,
        } = await supabase
          .from("test_drives")
          .select(`
            id,
            vehicle_id,
            preferred_date,
            preferred_time,
            status,
            notes,
            created_at,
            vehicles (
              id,
              brand,
              model,
              year,
              image_url
            )
          `)
          .eq("user_id", user.id)
          .order("created_at", {
            ascending: false,
          });

        if (error) {
          console.error(
            "Test drives loading error:",
            error
          );
        } else if (data) {
          setTestDrives(
            data as unknown as TestDrive[]
          );
        }
      } catch (error) {
        console.error(
          "Customer test drives error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [vehicleId]);

  // =====================================================
  // BOOK TEST DRIVE
  // =====================================================

  const handleBooking = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!vehicleId) {
      alert("Please select a vehicle first.");
      return;
    }

    if (!date || !time) {
      alert(
        "Please select a date and time."
      );
      return;
    }

    try {
      setBooking(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert(
          "Please login before booking a test drive."
        );
        return;
      }

      // =================================================
      // INSERT TEST DRIVE
      // =================================================

      const { error } = await supabase
        .from("test_drives")
        .insert({
          user_id: user.id,
          vehicle_id: vehicleId,
          preferred_date: date,
          preferred_time: time,
          notes: notes.trim() || null,
          status: "pending",
        });

      if (error) {
        console.error(
          "Booking insert error:",
          error
        );

        alert(
          `Unable to book test drive: ${error.message}`
        );

        return;
      }

      alert(
        "Test drive request submitted successfully!"
      );

      // Clear form
      setDate("");
      setTime("");
      setNotes("");

      // =================================================
      // RELOAD TEST DRIVES
      // =================================================

      const {
        data: refreshedData,
        error: refreshError,
      } = await supabase
        .from("test_drives")
        .select(`
          id,
          vehicle_id,
          preferred_date,
          preferred_time,
          status,
          notes,
          created_at,
          vehicles (
            id,
            brand,
            model,
            year,
            image_url
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", {
          ascending: false,
        });

      if (refreshError) {
        console.error(
          "Refresh test drives error:",
          refreshError
        );
      } else if (refreshedData) {
        setTestDrives(
          refreshedData as unknown as TestDrive[]
        );
      }
    } catch (error) {
      console.error(
        "Test drive booking error:",
        error
      );

      alert(
        "Unable to book test drive. Please try again."
      );
    } finally {
      setBooking(false);
    }
  };

  // =====================================================
  // STATUS
  // =====================================================

  const getStatusStyle = (
    status: string
  ) => {
    switch (status.toLowerCase()) {
      case "approved":
        return {
          className:
            "bg-green-500/10 text-green-400 border-green-500/20",
          icon: <CheckCircle size={15} />,
        };

      case "cancelled":
        return {
          className:
            "bg-red-500/10 text-red-400 border-red-500/20",
          icon: <XCircle size={15} />,
        };

      default:
        return {
          className:
            "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
          icon: <Clock size={15} />,
        };
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center text-white">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-yellow-500/20 border-t-yellow-500" />

          <p className="mt-4 text-sm text-gray-500">
            Loading test drives...
          </p>

        </div>
      </div>
    );
  }

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="space-y-8 text-white">

      {/* HEADER */}

      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-yellow-500">
          JamesAutos
        </p>

        <h1 className="mt-2 text-3xl font-black">
          Test Drives
        </h1>

        <p className="mt-2 text-gray-400">
          Book a test drive and manage your requests.
        </p>
      </div>

      {/* =================================================
          BOOKING SECTION
      ================================================= */}

      {vehicle && (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111720]">

          <div className="grid lg:grid-cols-[280px_1fr]">

            {/* VEHICLE IMAGE */}

            <div className="h-56 bg-[#080d14] lg:h-full">

              {vehicle.image_url ? (
                <img
                  src={vehicle.image_url}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Car
                    size={60}
                    className="text-gray-700"
                  />
                </div>
              )}

            </div>

            {/* FORM */}

            <div className="p-6 sm:p-8">

              <p className="text-xs font-bold uppercase tracking-wider text-yellow-500">
                Selected Vehicle
              </p>

              <h2 className="mt-2 text-2xl font-black">
                {vehicle.brand} {vehicle.model}
              </h2>

              <p className="mt-1 text-gray-500">
                {vehicle.year} Model
              </p>

              <form
                onSubmit={handleBooking}
                className="mt-6 space-y-5"
              >

                {/* DATE + TIME */}

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* DATE */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Preferred Date
                    </label>

                    <div className="flex items-center rounded-xl border border-white/10 bg-[#0c121a] px-4">

                      <Calendar
                        size={18}
                        className="text-yellow-500"
                      />

                      <input
                        type="date"
                        value={date}
                        min={
                          new Date()
                            .toISOString()
                            .split("T")[0]
                        }
                        onChange={(e) =>
                          setDate(e.target.value)
                        }
                        className="h-12 w-full bg-transparent px-3 text-sm text-white outline-none"
                        required
                      />

                    </div>
                  </div>

                  {/* TIME */}

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-300">
                      Preferred Time
                    </label>

                    <div className="flex items-center rounded-xl border border-white/10 bg-[#0c121a] px-4">

                      <Clock
                        size={18}
                        className="text-yellow-500"
                      />

                      <input
                        type="time"
                        value={time}
                        onChange={(e) =>
                          setTime(e.target.value)
                        }
                        className="h-12 w-full bg-transparent px-3 text-sm text-white outline-none"
                        required
                      />

                    </div>
                  </div>

                </div>

                {/* NOTES */}

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-300">
                    Additional Notes
                  </label>

                  <textarea
                    value={notes}
                    onChange={(e) =>
                      setNotes(e.target.value)
                    }
                    placeholder="Any message for JamesAutos..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/10 bg-[#0c121a] p-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-yellow-500/40"
                  />
                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  disabled={booking}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-yellow-500 px-5 py-4 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Calendar size={19} />

                  {booking
                    ? "Submitting Request..."
                    : "Book Test Drive"}
                </button>

              </form>

            </div>

          </div>

        </div>
      )}

      {/* =================================================
          REQUEST HISTORY
      ================================================= */}

      <div>

        <div className="mb-5">

          <h2 className="text-xl font-bold">
            My Test Drive Requests
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View the status of your test drive bookings.
          </p>

        </div>

        {testDrives.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#111720] px-6 py-14 text-center">

            <Calendar
              size={45}
              className="mx-auto text-gray-700"
            />

            <h3 className="mt-4 text-lg font-bold">
              No test drive requests
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              You haven't booked a test drive yet.
            </p>

          </div>
        ) : (
          <div className="space-y-4">

            {testDrives.map((testDrive) => {

              const status =
                getStatusStyle(
                  testDrive.status
                );

              // Supabase returns the relationship as an array
              const testVehicle =
                testDrive.vehicles?.[0] ?? null;

              return (
                <div
                  key={testDrive.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#111720]"
                >

                  <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center">

                    {/* IMAGE */}

                    <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl bg-[#080d14] sm:w-32">

                      {testVehicle?.image_url ? (
                        <img
                          src={testVehicle.image_url}
                          alt={`${testVehicle.brand} ${testVehicle.model}`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">

                          <Car
                            size={35}
                            className="text-gray-700"
                          />

                        </div>
                      )}

                    </div>

                    {/* INFO */}

                    <div className="min-w-0 flex-1">

                      <h3 className="font-bold">
                        {testVehicle
                          ? `${testVehicle.brand} ${testVehicle.model}`
                          : "Vehicle"}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {testVehicle?.year ?? "N/A"} Model
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">

                        <span>
                          📅 {testDrive.preferred_date}
                        </span>

                        <span>
                          🕐 {testDrive.preferred_time}
                        </span>

                      </div>

                    </div>

                    {/* STATUS */}

                    <div
                      className={`flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-bold capitalize ${status.className}`}
                    >
                      {status.icon}

                      {testDrive.status}

                    </div>

                  </div>

                  {/* NOTES */}

                  {testDrive.notes && (
                    <div className="border-t border-white/10 px-5 py-4">

                      <p className="text-xs uppercase tracking-wider text-gray-600">
                        Notes
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        {testDrive.notes}
                      </p>

                    </div>
                  )}

                </div>
              );
            })}

          </div>
        )}

      </div>

    </div>
  );
};

export default CustomerTestDrives;