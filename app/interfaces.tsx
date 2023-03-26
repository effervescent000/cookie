export interface IOptions {
  name: string;
  value: string;
}

interface IAbility {
  ability: {
    name: string;
  };
}

interface IMove {
  move: IResourceListItem;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: IResourceListItem;
    version_group: IResourceListItem;
  }[];
}

interface IStat {
  base_stat: number;
  effort: number;
  stat: IResourceListItem;
}

export interface IPokemonFull {
  abilities: IAbility[];
  id: number;
  moves: IMove[];
  name: string;
  order: number;
  species: IResourceListItem;
  sprites: {
    front_default: string;
    front_female: string | null;
  };
  stats: IStat[];
  types: { slot: number; type: IResourceListItem }[];
}

export interface IPokeSkeleton {
  name: string;
  id: number;
  moves: { [key: number]: string };
}

export interface IResourceListItem {
  name: string;
  url: string;
}

export interface IFilters {
  name: string;
  type1: string;
  type2: string;
}

export interface IType {
  key: string;
  color?: string;
  bgColor?: string;
  abbr?: string;
}

export interface ITypeResponse {
  damage_relations: {
    double_damage_from: IResourceListItem[];
    double_damage_to: IResourceListItem[];
    half_damage_from: IResourceListItem[];
    half_damage_to: IResourceListItem[];
    no_damage_from: IResourceListItem[];
    no_damage_to: IResourceListItem[];
  };
}

export interface IMoveResponse {
  name: string;
  type: IResourceListItem;
  accuracy: number;
  meta: {
    crit_rate: number;
    flinch_chance: number;
    max_hits: number;
    min_hits: number;
  };
  power: number;
  pp: number;
  damage_class: IResourceListItem;
}

export interface IValues {
  [key: string]: IIndividualValues;
}

export interface IIndividualValues {
  finalValue: number;
  details: [string, number][];
}

export interface IVersionGroupResponse {
  versions: IResourceListItem[];
}

export interface ISpeciesResponse {
  capture_rate: number;
  evolution_chain: { url: string };
  evolves_from_species: IResourceListItem;
  flavor_text_entries: { flavor_text: string; version: IResourceListItem }[];
  pokedex_numbers: {
    entry_number: number;
    pokedex: IResourceListItem;
  }[];
  varieties: { is_default: boolean; pokemon: IResourceListItem }[];
}

export interface IEvolutionDetails {
  min_level: number | null;
  trigger: IResourceListItem;
}

export interface IEvolutionChainLink {
  evolution_details: IEvolutionDetails[];
  evolves_to: IEvolutionChainLink[];
  species: IResourceListItem;
}

export interface IEvolutionResponse {
  chain: IEvolutionChainLink;
}

export interface IProfile {
  name: string;
  values: {
    team: IPokeSkeleton[];
    bench: IPokeSkeleton[];
    pokemonIdCounter: number;
    gen: string;
    versionGroup: string;
  };
}
