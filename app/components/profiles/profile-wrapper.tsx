import { useContext, useEffect, useState } from "react";

import type { IProfile } from "~/interfaces";
import { PokemonContext } from "~/pokemon-context";
import ProfileCard from "./profile-card";

const ProfileWrapper = () => {
  const { activeProfileId, setActiveProfileId, addNewProfile, versionGroup } =
    useContext(PokemonContext);
  const [profiles, setProfiles] = useState<{ id: number; profile: IProfile }[]>(
    []
  );

  useEffect(() => {
    const mappedProfiles = Object.keys(localStorage)
      .filter((key) => !!key.match(/profile-/))
      .map((key) => {
        const idMatch = key.match(/\d+/);
        const profile = JSON.parse(
          localStorage.getItem(key) || "{}"
        ) as IProfile;
        return { id: idMatch !== null ? +idMatch : -1, profile };
      });
    setProfiles(mappedProfiles);
  }, [activeProfileId]);

  return (
    <div
      data-cy="profiles"
      className="flex border-b border-light-blue text-center"
    >
      {profiles.map((profile) => (
        <ProfileCard
          profile={profile}
          key={profile.id}
          activeProfileId={activeProfileId}
          setActiveProfileId={setActiveProfileId}
          versionGroup={versionGroup}
        />
      ))}
      <button data-cy="new-profile" onClick={addNewProfile}>
        Create a new profile +
      </button>
    </div>
  );
};

export default ProfileWrapper;
