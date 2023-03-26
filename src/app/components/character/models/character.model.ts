export class CharacterResponse {
  message: string;
  result: Character;

  constructor(characterResponse: CharacterResponse) {
    this.message = characterResponse.message;
    this.result = characterResponse.result;
  }
}

export class Character {
  public properties?: CharacterProperties;
  public description?: string;
  public _id?: string;
  public uid?: string;
  public __v?: number;
  constructor(character?: Character) {
    this.properties = new CharacterProperties(character?.properties);
    this.description = character?.description;
    this._id = character?._id;
    this.uid = character?.uid;
    this.__v = character?.__v;
  }
}

export class CharacterProperties {
  public height?: string;
  public mass?: string;
  public hair_color?: string;
  public skin_color?: string;
  public eye_color?: string;
  public birth_year?: string;
  public gender?: Gender;
  public created?: string;
  public edited?: string;
  public name?: string;
  public homeworld?: string;
  public url?: string;
  public planetNumber?: number;

  constructor(properties?: CharacterProperties) {
    this.height = properties?.height;
    this.mass = properties?.mass;
    this.hair_color = properties?.hair_color;
    this.skin_color = properties?.skin_color;
    this.eye_color = properties?.eye_color;
    this.birth_year = properties?.birth_year;
    this.gender = properties?.gender;
    this.created = properties?.created;
    this.edited = properties?.edited;
    this.name = properties?.name;
    this.homeworld = properties?.homeworld;
    this.url = properties?.url;
    this.planetNumber = this.extractPlanetNumber(properties?.homeworld);
  }

  private extractPlanetNumber(homeworld: string = "1"): number {
    const lastSlashIndex = homeworld.lastIndexOf("/");
    const lastSegment = homeworld.substring(lastSlashIndex + 1);
    const lastDigits = lastSegment.match(/\d+/);

    const lastNumber = parseInt(!!lastDigits ? lastDigits[0] : "1");
    return lastNumber;
  }
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  NONE = 'none'
}


export interface CharacterPageParams {
  uid: number;
}
