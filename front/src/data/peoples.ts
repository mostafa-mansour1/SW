import { GenerateColors } from "../functions/GeneralFunction";
import { IPeople, ResourcesType } from "../interfaces/SWApiInterface";



const server = process.env.REACT_APP_SERVER || '/';
const path = server + "api/swapi/"

async function requestMany(endpoint: ResourcesType, page: number) {

  try {
    const url = path + endpoint + "?page=" + page;
    const headers = {
      "headers": {
        "accept": "application/json"
      },
      method: "POST"
    };
    const result = await fetch(url, headers).then((response) => response.json());
    const colors = GenerateColors(result.results.length);
    const results = result.results.map((people: any, index: number) => {
      people.id = people.url.slice(0, -1).split("/").pop();
      people.color = colors[index];
      return people
    })
    return results as IPeople[];
  } catch (err) {
    return [];
  }
}

async function requestOne(endpoint: ResourcesType, id: number) {
  try {
    const url = path + endpoint + "?id=" + id;
    const headers = {
      "headers": {
        "accept": "application/json"
      },
      method: "POST"
    };
    const people = await fetch(url, headers).then((response) => response.json());
    people.id = people.url.slice(0, -1).split("/").pop();
    people.color = GenerateColors()[0];
    return people
  } catch (err) {
    return null;
  }

}

export const getAllPeople = async (page: number = 1): Promise<IPeople[]> => await requestMany(ResourcesType.People, page);

export const getPeople = async (id: number = 1): Promise<IPeople> => await requestOne(ResourcesType.People, id);