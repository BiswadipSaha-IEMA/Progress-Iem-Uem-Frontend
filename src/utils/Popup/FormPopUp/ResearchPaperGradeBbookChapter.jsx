
import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import "./styles.css";
import { usePostReq } from "../../../hooks/useHttp";

function ResearchPaperGradeBbookChapter({ setUtilFor, setShowPopup }) {
  const [postReq] = usePostReq();
  const [authorType, setAuthorType] = useState("");

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
    publicationGrade: "Grade-B", // Default value
    publicationType: "Book Chapter", // Default value
    nationalOrInternational: "National",
    proofDocument: "",
  });

  const accessToken = sessionStorage.getItem("token")?.trim().split('"')[1];

  const handleChangeAuthor = (e) => {
    setAuthorType(e.target.value);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await postReq(
      "api/v1/document/createPublication",
      {
        name: formData.name,
        title: formData.title,
        // isbn: formData.isbn,
        category: formData.category,
        // publisher: formData.publisher,
        authorType : authorType,
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
    if (response.success){ 
      setShowPopup(false)
    };
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
      publicationGrade: "Grade-B", // Default value
      publicationType: "Book Chapter", // Default value
      nationalOrInternational: "National",
      proofDocument: "",
    });
    console.log("Form closed");
  };

  return (
    setUtilFor === "bpAddForm" && (
      <>
        <div className="flex bg-[#00000034] backdrop-blur-md fixed justify-center items-center w-full h-full top-0 left-0 z-40 alertcontainer">
          <div className="bg-white rounded-xl shadow-lg relative mx-4 p-4 sm:p-8 w-full max-w-[500px] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[800px] h-auto sm:h-[80vh] overflow-y-auto">
            <div
              className="absolute right-5 top-5 bg-red-500 hover:bg-red-600 transition-colors duration-200 rounded-full p-2 cursor-pointer"
              onClick={() => setShowPopup(false)}
            >
              <RxCross2 className="text-white" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Research Paper Publication Form 
            </h2>

            {/* Inner container with scroll */}
            <div
              className="overflow-y-scroll h-[calc(800px-160px)] p-4"
              style={{ scrollbarWidth: "none", "-ms-overflow-style": "none" }}
            >
              {/* Hide scrollbar for Firefox and Internet Explorer */}
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
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    required
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
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

                {/* ISBN and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* <div>
                    <label className="block text-gray-600 font-medium mb-1">
                      ISBN
                    </label>
                    <input
                      type="text"
                      name="isbn"
                      value={formData.isbn}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                    />
                  </div> */}

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
                      <option value="SCI">SCI</option>
                      <option value="SCIE">SCIE</option>
                      <option value="Scopus">Scopus</option>
                      <option value="WoS">WoS</option>
                      <option value="ESCI">ESCI</option>
                      <option value="Nature">Nature</option>
                    </select>
                  </div>
                </div>

                {/* Publisher */}
                {/* <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Publisher
                  </label>
                  <input
                    type="text"
                    name="publisher"
                    value={formData.publisher}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div> */}

                {/* Date */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
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

                {/* Journal Name */}
                {/* <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Journal Name
                  </label>
                  <input
                    type="text"
                    name="journalName"
                    value={formData.journalName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  />
                </div> */}

                {/* Volume, Issue, and Pages */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-600 font-medium mb-1">
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
                    <label className="block text-gray-600 font-medium mb-1">
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
                    <label className="block text-gray-600 font-medium mb-1">
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

                {/* Publication Grade Dropdown */}
                {/* <div>
                  <label className="block text-gray-600 font-medium mb-1">
                    Publication Grade
                  </label>
                  <select
                    name="publicationGrade"
                    value={formData.publicationGrade}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-100 border-none rounded-lg focus:ring-0"
                  >
                    <option value="Grade-A">Grade-A</option>
                    <option value="Grade-B">Grade-B</option>
                    <option value="Grade-C">Grade-C</option>
                  </select>
                </div> */}

                {/* National or International Dropdown */}
                <div>
                  <label className="block text-gray-600 font-medium mb-1">
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
                  <label className="block text-gray-600 font-medium mb-1">
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

                {/* Centered Submit Button */}
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
      </>
    )
  );
}

export default ResearchPaperGradeBbookChapter;
