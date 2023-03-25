import { useEffect, useState, useContext } from "react";

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
        const profile = JSON.parse(localStorage.getItem(key) || "") as IProfile;
        return { name: profile.name, id: +(key.match(/\d+/) || -1) };
      });
    setProfiles(mappedProfiles);
  }, []);

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
      <div data-cy="new-profile" onClick={addNewProfile}>
        Create a new profile +
      </div>
    </div>
  );
};

export default ProfileWrapper;
