// src/app/02_admin/components/Conference_Speaker_Option.tsx
"use client";
import React from "react";
import { useAdmin } from "../context";
const Create_Edit = () => {
  const { buttonClicked, setButtonClicked } = useAdmin();

  return (
    <div className="conference_speaker_options">
      <div
        className={buttonClicked === "Conference" ? "admin_create_con_selected" : "admin_create_con"}
        onClick={() => setButtonClicked("Conference")}
      >
        Conferences
      </div>
      <div
      
        className={buttonClicked === "Speaker" ? "admin_create_con_selected" : "admin_create_con"}
        onClick={() => setButtonClicked("Speaker")}
      >
        Speaker
      </div>
    </div>
  );
};

export default Create_Edit;
