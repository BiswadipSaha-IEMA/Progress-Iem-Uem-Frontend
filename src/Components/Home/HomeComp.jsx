import React, { useState } from "react";
import { PencilIcon, UserIcon } from "lucide-react";
import "../Home/styles.css";
import profileImg from "../../assets/dp.jpeg";
import editIcon from "../../assets/edit.jpeg";

export default function HomeComp() {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-details">
          <div className="text-5xl font-[700] text-black mb-6">Account Details</div>

          <section className="details-section">
            <div className="section-header">
              <div className="section-Heading">Personal Details</div>
              <button
                onClick={() => setEditMode(!editMode)}
                className="edit-button"
              >
                <PencilIcon />
              </button>
            </div>
            <div className="details-content">
              <p className="mt-3">
                <strong>Name:</strong> Kartik Dubey
              </p>
              <p>
                <strong>Address:</strong> Biswa Bangla Sarani, Rajarhat, Action
                Area III, Kolkata, 700159
              </p>
            </div>
          </section>

          <section className="details-section">
            <div className="section-header">
              <div className="pt-10 section-Heading">Contact Details</div>
              <button
                onClick={() => setEditMode(!editMode)}
                className="edit-button"
              >
                <PencilIcon />
              </button>
            </div>
            <div className="details-content">
              <p className="mt-3">
                <strong>Phone No.:</strong> 9123456789{" "}
                <span className="primary-label">Primary</span>
              </p>
              <p>
                <strong>Email:</strong> Kartikdubey11234@gmail.com{" "}
                <span className="primary-label">Primary</span>
              </p>
              <p>
                <strong>Secondary Phone No.:</strong> 9123456789
              </p>
              <p>
                <strong>Secondary Email:</strong> -
              </p>
            </div>
          </section>

          {editMode && (
            <section className="details-section">
              <h2>Personal Details</h2>
              <div className="details-content">
                <p>
                  <strong>Name:</strong> Kartik Dubey
                </p>
                <p>
                  <strong>Address:</strong> Biswa Bangla Sarani, Rajarhat,
                  Action Area III, Kolkata, 700159
                </p>
              </div>
            </section>
          )}

          <div className="action-buttons">
            <button className="cancel-button">Cancel</button>
            <button className="apply-button">Apply Changes</button>
          </div>
        </div>

        <div className="profile-sidebar">
          <div className="profile-picture">
            <img src={profileImg} alt="Profile" />
          </div>
          <button className="change-picture-button ">
            <img src={editIcon} alt="edit_icon" />
            Change Profile Picture
          </button>
          <button className="remove-picture-button">
            Remove Profile Picture
          </button>
          <button className="font-semibold change-password-button">
            Change Account Password
          </button>
          <button className="font-semibold logout-button">Log Out</button>
        </div>
      </div>
    </div>
  );
}
