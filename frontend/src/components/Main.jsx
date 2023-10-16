import React from 'react'
import styled from 'styled-components'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import SendSharpIcon from '@mui/icons-material/SendSharp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useState,useEffect} from 'react';

import PostModal from './PostModal';
import Loader from './Loader/Loader';
import { connect } from 'react-redux';

import { getArticlesAPI } from '../actions';
import { SET_LOADING_STATUS } from '../actions/actionType';
import ReactPlayer from 'react-player';


const Main = (props) => {
  // console.log(props.loading)

  // const [localArticles, setLocalArticles] = useState([]);
  // const [resetKey, setResetKey] = useState(0);

  const [showModal,setShowModal] = useState(false)
  const resetKey = Date.now();

  useEffect(() => {
    props.getArticles();
   
    
  }, [ ]);
  
  // useEffect(() => {
  //   // Since props.articles might change after the API call, you should set localArticles here.
  //   // You don't need to use localArticles if you're rendering directly from props.articles.
  //   // But if you want to use localArticles, set it when props.articles change.
  //   setLocalArticles(props.articles);
  //   console.log(localArticles)
  // }, [props.articles]);


  const handleClick = ()=>{
  setShowModal(!showModal)
 

 

  
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }


  return (
    <>
      <Container key={resetKey}>
        <ShareBox onClick={()=>handleClick()}>
          <div>
            {props.user && props.user.photoURL ? (
              <img src={props.user.photoURL} alt="" />
            ) : (
              <img src="images/user.svg" alt="" />
            )}

            <button  >
              Start a post
            </button>

          </div>
          <div>
            <button>
              <img src="/images/photo-icon.png" alt="" height={24} width={24} />
              <span>Photo</span>
            </button>
            <button>
              <img
                src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/file-video-icon.png"
                alt=""
                height={24}
                width={24}
              />
              <span>Video</span>
            </button>
            <button>
              <img
                src="https://kenandersonalliance.org/wp-content/uploads/2021/05/events-icon.png"
                alt=""
                height={24}
                width={24}
              />
              <span>Event</span>
            </button>
            <button>
              <img
                src="https://cdn2.iconfinder.com/data/icons/office-elements-icons/200/17-512.png"
                alt=""
                height={24}
                width={24}
              />
              <span>Article</span>
            </button>
          </div>
        </ShareBox>

  
        {props.articles.length === 0 ? (
       
             <h1>There are no articles!</h1>
          
         
     
       
        ) : (
          <Content>
            {props.loading && <Loader />}
            {props.articles?.length > 0 &&
              props.articles.map((article, index) => {
                return (
                  <Article key={index}>
                    <ShareActor>
                      <a>
                        <img src={article.actor.image} alt="" />
                        <div>
                          <span>{article.actor.title}</span>
                          <span>{article.actor.description}</span>
                          <span>
                            {article.actor.date.toDate().toLocaleDateString()}
                          </span>
                        </div>
                        <button>
                          <MoreHorizIcon />
                        </button>
                      </a>
                    </ShareActor>
                    <Description>
                      <p>{article.description}</p>
                    </Description>
                    <ShareImg>
                      <a>
                        {!article.sharedImg && article.video ? (
                          <ReactPlayer width={"100%"} url={article.video} />
                        ) : (
                          article.sharedImg && <img src={article.sharedImg} alt="" />
                        )}
                      </a>
                    </ShareImg>
                    <SocialCounts>
                      <li>
                        <button>
                          <img
                            src="http://clipart-library.com/images_k/facebook-like-icon-transparent/facebook-like-icon-transparent-1.png"
                            alt=""
                          />
                          <img
                            src="http://lh4.ggpht.com/ddD4XWFnpIvs1dIIDxV_T6VGkA9EdYjvMIT7jAE8N5FJt3Q2SVoZEUvqnfSAkaaKNA=w300"
                            alt=""
                          />
                          <img
                            src="https://purepng.com/public/uploads/large/heart-icon-y1k.png"
                            alt=""
                          />
                          <span>75</span>
                        </button>
                      </li>
                      <li>
                        <a>2 comments</a>
                      </li>
                    </SocialCounts>
                    <SocialActions>
                      <button>
                        <ThumbUpOffAltIcon />
                        <span>Like</span>
                      </button>
                      <button>
                        <MessageOutlinedIcon />
                        <span>Comment</span>
                      </button>
                      <button>
                        <LoopOutlinedIcon />
                        <span>Repost</span>
                      </button>
                      <button>
                        <SendSharpIcon />
                        <span>Send</span>
                      </button>
                    </SocialActions>
                  </Article>
                );
              })}
          </Content>
        
        )}
          { showModal && <PostModal handleCloseModal={handleCloseModal} /> }
      </Container>
    </>
  );
            }  

