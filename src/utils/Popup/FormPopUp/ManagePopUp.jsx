import React, { useState } from "react";

const ManagePopUp = ({
  setConfirmationPopupShow,
  setFormSave,
  manageState
}) => {

  const [formData, setFormData] = useState({
    name1: "",
    name2: "",
    name3: "",
    name4: "",
  });

  const isFormFilled = Object.values(formData).every(value => value !== "");


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormFilled) {
      console.log("Form submitted:", formData);
      setFormSave(true);
    }
  };

  return (
    <div className="flex bg-[#00000034] alertcontainer backdrop-blur-md fixed justify-center items-center w-[100%] h-[100%] top-0 left-0 z-40">
      <div className="bg-white py-10 px-4 rounded-[14px] flex flex-col justify-center items-center alertcontent  gap-2 relative w-[1000px] min-w-[300px] ">
        {manageState === 'form' ? (
          <>
            <div className="flex w-full justify-start text-[2rem] font-[700]">
              Edit Form:
            </div>
            <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="name1" className="text-[30px] font-[500]">Name 1</label>
                <input
                  type="text"
                  id="name1"
                  name="name1"
                  value={formData.name1}
                  onChange={handleInputChange}
                  className="bg-[#f3f3f3] outline-none border h-16 rounded-[10px] pl-4 text-[30px]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="name2" className="text-[30px] font-[500]">Name 2</label>
                <input
                  type="text"
                  id="name2"
                  name="name2"
                  value={formData.name2}
                  onChange={handleInputChange}
                  className="bg-[#f3f3f3] outline-none border h-16 rounded-[10px] pl-4 text-[30px]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="name3" className="text-[30px] font-[500]">Name 3</label>
                <input
                  type="text"
                  id="name3"
                  name="name3"
                  value={formData.name3}
                  onChange={handleInputChange}
                  className="bg-[#f3f3f3] outline-none border h-16 rounded-[10px] pl-4 text-[30px]"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="name4" className="text-[30px] font-[500]">Name 4</label>
                <input
                  type="text"
                  id="name4"
                  name="name4"
                  value={formData.name4}
                  onChange={handleInputChange}
                  className="bg-[#f3f3f3] outline-none border h-16 rounded-[10px] pl-4 text-[30px]"
                />
              </div>


              <button
                type="submit"
                className={`mt-4 py-4 px-8 text-[1.5rem] font-semibold text-white rounded-[8px] transition-all duration-300 ${
                  isFormFilled
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
                disabled={!isFormFilled}
              >
                Submit Form
              </button>
            </form>
          </>
        ) : (
          <>Hello</>
        )}
      </div>
    </div>
  );
};

export default ManagePopUp;
