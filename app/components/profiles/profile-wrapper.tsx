import { useContext } from "react";

import type { IProfile } from "~/interfaces";
import { PokemonContext } from "~/pokemon-context";
import ProfileCard from "./profile-card";

const ProfileWrapper = () => {
  const { activeProfileId, setActiveProfileId, addNewProfile } =
    useContext(PokemonContext);

  if (typeof window !== "undefined") {
    const mappedProfiles = Object.keys(localStorage)
      .filter((key) => !!key.match(/profile-/))
      .map((key) => {
        const idMatch = key.match(/\d+/);
        const profile = JSON.parse(
          localStorage.getItem(key) || "{}"
        ) as IProfile;
        return { name: profile.name, id: idMatch !== null ? +idMatch : -1 };
      });

    return (
      <div data-cy="profiles" className="flex">
        {mappedProfiles.map((profile) => (
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
  }
  return <></>;
};

export default ProfileWrapper;