const Container = styled.div`
    
    grid-area: main;
    text-align: center;


`

const CommonCard = styled.div`
  border-radius: 5px;
  text-align: center;
  overflow: hidden;
  margin-bottom: 8px;
  background-color: #fff;
  position: relative;
  border: none;
  box-shadow: 0 0 0 1px rgb(0 0 0 / 15%),0 0 0 rgb(0 0 0 / 20%);


`

const ShareBox= styled(CommonCard)`

display: flex;
flex-direction: column;
color: #958b7b;
margin: 0 0 8px ;
background: white;


div {
  button {
    outline: none;
    color: rgba(0,0,0,0.6);
    font-size: 14px;
    line-height: 1.5;
    min-height: 48px;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    font-weight: 600;

  }
  &:first-child{

    display: flex;
    align-items: center;
     padding:8px 16px 0px 16px;

     img{
      width: 48px;
      border-radius: 50%;
      margin-right: 8px;

     }

     button{

      margin: 4px 0;
      flex-grow: 1;
      border-radius: 35px;
      padding-left: 16px;
      border: 1px solid rgba(0,0,0,0.15);
      background-color: white;
      text-align: left;
     }
    }

     &:nth-child(2){
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      padding-bottom: 4px;


      button{
        img{
          margin: 0 4px 0 -2px;

        };
        span{
          color: #70b5f9;

        }
      }
     } 
  }



`

const Article= styled(CommonCard)`
padding  : 0;
margin:0 0 8px;
overflow: visible;
 


`
const ShareActor = styled.div`
padding-right: 40px;
flex-wrap: nowrap;
padding: 12px 16px 0;

margin-bottom: 8px;
align-items: center;
display: flex;

a{
  margin-right: 12px;
  flex-grow:1;
  overflow: hidden;
  display: flex;
  text-decoration: none;


  img{
    width: 48px;
    height: 48px;
    border-radius: 50%;

  }

  & > div{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 0;
    margin-left: 8px;
    overflow: hidden;

    span{
      text-align: left;

      &:first-child{
        font-size: 14px;
        font-weight: 700;

        color: rgba(0,0,0,1);

    }

    &:nth-child(n+1){
      font-size: 12px;
      color: rgba(0,0,0,0.6);
    }
   
  }

}
}

button{
  position: absolute;
  right: 12px;
  top: 0;

  background: transparent;
  border: none;
  outline: none;
}







`


const Description = styled.div`
padding: 0 6px;
overflow: hidden;
color: rgba(0,0,0,0.9);
font-size: 14px;

text-align: left;


`;

const ShareImg = styled.div`
  margin-top: 8px;
  width: 100%;
  display: block;
  position: relative;
  background-color: #f9fafb;
  

  img{
    object-fit:contain;
    width: 100%;
    height: 100%;
  }
`



const SocialCounts= styled.ul`
  line-height: 1.3;
  display: flex;
align-items: center;
overflow: auto;
margin: 0 16px;
padding: 8px 0;
border-bottom: 1px solid #e9e5df;
list-style: none;
justify-content: space-between;


li{
  font-size: 12px;

  margin-right: 5px;

  button{
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;
    color: grey;
    
span{
  margin-left: 5px;
}

    img{
      border-radius: 50%;
      object-fit: contain;
      height: 20px;
      width: 20px;
    
    }
  }
}
`
const SocialActions = styled.div`

align-items: center;
display: flex;
justify-content: space-between;
margin: 0;
min-height: 40px;
padding: 4px 8px;





button{
  display: inline-flex;
  align-items: center;
  padding: 8px;
  /* color: #0a66c2; */
  color: grey;
  font-weight: 600;
  background-color: transparent;
  border: none;
  transition: all ease-in-out;
  cursor: pointer;
 border-radius: 5px;
&:hover{
  background-color: #eae8e8;
}


  @media (min-width: 768px){
    span{
margin-left: 8px;
 


}
  }



}
`
const Content = styled.div`
  text-align: center;
  & > img {
    width: 30px;

  }

`

const mapStateToProps = (state)=>{
  return {
    loading: state.articleState.loading,
    user: state.userState.user,
    articles: state.articleState.articles
  }
}

const mapDispatchToProps = (dispatch) => ({
  getArticles: () => {

    dispatch(getArticlesAPI());
  }
});



;
export default connect(mapStateToProps,mapDispatchToProps)(Main);