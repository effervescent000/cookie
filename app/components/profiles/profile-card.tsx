import { useEffect, useState } from "react";

import type { IProfile } from "~/interfaces";

import { properCase } from "~/utils/text-utils";

const ProfileCard = ({
  profile,
  activeProfileId,
  setActiveProfileId,
  versionGroup,
}: {
  profile: { id: number; profile: IProfile };
  activeProfileId: number;
  setActiveProfileId: (arg0: number) => void;
  versionGroup: string;
}) => {
  const [profileVersion, setProfileVersion] = useState(
    profile.profile.values.versionGroup
  );

  useEffect(() => {
    if (activeProfileId === profile.id) {
      setProfileVersion(versionGroup);
    }
  }, [activeProfileId, profile.id, versionGroup]);

  return (
    <div className="mr-2">
      <div
        data-cy={`profile-${profile.id}`}
        onClick={() => setActiveProfileId(profile.id)}
        className={`${
          activeProfileId === profile.id ? "border-dark-blue" : "border-white"
        } cursor-pointer border-b-2 px-2`}
      >
        {profile.profile.name ||
          (profileVersion && properCase(profileVersion)) ||
          "Unnamed profile"}
      </div>
    </div>
  );
};

export default ProfileCard;
