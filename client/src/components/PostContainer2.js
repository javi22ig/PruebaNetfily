import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import MyPost from './MyPost'
import Wrapper from '../assets/wrappers/PostsContainer'

const PostsContainer2 = () => {
  const { getMyPosts, posts, isLoading, page, totalPosts } = useAppContext()
  useEffect(() => {
    getMyPosts()
  }, [])

  if (isLoading) {
    return <Loading center />
  }
  if (posts.length === 0) {
    return (
      <Wrapper>
        <h2>No posts to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalPosts} My post{posts.length > 1 && 's'} found
      </h5>
      <div className='posts'>
        {posts.map((post) => {
            
                return <MyPost key={post._id} {...post} />
            
          
        })}
      </div>
    </Wrapper>
  )
}

export default PostsContainer2