import '@/styles/globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Head from 'next/head'
import { withIronSessionSsr } from 'iron-session/next'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps}) {
  const [data, setData] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch('/api/getUser', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
      })
      const resData = await response.json();
      console.log(resData);
      setData(resData);
    }
    getUserData();
  }, [Component]);

  useEffect(() => {
    const check = async () => {
      console.log(searchResults);
    }
  }, [searchResults])

  return <>
    <Head>
      <title>SpeakUp</title>
      <link rel = 'icon' href = 'logo.png' type = 'image/png'/>
    </Head>
    <Header data = {data} searchResults = {searchResults} setSearchResults = {setSearchResults}/>
    <Component {...pageProps} data = {data} searchResults = {searchResults} setSearchResults = {setSearchResults}/>
    <Footer/>
  </> 
}
