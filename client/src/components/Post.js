import moment from 'moment'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Post'

const Post = ({ 
    _id,
    createdAt,
    nameProduct,
    locationPost,
    descriptionPost,
    imgPost,
    changeBy,

}) => {

    const { setEditPost, deletePost } = useAppContext()

    let date = moment(createdAt)
    date = date.format('MMM Do, YYYY')

    return (
        <Wrapper>
            <header>
                <div className='info'>
                    <h5>{nameProduct}</h5>
                   
                </div>
            </header>
            <div className='content'>
                <div className='content-center'>
                    <img src={imgPost}/>
                    <p>{descriptionPost}</p>
                    <p>Location: {locationPost}</p>
                    <p>changeBy: {changeBy}</p>
                </div>
                <footer>
                    <div className='actions'>
                        <button
                            type='button'
                            className='btn sucesses-btn'
                           
                        >
                            Chat
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    )
}

export default Post