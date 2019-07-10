export default class SwapiService {

  _apiBase = 'https://swapi.co/api';

  getResource = async (path) => {
    const res = await fetch( `${this._apiBase}${path}` );
    if (!res.ok) {
      throw new Error(`Could not fetch ${path}, recieved ${res.status}.`);
    }
    return await res.json();
  };

  getAllPlanets = async () => {
    const res = await this.getResource(`/planets`);
    return res.results.map(this._transformPlanet);
  };

  getPlanet = async (id) => {
    const planet = await this.getResource(`/planets/${id}`);
    return this._transformPlanet(planet);
  };

  getPeople = async () => {
    const res = await this.getResource(`/people`);
    return res.results.map(this._transformPerson);
  };

  getPerson = async (id) => {
    const person = await this.getResource(`/people/${id}`);
    return this._transformPerson(person);
  };

  getAllSpaceships = async () => {
    const res = await this.getResource(`/starships`);
    return res.results.map(this._transformSpaceship);
  };

  getSpaceship = async (id) => {
    const spaceship = await this.getResource(`/starships/${id}`);
    return this._transformSpaceship(spaceship)
  };

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      diameter: planet.diameter,
      gravity: planet.gravity,
      population: planet.population
    };
  };

  _transformSpaceship = (spaceship) => {
    return {
      id: this._extractId(spaceship),
      name: spaceship.name,
      model: spaceship.model,
      manufactured: spaceship.manufactured,
      costInCredits: spaceship.costInCredits,
      length: spaceship.length,
      crew: spaceship.crew,
      passengers: spaceship.passengers,
      cargoCapacity: spaceship.cargoCapacity

    };
  };

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    };
  };
}