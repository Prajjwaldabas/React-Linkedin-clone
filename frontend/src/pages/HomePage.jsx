import React from 'react'

import Header from '../components/Header';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LeftSide from '../components/Leftside'
import Main from '../components/Main';
import RightSide from '../components/Rightside';

import { connect } from 'react-redux'
const HomePage = (props) => {
  return (
   <div>
   <Header/>

<Container>

    <Section>
        <h5>
            <Link> Hiring in a hurry? </Link>

           
        </h5>
        <p>
                Find talented pros in record time with upwork and keep business moving.
            </p>

    </Section>

    <Layout>

    
       
     <LeftSide/>
     <Main/>
     <RightSide/>
    </Layout>

</Container>


   </div>


    
  )
}




const Container = styled.div`
    padding-top: 52px;
    max-width: 100%;


`

const Content = styled.div`
    max-width:1128px;
    margin-left: auto;
    margin-right: auto;
   


`
const Section = styled.section`
    
    min-height: 50px;
    padding: 16px 0 ;
    box-sizing: content-box;
    text-align: center;
    text-decoration: underline;
    display: flex;
    justify-content: center;

    h5{

        color:#0a66c2;
        font-size: 14px;

        a{
            font-weight: 700;
            color:#0a66c2;
        font-size: 14px;

        }
    }

    p{
        font-size: 14px;
        color: #434649;
        font-size: 600;
    }

    @media (max-width:768px) {
            flex-direction: column;
            padding: 0 5px;

         

        }

    
`

const Layout = styled.div`
    display: grid;
      grid-template-areas: "leftside main rightside";
      grid-template-columns: minmax(0,5fr) minmax(0,12fr) minmax(300px,7fr);
      column-gap:25px;
      row-gap: 25px;
      /*   */
      grid-template-rows: auto;

      margin: 25px 0;


      @media (max-width:768px) {

        display: flex;
        flex-direction: column;
        padding: 0 5px;

      }
`

const mapStateToProps = (state)=>{
    return {
        user: state.userState.user,
    }
}




export default connect(mapStateToProps)(HomePage);
