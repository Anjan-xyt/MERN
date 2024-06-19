import {Outlet} from 'react-router-dom'
import { Header, Footer } from './components';
import { Toaster } from 'react-hot-toast';

function Layout() {
  return (
    <>
    <div><Toaster
  position="top-right"
  reverseOrder={false}
/></div>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout