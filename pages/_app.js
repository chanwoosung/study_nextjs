import '../styles/globals.css'
import Navbar from "../components/navbar.js"
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />
  return (<div>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
    )
}

export default MyApp
