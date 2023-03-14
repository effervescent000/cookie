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

export interface IPokemon {
  abilities: IAbility[];
  id: number;
  moves: IMove;
  name: string;
  order: number;
  stats: IStat[];
  types: { slot: number; type: IName }[];
}
