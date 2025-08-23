"use client";

import { useConferences } from "@/context/Conference";
import NavBar from "../../components/NavBar";
import Link from "next/link";

const EventPage: React.FC = () => {
  const { selectedConference } = useConferences();

  if (!selectedConference) {
    return (
      <div className="main">
        <div className="main_inner">
          <NavBar />
          <div className="main2">
            <p>No conference selected.</p>
            <Link href="/">Go back to event list</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <div className="main_inner">
        <NavBar />
        <div className="main2">
          <h1>{selectedConference.name}</h1>
          <p>Date: {new Date(selectedConference.date).toLocaleDateString("en-US")}</p>
          <p>Location: {selectedConference.location}</p>
          <p>Category: {selectedConference.category.join(", ")}</p>
          <p>
            Attendees: {selectedConference.currentAttendees} / {selectedConference.maxAttendees}
          </p>
          <img src={selectedConference.imageUrl} alt={selectedConference.name} className="w-full max-w-md mt-4" />
        </div>
      </div>
    </div>
  );
};

export default EventPage;