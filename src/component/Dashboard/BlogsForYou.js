import React, { useState, useEffect } from 'react'
import { auth, db } from '../../firebase/config'
import { query, collection, doc, where, limit, getDocs, updateDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import parse from 'html-react-parser';
import './blogs-for-you.scss'

function BlogsForYou() {
  const [ blogsList, setBlogsList ] = useState()

  let navigate = useNavigate()

  function blogsRender() {
    if (auth?.currentUser) {
      const postRef = query(collection(db, "posts"), where("user_id", "!=", auth?.currentUser?.uid), limit(3))

      async function postsForYou() {
        const docSnap = await getDocs(postRef)

        const blogs = []
        docSnap.forEach(doc => {
          blogs.push(doc.data())
        })

        setBlogsList(blogs)
        console.log(blogsList)
      }

      postsForYou()
    } else {
      navigate('/')
    }
    
  }

  useEffect(function() {
    blogsRender()
  }, [auth?.currentUser])

  return (
    <section className='blog-section'>
      <h5>Blogs You May Like</h5>
      <div className='blog-container'>
      {blogsList?.map(blog => {
        return (
        <Link key={blog.content} to={`/post/${blog.user_id}/${blog.id}`}>
          <div className='blog-card'>
            <div className='blog-image'>
              <img src={blog.imageUrl} alt={blog.id}/>
            </div>
            <div className='blog-title'>
              <h6>{blog.title}</h6>
            </div>
            <div className='blog-content'>
              {blog.content.length > 120 ? parse(blog.content.substring(0, 121) + '...') :  parse(blog.content)}
            </div>
            
          </div>
        </Link>
        )
      })}
      </div>
    </section>
  )
}

export default BlogsForYou