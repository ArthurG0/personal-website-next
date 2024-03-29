import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'

import HomeComponent from '../components/HomeComponent'
import Header from '../components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (

    <div>

    <Header/>
    <HomeComponent />

    </div>
  )
}
