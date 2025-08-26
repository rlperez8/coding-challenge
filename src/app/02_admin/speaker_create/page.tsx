"use client";
import React, { useState, useEffect } from "react";
import TextInput from "../components/textInput";
import { useConferences } from "@/context/Conference";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
const Speaker_Create = () => {

  const router = useRouter();

  const params = useParams();
  const conferenceId = params.id;
  const {speakers, conferences, setConferences, setSpeakers, setSelectedConference} = useConferences()
  const conference = conferences.find(c => c.id === conferenceId);
  
  const [speakerName, setSpeakerName] = useState('')
  const [title, setTitle] = useState('')
  const [company, setCompany] = useState('')
  const [bio, setBio] = useState('')
  const [missingValue, setMissingValue] = useState('') 


  const [selected_speaker, set_selected_speaker] = useState('')
  const [speakerID, setSpeakerID] = useState<string>("");
  const [imageurl, setimageurl] = useState<string>("");

  const [images, setImages] = useState<string[]>([]);
  
  useEffect(() => {
    const total = 2;
    const files = Array.from({ length: total }, (_, i) => 
      `/images/speakers/image_${i + 1}.jpg` 
    );
    setImages(files);
  }, []);

    const handleSubmit = async () => {
  

      if (!speakerName) return setMissingValue("speakerName");
      if (!title) return setMissingValue("title");
      if (!company) return setMissingValue("company");
      if (!bio) return setMissingValue("bio");
      if (!imageurl) return setMissingValue("imageurl");
        
      setMissingValue(""); 
   
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
    <div className="speaker_create_form">

      <TextInput value={speakerName} setValue={setSpeakerName} placeholder={'Name'}/>
      <TextInput value={title} setValue={setTitle} placeholder={'Title'}/>
      <TextInput value={company} setValue={setCompany} placeholder={'Company'}/>
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

      Select Speaker
      <div className="select_speaker">

          {speakers.map((skr,index)=>{

            return(<div key={index} className={skr.name === selected_speaker ? "speaker_row_selected" : "speaker_row"} 
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

export default Speaker_Create;
