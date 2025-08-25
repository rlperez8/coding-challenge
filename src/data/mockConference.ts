import type { Conference, Speaker } from "@/context/Conference";
import { v4 as uuidv4 } from "uuid";
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
function randomDescription(): string {
  const descriptions = [
    `Join industry leaders, developers, and innovators at this year’s event where we’ll explore the latest trends in cloud computing, AI, and emerging technologies. 
    Attendees will gain practical insights from real-world case studies and network with peers across multiple industries.`,

    `This conference brings together experts from around the world to discuss cutting-edge solutions in software development, cybersecurity, and digital transformation. 
    Expect interactive sessions, hands-on workshops, and opportunities to collaborate with some of the brightest minds in tech.`,

    `Dive into a dynamic environment filled with thought-provoking talks, panel discussions, and technical deep dives. 
    Whether you’re an experienced professional or just starting out, you’ll walk away with actionable knowledge and valuable connections.`,

    `Discover the future of technology through keynote presentations, networking events, and interactive demos. 
    The conference offers a unique chance to connect with innovators shaping the next wave of advancements in artificial intelligence and beyond.`
  ];

  // Pick a random description
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}
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
    id: uuidv4(),
    name: `Conference ${id}`,
    description: randomDescription(),
    date: randomDate(),
    location: randomLocation(),
    price: randomNumber(50, 500),
    category: randomTechName(),
    speakers: [speaker],
    maxAttendees,
    currentAttendees: randomNumber(1, maxAttendees),
    isFeatured: Math.random() > 0.7,
    imageUrl: randomImage(),
  };
}
// Generate X Amount Conferences
export const mockConferences: Conference[] = Array.from({ length: 5 }, (_, i) => createMockConference(i + 1));
