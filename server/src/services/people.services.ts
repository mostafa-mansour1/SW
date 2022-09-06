import { People } from '../helper/SWApi';
import { IPeople } from '../interfaces/SWApi.interface';


/**
 * Call getAllPeople.
 * 
 * @param page number 
 * @returns IPeople
 */
export const getOnePeople = async (id: number) => {
    return await People.getId(id) as IPeople;
}

/**
 * Call getAllPeople.
 * 
 * @param page number 
 * @returns IPeople[]
 */
export const getAllPeople = async (page = 1) => {
    return await People.getPage(page) as IPeople[];
}