export interface IOptions {
  name: string;
  value: string;
}

interface IAbility {
  ability: IResourceListItem;
  is_hidden?: boolean;
  slot?: number;
}

export interface IMove {
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
  past_types: {
    generation: IResourceListItem;
    types: { slot: number; type: IResourceListItem }[];
  }[];
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
  gen?: number;
}

export interface IDamageRelations {
  double_damage_from: IResourceListItem[];
  double_damage_to: IResourceListItem[];
  half_damage_from: IResourceListItem[];
  half_damage_to: IResourceListItem[];
  no_damage_from: IResourceListItem[];
  no_damage_to: IResourceListItem[];
}

export interface ITypeResponse {
  damage_relations: IDamageRelations;
  past_damage_relations: {
    damage_relations: IDamageRelations;
    generation: IResourceListItem;
  }[];
}

export interface IMoveResponse {
  accuracy: number | null;
  damage_class: IResourceListItem;
  generation: IResourceListItem;
  meta: {
    crit_rate: number | null;
    flinch_chance: number | null;
    max_hits: number | null;
    min_hits: number | null;
  } | null;
  name: string;
  power: number | null;
  pp: number | null;
  type: IResourceListItem;
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
  name: string;
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

export interface ITeamTypeScores {
  final: number;
  raw: { [key: string]: { values: { [key: string]: number } } };
  processed: IValues;
}

export interface IMoveScores {
  [id: number]: {
    final: number;
    moves: {
      [move: string]: { dmg?: number; score?: number };
    };
  };
}
