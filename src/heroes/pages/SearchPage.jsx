import { useLocation, useNavigate } from "react-router-dom";
import queryString from 'query-string';
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components/HeroCard"
import { getHeroesByName } from "../helpers/getHeroesByName";

export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search)
  
  const { searchText, onInputChange } = useForm({
    searchText: q
  });

  const handleSubmit = (event) =>{
    event.preventDefault();

    // if( searchText.trim().length <= 1) return;s

    navigate(`?q=${ searchText }`);
  }

  const heroes = getHeroesByName(q);
  return (
    <>
      <h1>Search</h1>
      <hr />
      <div className="row">
          <div className="col-5">
            <h4>Searching</h4>
            <hr />
            <form onSubmit={handleSubmit} aria-label="form">
              <input type="text" name="searchText" className="form-control" placeholder="Search a hero" autoComplete="off" 
              value={searchText} onChange={onInputChange}/>
            </form>

            <button className="btn btn-primary mt-1" onClick={ handleSubmit }> 
              Search
            </button>
          </div>
          <div className="col-7">
            <h4>Results</h4>
            <hr />
            {
              q === '' ?
              <div className="alert alert-primary">
                Search a hero
              </div>
              : ( heroes.length === 0 ) &&
               (<div aria-label="nores" className="alert alert-danger">
                  There are no results for <b> { q } </b>
                </div>  )
            }




            {
              heroes.map( hero => (

                <HeroCard key={hero.id} {...hero}/>
              ))
            }
          </div>
      </div>
    </>
  )
}
