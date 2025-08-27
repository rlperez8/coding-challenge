"use client";
import Image from "next/image";
interface ConferenceTagProps {
  conf: {
    imageurl: string;
    name: string;
    date: string;
    current_attendees: number;
    max_attendees: number;
    category: string;
    location: string;
  };
  onClick?: () => void;
}

const Conference_Tag = ({ conf, onClick }: ConferenceTagProps) => {
  const isPast = new Date(conf.date) < new Date();
  const isSoldOut = conf.current_attendees === conf.max_attendees;
  const status = isPast ? "Closed" : isSoldOut ? "Sold Out" : "Open";
  const statusClass = isPast || isSoldOut ? "status_closed" : "status_open";

  return (
    <div className="conference_tag" onClick={onClick}>
      <div className="conference_tag_image">
        <Image src={conf.imageurl} alt={conf.name} />
      </div>
      <div className={statusClass}>{status}</div>
      <div className="conference_tag_name">{conf.name}</div>
      <div className="conference_tag_date">
        {new Date(conf.date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}{" "}
        &middot; {conf.max_attendees - conf.current_attendees} of {conf.max_attendees} remaining.
      </div>
      <div className="conference_tag_location">{conf.location}</div>
    </div>
  );
};

export default Conference_Tag;