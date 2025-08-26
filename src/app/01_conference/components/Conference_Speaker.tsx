interface Props {
  speaker: {
    id: string;
    name: string;
    title: string;
    company: string;
    bio: string;
    avatar_url?: string; // <-- allow undefined
  };
}

const Conference_Speaker: React.FC<Props> = ({ speaker }) => {
  if (!speaker) return null; // render nothing if speaker is undefined

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-4 lg:space-y-0 p-4 bg-gray-100">
      <div className="conference_speaker_image_con">
        <img src={`${speaker.avatar_url}`} className="avatar_url" />
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

export default Conference_Speaker