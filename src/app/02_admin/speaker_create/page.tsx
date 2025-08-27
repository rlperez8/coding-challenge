"use client";
import React, { useState, useEffect } from "react";
import TextInput from "../components/textInput";

import Image from "next/image";
const Speaker_Create = () => {



  
  const [speakerName, setSpeakerName] = useState('')
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [bio, setBio] = useState('')

  const [imageurl, setimageurl] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  
  useEffect(() => {
    const total = 3;
    const files = Array.from({ length: total }, (_, i) => 
      `/images/speakers/image_${i + 1}.jpg` 
    );
    setImages(files);
  }, []);

    const handleSubmit = async () => {
  

      // if (!speakerName) return setMissingValue("speakerName");
      // if (!title) return setMissingValue("title");
      // if (!company) return setMissingValue("company");
      // if (!bio) return setMissingValue("bio");
      // if (!imageurl) return setMissingValue("imageurl");
        
      // setMissingValue(""); 
   
      const x = {
        speakerName,
        title,
        company,
        bio,
        imageurl: imageurl,

      };

      try {
          const res = await fetch("/api/speaker", {
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



  return (
  <div className="edit_speaker_layout"> 
        <div className='inner_speaker_layout'>
          <div className="conference_speakers_con">

      <div className="row_title">Name</div>
      <TextInput value={speakerName} setValue={setSpeakerName} placeholder={'Name'}/>

      <div className="row_title">Title</div>
      <TextInput value={title} setValue={setTitle} placeholder={'Title'}/>

      <div className="row_title">Company</div>
      <TextInput value={company} setValue={setCompany} placeholder={'Company'}/>

      <div className="row_title">Description</div>
      <div className="ta">
      <div className="text_area">
              <textarea
                name="description"
                value={bio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setBio(e.target.value)
                }
                placeholder={'Description'}
            />
            </div>
</div>
 

      <div className="row_title">Speaker</div>

        {imageurl === '' ? 
          <div className="select_image_con">
            {images.map((src, i) => (
              <Image onClick={()=>{setimageurl(src)}} key={i} src={src} alt={`Conference ${i + 1}`} className="single_image"/>
            ))}
          </div> 
          : 
          <>
            <Image className="selected_image_con" src={imageurl} alt="Selected Conference"/>
            <div className="change_image_con" onClick={() => setimageurl("")}> Change Image </div>
          </>

        }

        <div className="submit_button" onClick={()=>{handleSubmit()}}>Submit</div>
      
    </div>    </div>    </div>
  );
};

export default Speaker_Create;
