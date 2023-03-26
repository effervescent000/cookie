import { useContext, useEffect, useState } from "react";

import type { IProfile } from "~/interfaces";
import { PokemonContext } from "~/pokemon-context";
import ProfileCard from "./profile-card";

const ProfileWrapper = () => {
  const { activeProfileId, setActiveProfileId, addNewProfile } =
    useContext(PokemonContext);
  const [profiles, setProfiles] = useState<{ name: string; id: number }[]>([]);

  useEffect(() => {
    const mappedProfiles = Object.keys(localStorage)
      .filter((key) => !!key.match(/profile-/))
      .map((key) => {
        const idMatch = key.match(/\d+/);
        const profile = JSON.parse(
          localStorage.getItem(key) || "{}"
        ) as IProfile;
        return { name: profile.name, id: idMatch !== null ? +idMatch : -1 };
      });
    setProfiles(mappedProfiles);
  }, [activeProfileId]);

  return (
    <div data-cy="profiles" className="flex">
      {profiles.map((profile) => (
        <ProfileCard
          profile={profile}
          key={profile.id}
          activeProfileId={activeProfileId}
          setActiveProfileId={setActiveProfileId}
        />
      ))}
      <button data-cy="new-profile" onClick={addNewProfile}>
        Create a new profile +
      </button>
    </div>
  );
};

export default ProfileWrapper;
