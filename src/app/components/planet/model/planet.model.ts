export class PlanetResponse {
  message: string;
  result: Planet;

  constructor(planetResponse: PlanetResponse) {
    this.message = planetResponse.message;
    this.result = planetResponse.result;
  }
}

export class Planet {
  public properties?: PlanetProperties;
  public description?: string;
  public _id?: string;
  public uid?: string;
  public __v?: number;
  constructor(planet?: Planet) {
    this.properties = new PlanetProperties(planet?.properties);
    this.description = planet?.description;
    this._id = planet?._id;
    this.uid = planet?.uid;
    this.__v = planet?.__v;
  }
}

export class PlanetProperties {
  public diameter?: string;
  public rotation_period?: string;
  public orbital_period?: string;
  public gravity?: string;
  public population?: string;
  public climate?: string;
  public terrain?: string;
  public surface_water?: string;
  public created?: string;
  public edited?: string;
  public name?: string;
  public url?: string;

  constructor(properties?: PlanetProperties) {
    this.diameter = properties?.diameter;
    this.rotation_period = properties?.rotation_period;
    this.orbital_period = properties?.orbital_period;
    this.gravity = properties?.gravity;
    this.population = properties?.population;
    this.climate = properties?.climate;
    this.terrain = properties?.terrain;
    this.surface_water = properties?.surface_water;
    this.created = properties?.created;
    this.edited = properties?.edited;
    this.name = properties?.name;
    this.url = properties?.url;
  }
}

export interface PlanetPageParams {
  uid: number
}
