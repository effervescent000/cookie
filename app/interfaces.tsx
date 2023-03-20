export interface IOptions {
  name: string;
  value: string;
}

export interface PokeAPIResponse {
  count?: number;
  results?: any[];
}

interface IName {
  name: string;
  url: string;
}

interface IAbility {
  ability: {
    name: string;
  };
}

interface IMove {
  move: IName;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: IName;
    version_group: IName;
  }[];
}

interface IStat {
  base_stat: number;
  effort: number;
  stat: IName;
}

export interface IPokemonFull {
  abilities: IAbility[];
  id: number;
  moves: IMove[];
  name: string;
  order: number;
  sprites: {
    front_default: string;
    front_female: string | null;
  };
  stats: IStat[];
  types: { slot: number; type: IName }[];
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
}

export interface IValues {
  [key: string]: IIndividualValues;
}

export interface IIndividualValues {
  finalValue: number;
  details: [string, number][];
}
