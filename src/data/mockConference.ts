import type { Conference, Speaker } from "@/context/Conference";

const locations = ["New York", "San Francisco", "Berlin", "Tokyo", "London"];
const adjectives = ["Global", "NextGen", "Advanced", "Modern", "Future", "Innovative", "Digital", "Virtual"];
const topics = ["AI", "Blockchain", "Cloud", "Cybersecurity", "DevOps", "IoT", "Data", "Robotics", "Software", "Tech"];
const nouns = ["Summit", "Conference", "Forum", "Expo", "Workshop", "Symposium", "Meetup", "Hackathon"];

function randomDate() {

  const start = new Date(2025, 0, 1).getTime();
  const end = new Date(2025, 12, 30).getTime();

  const randomTime = start + Math.random() * (end - start);
  return new Date(randomTime).toISOString();
}
function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomLocation() {
  return locations[Math.floor(Math.random() * locations.length)];
}
function randomImage() {
  return `https://picsum.photos/800/600?random=${randomNumber(1, 1000)}`;
}
function randomTechName() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const topic = topics[Math.floor(Math.random() * topics.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${adj} ${topic} ${noun}`;
}
// Random Name Generator
const techConferenceNames = Array.from({ length: 100 }, () => randomTechName());

function createMockConference(id: number): Conference {
  const speaker: Speaker = {
    id: `s${id}`,
    name: `Speaker ${id}`,
    title: "Developer",
    company: "TechCorp",
    bio: "Expert in their field.",
  };

  const maxAttendees = randomNumber(1, 10);

  return {
    id: `conf-${id}`,
    name: `Conference ${id}`,
    description: `This is the description for Conference ${id}.`,
    date: randomDate(),
    location: randomLocation(),
    price: randomNumber(50, 500),
    category: [techConferenceNames[Math.floor(Math.random() * techConferenceNames.length)]],
    speakers: [speaker],
    maxAttendees,
    currentAttendees: randomNumber(1, maxAttendees),
    isFeatured: Math.random() > 0.7,
    imageUrl: randomImage(),
  };
}
// Generate X Amount Conferences
export const mockConferences: Conference[] = Array.from({ length: 500 }, (_, i) => createMockConference(i + 1));
