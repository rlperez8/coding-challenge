"use client";
import React, { useState, useEffect } from "react";
import TextInput from "../components/textInput";
import { useConferences } from "@/context/Conference";
import { useParams } from "next/navigation";

const Create_Form = () => {

  const params = useParams();
  const conferenceId = params.id;

  const {speakers, conferences} = useConferences()

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const total = 3;
    const files = Array.from({ length: total }, (_, i) => 
      `/images/conference_images/image_${i + 1}.png` 
    );
    setImages(files);
  }, []);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [max_attendees, setMax_attendees] = useState<string>("");
  const [current_attendees, setCurrent_attendees] = useState<string>("");
  const [imageurl, setimageurl] = useState<string>("");
  const [speakerID, setSpeakerID] = useState<string>("");
  const [missingValue, setMissingValue] = useState('') 
  const [selected_speaker, set_selected_speaker] = useState('')

  const handleSubmit = async () => {
  // Validation
  if (!name) return setMissingValue("Name");
  if (!description) return setMissingValue("Description");
  if (!date) return setMissingValue("Date");
  if (!location) return setMissingValue("Location");
  if (!price) return setMissingValue("Price");
  // Optional: Check for at most 2 decimal places
    if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      return setMissingValue("Price must have at most 2 decimal places");
    }
  if (!category) return setMissingValue("Category");
  if (!max_attendees) return setMissingValue("Max Attendees");
  if (!current_attendees) return setMissingValue("Current Attendees");
  if (!imageurl) return setMissingValue("Image");
  if (isNaN(Number(max_attendees))) {return setMissingValue("Max Attendees must be a number")}
  if (isNaN(Number(current_attendees))) {return setMissingValue("Max Attendees must be a number")}
  if (Number(current_attendees) > Number(max_attendees)) {
  return setMissingValue("Current must be lower than Max Attendees");
}

  setMissingValue(""); // Clear any previous missing value

  // Prepare data
  const x = {
    name,
    description,
    date,
    location,
    price: Number(price),
    category,
    max_attendees: Number(max_attendees),
    current_attendees: Number(current_attendees),
    imageurl: imageurl,
    speaker: speakerID,
  };

 

  try {
      const res = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(x), 
    });

     console.log("Sending:", x);

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create conference");
    }

    const result = await res.json();
    console.log("Created:", result);

  } catch (err) {
    console.error("Error submitting conference:", err);
  }
};

  const conference = conferences.find(c => c.id === conferenceId);


  return (
    <div className="create_form_container">
      {missingValue.length > 0 && <div className="empty_value_error">Missing {missingValue} Value</div>}

        <TextInput value={name} setValue={setName} placeholder={'Name'}/>
   
      <div className="text_area">
        <textarea
          name="description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          placeholder={'Description'}
      />
      </div>

        <TextInput value={date} setValue={setDate} placeholder={'Date'}/>
        <TextInput value={location} setValue={setLocation} placeholder={"Location"}/>
        <TextInput value={price} setValue={setPrice} placeholder={'Price'}/>
        <TextInput value={category} setValue={setCategory} placeholder={'Category'}/>
        <TextInput value={max_attendees} setValue={setMax_attendees} placeholder={'Max Attendees'}/>
        <TextInput value={current_attendees} setValue={setCurrent_attendees} placeholder={'Price'}/>
        <div className="select_speaker">

          {speakers.map((skr)=>{

            return(<div className={skr.name === selected_speaker ? "speaker_row_selected" : "speaker_row"} 
            onClick={()=> {set_selected_speaker(skr.name); setSpeakerID(skr.id)}}>
              {skr.name}
            </div>)
          })}
        </div>
        

        <div>Select Image</div>

        {imageurl === '' ? 
          <div className="select_image_con">
            {images.map((src, i) => (
              <img onClick={()=>{setimageurl(src)}} key={i} src={src} alt={`Conference ${i + 1}`} className="single_image"/>
            ))}
          </div> 
          : 
          <>
            <img className="selected_image_con" src={imageurl} alt="Selected Conference"/>
            <div className="change_image_con" onClick={() => setimageurl("")}> Change Image </div>
          </>

        }

        <div className="submit_button" onClick={()=>{handleSubmit()}}>Submit</div>
 
      
    </div>
  );
};

export default Create_Form;
