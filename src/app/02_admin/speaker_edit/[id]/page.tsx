"use client";
import React, { useState, useEffect } from "react";
import TextInput from "../../components/textInput";
import { useConferences } from "@/context/Conference";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
const Speaker_Edit = () => {

  const router = useRouter();
  const params = useParams();
  const speaker_id = params.id;
  const {speakers, conferences, setConferences, setSpeakers, setSelectedConference} = useConferences()
  
  const current_speaker = speakers.find(c => c.id === speaker_id);
 
  const [speakerName, setSpeakerName] = useState(current_speaker?.name ?? "");
  const [title, setTitle] = useState(current_speaker?.title ?? "");
  const [company, setCompany] = useState(current_speaker?.company ?? "");
  const [bio, setBio] = useState(current_speaker?.bio ?? "");
  const [missingValue, setMissingValue] = useState('') 


  const [selected_speaker, set_selected_speaker]  = useState(current_speaker?.name)
  const [speakerID, setSpeakerID] = useState(current_speaker?.id)
  const [imageurl, setimageurl] = useState<string>(current_speaker?.avatar_url ?? "");

  const [images, setImages] = useState<string[]>([]);
   
  useEffect(() => {
    const total = 2;
    const files = Array.from({ length: total }, (_, i) => 
      `/images/speakers/image_${i + 1}.jpg` 
    );
    setImages(files);
  }, []);

    const handleSubmit = async () => {
  
      console.log('Hello I am here!')
      if (!speakerName) return setMissingValue("speakerName");
      if (!title) return setMissingValue("title");
      if (!company) return setMissingValue("company");
      if (!bio) return setMissingValue("bio");
      if (!imageurl) return setMissingValue("imageurl");
        
      setMissingValue(""); 
   
      try {
          const res = await fetch("/api/speaker", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
             speakerID,
          speakerName,
          title,
          company,
          bio,
          imageurl,
          }), 
        });

        console.log("Sending:",  speakerID,
        speakerName,
        title,
        company,
        bio,
        imageurl,);

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

      <TextInput value={speakerName} setValue={setSpeakerName} placeholder={current_speaker?.name}/>
      <TextInput value={title} setValue={setTitle}  placeholder={current_speaker?.title}/>
      <TextInput value={company} setValue={setCompany}  placeholder={current_speaker?.company}/>
      <div className="text_area">
              <textarea
                name="description"
                value={bio}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setBio(e.target.value)
                }
                 placeholder={current_speaker?.bio}
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

export default Speaker_Edit;
