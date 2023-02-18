import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header/Header';
import { useState, useContext } from 'react';
import Mycontext from './context'
import sanityCli from '../mediumblog/sanity.cli';
import { sanityClient , urlFor } from '../sanity';
import { Post } from '../typings';
import Link from 'next/link';
import User from '../public/user.jpg'
interface Props{
  posts:[Post]
}
const Home = ({posts}:Props) => {
  const {color,setColor} = useContext(Mycontext)
  // console.log(posts)
  return (
    <div className="max-w-full mx-auto">
      <Head>
        <title>Medium</title>
        <link rel="icon" href="/mediumicon.png" />
      </Head>

      
      <div className={`flex justify-between items-center ${color} py-4`}>
        <div className='px-10 space-x-5'>
          <h1 className='text-6xl max-w-xl font-serif'>
            Stay Curicous  
          </h1>
          <h2>
            Discover stories, thinking, and expertise from writers on any topic.
          </h2>
        </div>
        <img src="./medium2.png" alt="" className='hidden md:inline-flex h-32 lg:h-full ' />
      </div>
      {/* Posts  */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 '>
        {
          posts.map(post => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className='border rounded-lg group cursor-pointer overflow-hidden'>
                <img src={urlFor(post.mainImage).url()} alt="" className='w-full h-60 object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out' />
                <div className='flex justify-between p-5 bg-white'>
                  <div>
                    <p>{post.title}</p>
                    <p>{post.description} by {post.author.name}</p>
                  </div>
                  <img  src={urlFor(post.author.image).url()!} alt="" className='h-12 w-12 rounded-full' />
                  {/* <div>{post.catgories.body}</div> */}
                </div>
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}
export const getServerSideProps = async() => {
   const query = `*[_type == "post"]{
    _id,
    title,
    author -> {
      name,
      image
    },
    description,
    categories,
    mainImage,
    slug
  }`;
  const posts = await sanityClient.fetch(query);
  return {
    props:{
      posts,
    }
  }
}
export default Home
