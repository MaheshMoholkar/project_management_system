import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDateToCustom } from "@/utils/dateUtils";
import { useState } from "react";
import { useCreateProject } from "@/services/mutations";

export type ProjectForm = {
  title: string;
  reason: string;
  type: string;
  division: string;
  category: string;
  priority: string;
  department: string;
  location: string;
  startDate: string;
  endDate: string;
  status: string;
};

function CreateProject() {
  const [title, setTitle] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectForm>();

  const createProjectMutation = useCreateProject();

  const onSubmit = (data: ProjectForm) => {
    const formattedData = {
      ...data,
      startDate: formatDateToCustom(new Date(data.startDate)),
      endDate: formatDateToCustom(new Date(data.endDate)),
      status: "Registered",
    };
    createProjectMutation.mutate(formattedData);
    reset();
  };

  return (
    <>
      <div className="m-5 md:-mt-6 rounded-lg bg-white">
        <div className="h-[580px]">
          <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="md:flex justify-between">
              <Input
                className="md:w-1/3 w-full border border-gray-400"
                placeholder="Enter Project Theme"
                value={title}
                {...register("title", { required: true })}
                onChange={(event) => setTitle(event.target.value)}
              />
              <Button
                variant="ghost"
                className="mt-4 md:mt-0 bg-blue-600 px-6 rounded-full hover:bg-blue-800 hover:text-white text-blue-50 hidden md:block"
                type="submit"
              >
                Save Project
              </Button>
            </div>
            {errors.title && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}

            <div className="flex flex-wrap -mx-3 mt-16">
              <div className="w-full md:w-1/3 px-3 mb-6">
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700"
                >
                  Reason
                </label>
                <select
                  id="reason"
                  className="mt-1 p-3 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register("reason", { required: true })}
                >
                  <option value="">Select a reason</option>
                  <option value="Business">Business</option>
                  <option value="Dealership">Dealership</option>
                  <option value="Transport">Transport</option>
                </select>
                {errors.reason && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700"
                >
                  Type
                </label>
                <select
                  id="type"
                  className="mt-1 p-3 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register("type", { required: true })}
                >
                  <option value="">Select a type</option>
                  <option value="Internal">Internal</option>
                  <option value="External">External</option>
                  <option value="Vendor">Vendor</option>
                </select>
                {errors.type && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6">
                <label
                  htmlFor="division"
                  className="block text-sm font-medium text-gray-700"
                >
                  Division
                </label>
                <select
                  id="division"
                  className="mt-1 p-3 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register("division", { required: true })}
                >
                  <option value="">Select a division</option>
                  <option value="Compressor">Compressor</option>
                  <option value="Filters">Filters</option>
                  <option value="Pumps">Pumps</option>
                  <option value="Glass">Glass</option>
                  <option value="Water Heater">Water Heater</option>
                </select>
                {errors.division && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  className="mt-1 p-3 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register("category", { required: true })}
                >
                  <option value="">Select a category</option>
                  <option value="Quality A">Quality A</option>
                  <option value="Quality B">Quality B</option>
                  <option value="Quality C">Quality C</option>
                  <option value="Quality D">Quality D</option>
                </select>
                {errors.category && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6">
                <label
                  htmlFor="priority"
                  className="block text-sm font-medium text-gray-700"
                >
                  Priority
                </label>
                <select
                  id="priority"
                  className="mt-1 p-3 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register("priority", { required: true })}
                >
                  <option value="">Select a priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                {errors.priority && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6">
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <select
                  id="department"
                  className="mt-1 p-3 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register("department", { required: true })}
                >
                  <option value="">Select a department</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Finance">Finance</option>
                  <option value="Quality">Quality</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Stores">Stores</option>
                </select>
                {errors.department && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="mt-1 p-3 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register("startDate", { required: true })}
                />
                {errors.startDate && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6">
                <label
                  htmlFor="endDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="mt-1 p-3 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register("endDate", { required: true })}
                />
                {errors.endDate && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>

              <div className="w-full md:w-1/3 px-3 mb-6">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <select
                  id="location"
                  className="mt-1 p-3 block w-full rounded-md border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  {...register("location", { required: true })}
                >
                  <option value="">Select a location</option>
                  <option value="Pune">Pune</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                </select>
                {errors.location && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="b-12 mr-12 text-gray-700 mb-5">
                Status: <b>Registered</b>
              </div>
              <Button
                variant="ghost"
                className="my-10 bg-blue-600 px-6 rounded-full hover:bg-blue-800 hover:text-white text-blue-50 md:hidden"
                type="submit"
              >
                Save Project
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateProject;
