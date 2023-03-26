const ProfileCard = ({
  profile,
  activeProfileId,
  setActiveProfileId,
}: {
  profile: { name: string; id: number };
  activeProfileId: number;
  setActiveProfileId: (arg0: number) => void;
}) => {
  return (
    <div
      data-cy={`profile-${profile.id}`}
      onClick={() => setActiveProfileId(profile.id)}
      className={`${activeProfileId === profile.id && "underline"}`}
    >
      {profile.name || "Unnamed"}
    </div>
  );
};

export default ProfileCard;
