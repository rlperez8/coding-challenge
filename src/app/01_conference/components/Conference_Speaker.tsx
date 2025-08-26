'use client'

import React from "react"

interface Props {
  speaker: {
    id: string;
    name: string;
    title: string;
    company: string;
    bio: string;
    avatar_url: string;
  };
}

const Conference_Speaker: React.FC<Props> = ({ speaker }) => {
  return (
    <div className="conference_speaker_con">
      <div className="conference_speaker_image_con">
        <img
          src={speaker.avatar_url ?? '/images/speakers/image_1.jpg'}
          className="event_detail_img"
        />
      </div>
      <div className="conference_speaker_bio_con">
        <div className="conference_speaker_detail_con">
          <div className="conference_speaker_left">Name:</div>
          <div className="conference_speaker_right">{speaker.name}</div>
        </div>
        <div className="conference_speaker_detail_con">
          <div className="conference_speaker_left">Title:</div>
          <div className="conference_speaker_right">{speaker.title}</div>
        </div>
        <div className="conference_speaker_detail_con">
          <div className="conference_speaker_left">Company:</div>
          <div className="conference_speaker_right">{speaker.company}</div>
        </div>
        <div className="conference_speaker_bio_">
          <div className="conference_speaker_left">Bio:</div>
          <div className="conference_speaker_right">{speaker.bio}</div>
        </div>
      </div>
    </div>
  );
};

export default Conference_Speaker;
