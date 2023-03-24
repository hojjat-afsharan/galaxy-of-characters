
  
  export class CharacterResponse {
    message: string;
    result: Character;
   

    constructor(characterResponse: CharacterResponse) {
        this.message = characterResponse.message;
        this.result = characterResponse.result;
        
    }
  }

  export class Character {
    public properties?: CharacterProperties
    public description?: string
    public _id?: string
    public uid?: string
    public __v?: number
    constructor(character?: Character) {
        this.properties = character?.properties;
        this.description = character?.description;
        this._id = character?._id;
        this.uid = character?.uid;
        this.__v = character?.__v;
    }
  }
  
  export interface CharacterProperties {
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: string
    gender: string
    created: string
    edited: string
    name: string
    homeworld: string
    url: string
  }


