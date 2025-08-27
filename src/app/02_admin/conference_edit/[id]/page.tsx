"use client";
import React, { useState, useEffect } from "react";
import TextInput from "../../components/textInput";
import { useConferences } from "@/context/Conference";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
const Edit_Form = () => {

  const router = useRouter();
  const params = useParams();
  
  const conferenceId = params.id;

  const {conferences, setConferences, setSelectedConference} = useConferences()
  const conference = conferences.find(c => c.id === conferenceId);
  


  const [images, setImages] = useState<string[]>([]);
  const [name, setName] = useState<string>(conference?.name.toString() ?? "");
  const [description, setDescription] = useState<string>(conference?.description.toString() ?? "");
  const [date, setDate] = useState<string>(conference?.date.toString() ?? "");
  const [location, setLocation] = useState<string>(conference?.location.toString() ?? "");
  const [price, setPrice] = useState<string>(conference?.price.toString() ?? "");
  const [category, setCategory] = useState<string>(conference?.category.toString() ?? "");
  const [max_attendees, setMax_attendees] = useState<string>(conference?.max_attendees.toString() ?? "");
  const [current_attendees, setCurrent_attendees] = useState<string>(conference?.current_attendees.toString() ?? "");
  const [imageurl, setimageurl] = useState<string>(conference?.imageurl ?? "");
  // const [speakerID, setSpeakerID] = useState<string>("");
  const [missingValue, setMissingValue] = useState('') 
  // const speaker = speakers.find(s => s.id === conference?.speaker);
  // const [selected_speaker, set_selected_speaker] = useState(speaker?.name)

  const handleUpdate = async () => {

      // if (!selected_speaker) return setMissingValue('Speaker');
      if (!name) return setMissingValue("Name");
      if (!description) return setMissingValue("Description");
      if (!date) return setMissingValue("Date");
      if (!location) return setMissingValue("Location");
      if (!price) return setMissingValue("Price");
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

      setMissingValue(""); 

    try {

    const res = await fetch(`/api/conferences`, { 
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: conference?.id,
        name,
        description,
        date,
        location,
        price,
        max_attendees,
        current_attendees,
        category,
        imageurl,
        // speakerID,
      }),
    });

    const updatedConference = await res.json(); 
    setConferences(prev =>
      prev.map(conf => (conf.id === updatedConference.id ? updatedConference : conf))
    );
    setSelectedConference(updatedConference);


    router.push(`/01_conference/${conference?.id}`);

  } catch (err) {
    console.error(err);
  }
  };

  // const fetchConferencesAndSpeakers = async () => {
  //   try {
  //     const res = await fetch("/api");
  //     const data = await res.json();
  //     setConferences(data.conferences);
  //     setSpeakers(data.speakers);
  //   } catch (err) {
  //     console.error("Failed to fetch data:", err);
  //   }
  // };



  useEffect(() => {
    const total = 1;
    const files = Array.from({ length: total }, (_, i) => 
      `/images/conference_images/image_${i + 1}.png` 
    );
    setImages(files);
  }, []);

  return (
    
  <div className="edit_speaker_layout"> 
        <div className='inner_speaker_layout'>
          <div className="conference_speakers_con">
      
      {missingValue.length > 0 && <div className="empty_value_error">Missing {missingValue} Value</div>}

          <div className="row_title">Name</div>
        <TextInput value={name} setValue={setName} placeholder={conference?.name}/>

         <div className="row_title">Description</div>
         <div className="ta">
      <div className="text_area">
        <textarea
          name="description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          placeholder={conference?.description ? conference?.description : ''}
      />
     </div>
      </div>
      
      <div className="row_title">Date</div>
        <TextInput value={date} setValue={setDate} placeholder={conference?.date}/>
        <div className="row_title">Location</div>
        <TextInput value={location} setValue={setLocation} placeholder={conference?.location}/>
        <div className="row_title">Price</div>
        <TextInput value={price} setValue={setPrice} placeholder={conference?.price.toString()}/>
        <div className="row_title">Technology</div>
        <TextInput value={category} setValue={setCategory} placeholder={conference?.category}/>
        <div className="row_title">Max Attendees</div>
        <TextInput value={max_attendees} setValue={setMax_attendees} placeholder={conference?.max_attendees.toString().toString()}/>
        <div className="row_title">Current Attendees</div>
        <TextInput value={current_attendees} setValue={setCurrent_attendees} placeholder={conference?.price.toString()}/>

  

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

      
   <div className="submit_button" onClick={()=>{handleUpdate()}}>Save</div>
      
    </div>
    </div>
    </div>
  );
};

export default Edit_Form;
