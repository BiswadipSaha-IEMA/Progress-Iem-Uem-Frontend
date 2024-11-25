import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./styles.css";
import { usePostReq } from "../../../hooks/useHttp";
import ManagePopUp from "./ManagePopUp";

function BookPublished({ setUtilFor, setShowPopup, getAllInfo }) {
  const [postReq] = usePostReq();
  const [error, setError] = useState(false);
  const [authorType, setAuthorType] = useState("");

  const [dateRange] = useState({
    startDate: "2020-11-01",
    endDate: "2030-11-30",
  });

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    isbn: "",
    category: "",
    publisher: "",
    date: "",
    vol: "",
    issue: "",
    pp: "",
    publicationType: "Book",
    nationalOrInternational: "",
    proofDocument: "",
  });

  const handleChangeAuthor = (e) => {
    setAuthorType(e.target.value);
  };

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Date validation
    if (name === "date") {
      if (value < dateRange.startDate || value > dateRange.endDate) {
        e.target.value = ""; // Clear the input if the date is outside the range
        setError(true); // Set error to true
        return;
      } else {
        setError(false); // Reset error when a valid date is entered
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value, // The [name] dynamically updates the correct field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    getAllInfo();
    if (error) {
      // If there is an error, do not submit
      return;
    }

    const response = await postReq(
      "api/v1/document/createPublication",
      {
        authorType: authorType,
        name: formData.name,
        title: formData.title,
        isbn: formData.isbn,
        category: formData.category,
        date: formData.date,
        publicationType: "Book",
        proofDocument: formData.proofDocument,
        publisher: formData.publisher
      },
      accessToken
    );
    if (response.success) {
      setShowPopup(false);
      getAllInfo()
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      title: "",
      isbn: "",
      category: "",
      publisher: "",
      date: "",
      vol: "",
      issue: "",
      pp: "",
      publicationType: "Book",
      nationalOrInternational: "",
      proofDocument: "",
    });
    setError(false); // Reset error when form is closed
    console.log("Form closed");
  };

  return (
    <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-[0px] left-0 z-40 alertcontainer font-poppins text-">
      <div className="bg-white rounded-xl shadow-lg relative mx-4 p-4 sm:p-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto sm:h-[80vh] overflow-y-auto">
        <div
          className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
          onClick={() => {
            setShowPopup(false);
            handleClose();
          }}
        >
          <RxCross2 className="text-white" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 pl-4">
          Book Publication Form
        </h2>

        <div className="overflow-y-auto max-h-[calc(80vh-100px)] p-4">
          <style>{`
            ::-webkit-scrollbar {
              display: none; /* Hide scrollbar for Chrome, Safari and Opera */
            }
          `}</style>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Author Type */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Author Type
              </label>
              <select
                name="category"
                value={authorType}
                onChange={handleChangeAuthor}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              >
                <option value="">Select</option>
                <option value="Student">Student</option>
                <option value="Faculty">Faculty</option>
              </select>
            </div>

            {/* Name */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
                required
              />
            </div>

            {/* Title */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Book Name
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
                required
              />
            </div>

            {/* ISBN and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  ISBN/ISSN
                </label>
                <input
                  type="number"
                  name="isbn"
                  value={formData.isbn}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
                >
                  <option value="">Select</option>
                  <option value="Scopus">Scopus</option>
                  <option value="UGC-Care">UGC Care</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Publisher Name */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Publisher Name
              </label>
              <input
                type="text"
                name="publisher" // Corrected the name attribute
                value={formData.publisher}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
                required
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
                required
              />
            </div>

            {/* Proof Document */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Proof Document
              </label>
              <input
                type="text"
                name="proofDocument"
                value={formData.proofDocument}
                onChange={handleInputChange}
                className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0 outline-none"
              />
            </div>

            {/* Centered Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full sm:w-[200px] bg-[#03a8fd] text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-[#03a8fd] transition-all duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {error && (
        <ManagePopUp
          setUtilFor={"error"}
          setPopupShow={setError}
          takeData={"Not a valid date"}
        />
      )}
    </div>
  );
}

export default BookPublished;
