
import './App.css';
import { useEffect } from 'react';
import { connect } from 'react-redux'

import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

import {
  createBrowserRouter,
  RouterProvider,Outlet
 
} from "react-router-dom";
import Login from './components/Login';
import { getUserAuth } from './actions';



const Layout =()=>{
  return (
    <div className="app">
      {/* <Navbar/> */}
      <Outlet/>
      {/* <Footer/> */}

    </div>
  )
}

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:"/home",
        element:<HomePage/>
      },
      {
        path:"/",
        element:<Login/>
      },
      // {
      //   path:"/products/:category",
      //   element:<ProductsPage/>
      // },
      // {
      //   path:"/product/:productId",
      //   element:<ProductPage/>
      // },

    ]
  },
 
])

function App(props) {

  useEffect(()=>{
props.getUserAuth();

  },[])
  return (
    <div>
     < RouterProvider router={router}/>
    </div>
  );
}


const mapStateToProps=(state)=>{
  return{};
}


const mapDispatchToProps = (dispatch)=>({
  getUserAuth: () => dispatch(getUserAuth())
})


export default connect(mapStateToProps,mapDispatchToProps)(App);
