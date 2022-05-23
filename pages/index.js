import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useEffect, useState} from "react";
import Navbar from "../components/navbar.js"
import Title from '../components/Title';
import Link from 'next/link';
import { useRouter } from 'next/router';

const API_KEY = "10923b261ba94d897ac6b81148314a3f";

export default function Home({results}) {
  // const [count,setCounter] = useState(0);
  const [movies, setMovies] = useState([]);
  const router = useRouter();
  const onClick = (id) => {
    router.push({
      pathname:`/movies/${id}`,
      query: {
        title:id
      }
    },`/movies/${id}`);
    // setMovies(movies.filter((movie) => movie))
  }
  useEffect(()=>{
    (async ()=> {
      // const {results} = await (
      // await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
      //   await fetch(`/api/movies`)
      // ).json();
      console.log(results);
      setMovies(results);
    })();
  },[]);
  return (
    <div className='container'>
      <Title title="Home"/>
      {/* {!movies && <h4>Loading...</h4>} */}
      {!results && <h4>Loading...</h4>}
      {/* {movies?.map((movie) => (
        <div className="movie" key={movie.id}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <h4>{movie.original_title}</h4>
        </div>
      ))} */}
      {results?.map((movie) => (
        <div className="movie" key={movie.id} onClick={()=>onClick(movie.id)}>
          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <a>
              <h4>{movie.original_title}</h4>
            </a>
          </Link>
        </div>
      ))}

      {/* {movies?.map((movie) => (<div key={movie.id}><h4>{movie.original_title}</h4></div>))} */}
      {/* <h1>TEST{count}</h1>
      <button onClick={() => setCounter((prev) => prev+1)}>+ Button</button> */}
       <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );

}

//백엔드 서버에서만 움직임
export async function getServerSideProps(){
  const {results} = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props:{
      results,
    }
  }
}