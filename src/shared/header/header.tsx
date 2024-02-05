import React, { useEffect, useRef, useState } from "react";
import { Button, NavLink, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/Nav";
import Logo from "../../assets/crypto-logo.svg";
import "./hader.sass";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubscribeModal from "../all-hero/modal/subscribe-modal";
import MenuOpenIcon from '../../assets/menu-open.svg';
import useOutside from "../../hooks/useOutside";
import ReactContentLoader from 'react-content-loader';
import { DebounceInput } from 'react-debounce-input';
import { searchResultAPI } from "../../api/posts";

const Header = () => {
    const [isActive, setActive] = useState(false);
    const [scroll, setScroll] = useState(false)
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const [subscribemodal, setSubscribemodal] = useState<boolean>(false)
    const subscribemodalToggle = () => {
        setSubscribemodal(!subscribemodal)
    }
    const [refreshData, setRefreshData] = useState<boolean>(false)
    const nav = useNavigate();

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 100);
        });
    }, []);
    return (
        <>
            <header
                className={scroll ? "scrolled" : ""}
            >
                <Container>
                    <Navbar className="justify-content-between">
                        <Navbar.Brand className="d-lg-flex" role="button" onClick={() => { nav("/") }}>
                            <img className='img-fluid' src={Logo} alt="logo" />
                        </Navbar.Brand>
                        <Navbar
                            className={
                                isActive
                                    ? "justify-content-end menu logo active border-0"
                                    : "justify-content-end menu logo border-0"}
                        >
                            <Nav className="header-navigation">
                                <Navbar.Brand onClick={() => { nav("/") }}>
                                    <img className='img-fluid' src={Logo} alt="logo" />
                                </Navbar.Brand>
                                <hr className="d-block d-lg-none" />
                                {/* <div className="mobile-search">
                                    <div className="mobile-search-input">
                                        <input type="text" placeholder="Search..." />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                </div> */}
                                <div className="close-menu-icon" onClick={() => setActive(false)}>
                                    <i className="ri-close-line"></i>
                                </div>
                                <Link
                                    to="/"
                                    className={splitLocation[1] === "" ? "active" : ""}
                                    onClick={() => setActive(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    to="/research"
                                    className={splitLocation[1] === "research" ? "active" : ""}
                                    onClick={() => setActive(false)}
                                >
                                    Research
                                </Link>
                                <Link
                                    to="/news"
                                    className={splitLocation[1] === "news" ? "active" : ""}
                                    onClick={() => setActive(false)}
                                >
                                    News
                                </Link>
                                <Link
                                    to="/podcasts"
                                    className={splitLocation[1] === "podcasts" ? "active" : ""}
                                    onClick={() => setActive(false)}
                                >
                                    Podcasts
                                </Link>
                                <Link
                                    to="/about-us"
                                    className={splitLocation[1] === "about-us" ? "active" : ""}
                                    onClick={() => setActive(false)}
                                >
                                    About Us
                                </Link>
                            </Nav>
                        </Navbar>
                        <div className="flex items-center">
                            <GlobalSearch />
                            <button type="button" className="primary-btn btn btn-primary rounded-0 d-block my-lg-2 d-lg-block d-none" onClick={() => { nav("/subscribe") }}>
                                Subscribe
                            </button>
                            <NavLink className="open-menu-icon" onClick={() => setActive(true)}>
                                <img src={MenuOpenIcon} alt="" className="img-fluid" />
                            </NavLink>
                        </div>
                    </Navbar>
                </Container>
            </header>
            <SubscribeModal isOpen={subscribemodal} toggle={subscribemodalToggle} setRefreshData={setRefreshData} />
        </>
    );
};

export default Header;


const GlobalSearch = () => {
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState<string>("")
    // const [dInput, setDInput] = useState<string>("")
    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(false)

    const outsideRef = useRef(null)
    useOutside(outsideRef, () => setOpen(false));

    useEffect(() => {
        if (input && input.length > 2) {
            fetchPosts()
        } else {
            setPosts([])
        }
    }, [input])

    const fetchPosts = () => {
        setLoader(true)
        setPosts([])
        searchResultAPI(input).then(res => {
            setLoader(false)
            const { podcasts = [], posts = [] } = res.data || {}
            const result = [] as any

            if (podcasts.length > posts.length) {
                for (let i = 0; i < podcasts.length; i++) {
                    const article = posts[i]
                    const podcast = podcasts[i]
                    if (article) {
                        result.push({
                            type: "Article",
                            path: `/post/${article.slug}`,
                            image: article.thumbnailUrl,
                            title: article.title,
                        })
                    }
                    result.push({
                        type: "Podcast",
                        path: `/podcast/${podcast.slug}`,
                        image: podcast.imageUrl,
                        title: podcast.title,
                    })

                }
            } else {
                for (let i = 0; i < posts.length; i++) {
                    const article = posts[i]
                    const podcast = podcasts[i]
                    result.push({
                        type: "Article",
                        path: `/post/${article.slug}`,
                        image: article.thumbnailUrl,
                        title: article.title,
                    })
                    if (podcast) {
                        result.push({
                            type: "Podcast",
                            path: `/podcast/${podcast.slug}`,
                            image: podcast.imageUrl,
                            title: podcast.title,
                        })
                    }
                }
            }

            setPosts(result)
        }).catch(err => {
            setLoader(false)
        })
    }

    const ContentLoader = () => {
        return <div className="px-2">
            <ReactContentLoader height={80} width={"100%"} backgroundColor="#c5c5c5">
                <rect x="0" y="10" rx="5" ry="5" width="100%" height="15px" />
                <rect x="0" y="30" rx="5" ry="5" width="50%" height="15px" />
                <rect x="0" y="60" rx="5" ry="5" width="100%" height="2px" />
            </ReactContentLoader>
            <ReactContentLoader height={80} width={"100%"} backgroundColor="#c5c5c5">
                <rect x="0" y="10" rx="5" ry="5" width="100%" height="15px" />
                <rect x="0" y="30" rx="5" ry="5" width="50%" height="15px" />
                <rect x="0" y="60" rx="5" ry="5" width="100%" height="2px" />
            </ReactContentLoader>
        </div>
    }

    return <div className="global-search-container">
        <div className="global-search-icon" onClick={() => setOpen(prev => !prev)}>
            <i className="ri-search-line search-icon"></i>
        </div>
        {open && <div ref={outsideRef} className={"search-content-container"}>
            {/* <div className="content"> */}
            <div className="search-input-div">
                <DebounceInput
                    // element={() => <input type="text" placeholder="Type here..." />}
                    minLength={2}
                    value={input}
                    placeholder="Type here..."
                    debounceTimeout={400}
                    onChange={event => setInput(event.target.value)}
                />
            </div>
            <div>
                {loader && <ContentLoader />}
                {
                    !loader && posts.length ? <ul className="m-0 px-0" style={{ maxHeight: '400px', overflow: 'auto' }}>
                        {posts.map((item: any, index: number) => {
                            return <li key={index} className="px-2 hover:bg-neutral-700 cursor-pointer" style={{ borderBottom: "1px solid grey", height: 100, position: "relative" }}>
                                <span className="absolute" style={{
                                    top: '5px',
                                    right: '8px',
                                    background: '#c43d3d',
                                    color: 'white',
                                    padding: '0px 10px',
                                    borderRadius: '17px',
                                    fontSize: '14px'
                                }}>{item.type}</span>
                                <a href={item.path} target="_blank" className="flex items-center h-full no-underline" style={{ color: "#e6e6e6", paddingTop: 24 }}>
                                    <img width={50} src={item.image} />
                                    <span className="ml-2" style={{
                                        fontWeight: '500',
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: '3',
                                        WebkitBoxOrient: 'vertical'
                                    }}>{item.title}</span>
                                </a>
                            </li>
                        })}
                    </ul> : null
                }
            </div>
        </div>}
    </div >
}
