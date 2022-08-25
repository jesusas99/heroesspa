import { heroes } from '../data/heroes';


export const getHeroesByPublisher = ( publisher ) => {
    const validPubishers = [ 'DC Comics', 'Marvel Comics'];
    if( !validPubishers.includes( publisher ) ){
        throw new Error(`${ publisher } is not a valid publisher`);
    }


    return heroes.filter( heroe => heroe.publisher === publisher );
}