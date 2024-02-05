import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ScrollToTop from './shared/scrolltotop/scrolltotop';
import Header from './shared/header/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/home';
import Aboutus from './pages/about-us/about-us';
import Advertise from './pages/advertise/advertise';
import CrossPromotion from './pages/cross-promotion/cross-promotion';
import Subscribe from './pages/subscribe/subscribe';
import Research from './pages/research/research';
import Latestproject from './shared/latest-project/latest-project';
// import Ecosystem from './shared/ecosystem/ecosystem';
// import Allresearch from './shared/all-research/all-research';
import News from './pages/news/news';
import SinglePost from './pages/single-post/SinglePost';
// import Footer from './shared/footer/footer';

import Podcasts from './pages/podcasts/podcasts';
import Latestnews from './shared/latest-news/latest-news';
import Footer from './shared/footercmp/footercmp';
import MainFooter from './shared/main-footer/main-footer';
import PodcastsSingle from './shared/podcasts-single/podcasts-single';
import Ecosystem from './shared/ecosystem/ecosystem';


function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:type/:subtype" element={<Home />}></Route>
          <Route path="/about-us" element={<Aboutus />}></Route>
          <Route path="/advertise" element={<Advertise />}></Route>
          <Route path="/cross-promotion" element={<CrossPromotion />}></Route>
          <Route path="/subscribe" element={<Subscribe />}></Route>
          <Route path="/latest-project" element={<Latestproject />}></Route>
          <Route path="/ecosystem" element={<Ecosystem />}></Route>
          <Route path="/ecosystem/:type" element={<Ecosystem />}></Route>
          <Route path="/ecosystem/:type/:subtype" element={<Ecosystem />}></Route>
          <Route path="/research" element={<Research />}></Route>
          <Route path="/research/:type" element={<Research />}></Route>
          <Route path="/research/:type/:subtype" element={<Research />}></Route>
          <Route path="/news" element={<News />}></Route>
          <Route path="/news/:type" element={<News />}></Route>
          <Route path="/news/:type/:subtype" element={<News />}></Route>
          <Route path="/post/:slug" element={<SinglePost />}></Route>
          <Route path="/podcasts-details/:slug" element={<PodcastsSingle />}></Route>
          <Route path="/podcasts" element={<Podcasts />}></Route>
          <Route path="/podcasts/:type" element={<Podcasts />}></Route>
          <Route path="/podcasts/:type/:subtype" element={<Podcasts />}></Route>
          {/* <Route path="/all-news" element={<Latestnews />}></Route> */}
        </Routes>
        {/* <Footer /> */}
        <MainFooter />
      </Router>
    </>
  );
}

export default App;
