import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from '../components/Sidebar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
    <Head>
      <title>Viber</title>
      <meta name="description" content="" />
      <link rel="icon" href="favicon.ico" type="image/x-icon" />
    </Head>
    <Box h="100vh">

    <Sidebar/>
    </Box>
    </div>
  )
}
