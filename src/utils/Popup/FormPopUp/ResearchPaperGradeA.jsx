import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./styles.css";
import { usePostReq } from "../../../hooks/useHttp";

function ResearchPaperGradeA({ setUtilFor, setShowPopup, getAllInfo }) {
  const [postReq] = usePostReq();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    isbn: "",
    category: "",
    publisher: "",
    date: "",
    journalName: "",
    vol: "",
    issue: "",
    pp: "",
    publicationGrade: "Grade-A", // Default value
    publicationType: "Research Paper", // Default value
    nationalOrInternational: "National",
    proofDocument: "",
    authorType: "" // Moved authorType inside formData
  });

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.title || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }

    const response = await postReq(
      "api/v1/document/createPublication",
      {
        name: formData.name,
        publisher:formData.publisher,
        title: formData.title,
        category: formData.category,
        authorType: formData.authorType,
        date: formData.date,
        journalName: formData.journalName,
        vol: formData.vol,
        pp: formData.pp,
        issue: formData.issue,
        publicationGrade: formData.publicationGrade,
        publicationType: formData.publicationType,
        nationalOrInternational: formData.nationalOrInternational,
        proofDocument: formData.proofDocument,
      },
      accessToken
    );

    if (response.success) {
      setShowPopup(false);
      getAllInfo();
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
      journalName: "",
      vol: "",
      issue: "",
      pp: "",
      publicationGrade: "Grade-A", // Default value
      publicationType: "Research Paper", // Default value
      nationalOrInternational: "National",
      proofDocument: "",
      authorType: "" // Reset authorType
    });
  };

  return (
    setUtilFor === "bpAddForm" && (
      <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-0 left-0 z-40 alertcontainer">
        <div className="bg-white rounded-xl shadow-lg relative mx-4 p-4 sm:p-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto sm:h-[80vh] overflow-y-auto">
          <div
            className="absolute p-2 transition-colors duration-200 bg-red-500 rounded-full cursor-pointer right-5 top-5 hover:bg-red-600"
            onClick={() => {
              setShowPopup(false);
              handleClose();
            }}
          >
            <RxCross2 className="text-white" />
          </div>

          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Research Paper Publication Form
          </h2>

          <div className="overflow-y-scroll h-[calc(800px-160px)] p-4">
            <style>{`
              ::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Author Type */}
              <div>
                <label className="block mb-1 font-medium text-gray-600">
                  Author Type
                </label>
                <select
                  name="authorType"
                  value={formData.authorType}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg outline-none focus:ring-0"
                >
                  <option value="">Select</option>
                  <option value="Student">Student</option>
                  <option value="Faculty">Faculty</option>
                </select>
              </div>

              {/* Name */}
              <div>
                <label className="block mb-1 font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  required
                />
              </div>

              {/* Title */}
              <div>
                <label className="block mb-1 font-medium text-gray-600">
                  Paper Name
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  required
                />
              </div>
              
              {/* Journal Name */}
              <div>
                <label className="block mb-1 font-medium text-gray-600">
                  Journal Name
                </label>
                <input
                  type="text"
                  name="journalName"
                  value={formData.journalName}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  required
                />
              </div>

              {/* Publisher Name */}
              <div>
                <label className="block mb-1 font-medium text-gray-600">
                  Publisher Name
                </label>
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block mb-1 font-medium text-gray-600">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg outline-none focus:ring-0"
                >
                  <option value="">Select</option>
                  <option value="SCI">SCI</option>
                  <option value="SCIE">SCIE</option>
                  <option value="Scopus">Scopus</option>
                  <option value="WoS">WoS</option>
                  <option value="ESCI">ESCI</option>
                  <option value="Nature">Nature</option>
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block mb-1 font-medium text-gray-600">
                  Date of Issue
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                />
              </div>

              {/* Volume, Issue, Pages */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="block mb-1 font-medium text-gray-600">
                    Volume
                  </label>
                  <input
                    type="text"
                    name="vol"
                    value={formData.vol}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-600">
                    Issue Number
                  </label>
                  <input
                    type="text"
                    name="issue"
                    value={formData.issue}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-600">
                    pp. No.
                  </label>
                  <input
                    type="text"
                    name="pp"
                    value={formData.pp}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div>
              </div>

              {/* National or International */}
              <div>
                <label className="block mb-1 font-medium text-gray-600">
                  National or International
                </label>
                <select
                  name="nationalOrInternational"
                  value={formData.nationalOrInternational}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                >
                  <option value="National">National</option>
                  <option value="International">International</option>
                </select>
              </div>

              {/* Proof Document */}
              <div>
                <label className="block mb-1 font-medium text-gray-600">
                  Proof Document
                </label>
                <input
                  type="text"
                  name="proofDocument"
                  value={formData.proofDocument}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-[200px] bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-200"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
}

export default ResearchPaperGradeA;
