import React, { useContext, useEffect } from "react";
import { Store } from "./Redux/Store";
import { IAction } from "./Redux/Store"
import "./App.css";

export interface IEpisode {
  airdate: string;
  airstamp: string;
  airtime: string;
  id: number;
  image: {
    medium: string;
    original: string;
  };
  name: string;
  number: number;
  runtime: number;
  season: number;
  summary: string;
  type: string;
  url: string;
}

function App(): JSX.Element {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  const addFavAction = (episode: IEpisode): IAction => {

    // const episodeInFav = state.favourites.inculde(episode);
    //    let dispatchObj = {
    //      type: "ADD_FAV",
    //      payload: episode,
    //    };
    // if (!episode) { 

    // }
   return dispatch({
      type: 'ADD_FAV',
      payload: episode
    })
  }

  const fetchDataAction = async () => {
    const url =
      "http://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";
    const data = await fetch(url);
    const dataJSON = await data.json();
    // console.log('dataJson', dataJSON)
    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON._embedded.episodes,
    });
  };

  console.log(state);

  return (
    <div className="App">
      <h1>Rick and Morty</h1>
      <p>Pick your favourites episode</p>
      <section className="bodyview">
        {state.episodes.map((episode: IEpisode) => {
          return (
            <section key={episode.id} className="oneepi">
              <img src={episode.image.medium} alt="R&B episode" />
              <section>
                seasion:{episode.season} Number:{episode.number}
              </section>
              <div>
                <button
                  onClick={() => addFavAction(episode)}
                  className="epi_button"
                >
                 Fav {/* {state.favourites.find((fav:IEpisode)=>fav.id===episode.id)?'unfav':'Fav'} */}
                </button>
              </div>
            </section>
          );
        })}
      </section>
    </div>
  );
}

export default App;
// import React, { useReducer } from "react";

// export default function App() {
//   const reducer = (state:number, action:any) => {
//     switch (action.type) {
//       case "ADD":
//         return state + 1;
//       case "SUB":
//         return state - 1;
//       case "RES":
//         return (state = 0);
//       default:
//         return state;
//     }
//   };
//   //const [value,setValue]=React.useState('')
//   const [count, dispatch] = useReducer(reducer, 2);

//   return (
//     <div>
//       <div>{count}</div>
//       <button onClick={() => dispatch({ type: "ADD", payload: 0 })}>+</button>
//       <button onClick={() => dispatch({ type: "SUB", payload: 0 })}>-</button>
//       <button onClick={() => dispatch({ type: "RES", payload: 0 })}>reset</button>
//     </div>
//   );
// }
