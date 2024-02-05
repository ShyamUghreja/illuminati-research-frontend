/* eslint-disable no-useless-concat */
import axios from "axios";
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
console.log(apiBaseUrl, "baseurl")
// const BASE_URL = process.env.REACT_APP_API_BASE_URL
const getnewspostUrl = `${apiBaseUrl}/api/posts`
const getAllCategoriesURL = `${apiBaseUrl}/api/tags`
const getPodcastsURL = `${apiBaseUrl}/api/podcasts`
const getUpcomingURL = `${apiBaseUrl}/api/podcast-upcomings`

const getNewsData = async (paginationStart: number, paginationLimit: number, operationType: string, type?: string, trending?: boolean, tag?: string, showAll?: boolean, ecosystem?: string): Promise<any> => {
  let strUrl = "";
  if (operationType === "Trending") {
    if (showAll) {
      strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&type=${type}&trending=${trending}&tag=${tag}`
    } else {
      strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&type=${type}&trending=${trending}`
    }
  }
  if (operationType === "Crypto-news") {
    if (showAll) {
      strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&type=${type}&tag=${tag}`
    } else {
      strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&type=${type}`
    }
  }
  if (operationType === "Research-hub") {
    strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&type=${type}&tag=${tag}`
  }

  if (operationType === "Ecosystem") {
    strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&type=${type}&ecosystem=${tag}`
  }

  if (operationType === "Footer-trending") {
    strUrl = getnewspostUrl + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&type=${type}&trending=${trending}`
  }
  const res = await axios.get(strUrl);
  console.log("getNewsData", res)
  return res;
};

const getEcosysyemData = async (paginationStart: number, paginationLimit: number, operationType: string, trending?: boolean, tag?: string, showAll?: boolean): Promise<any> => {

  let strUrl = "";
  if (operationType === "Podcast") {
    if (showAll) {
      strUrl = getPodcastsURL + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&trending=${trending}&tag=${tag}`
    } else {
      strUrl = getPodcastsURL + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&trending=${trending}`
    }
  }
  const res = await axios.get(strUrl);
  console.log("getNewsData", res)
  return res;
};

const getPodcastData = async (paginationStart: number, paginationLimit: number, operationType: string, trending?: boolean, tag?: string, showAll?: boolean, slug?: string): Promise<any> => {
  let strUrl = "";

  if (operationType === "Podcast") {
    if (showAll) {
      strUrl = getPodcastsURL + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&trending=${trending}&tag=${tag}`
    } else {
      strUrl = getPodcastsURL + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&trending=${trending}`
    }
  }

  if (operationType === "all-podcasts") {
    strUrl = getPodcastsURL + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&tag=${tag}`
  }

  if (operationType === "single-podcasts") {
    strUrl = getPodcastsURL + "/" + slug
  }

  const res = await axios.get(strUrl);
  console.log("getNewsData", res)
  return res;
};
const getUpcomingData = async (paginationStart: number, paginationLimit: number, operationType: string, tag?: string, showAll?: boolean): Promise<any> => {

  let strUrl = "";
  if (operationType === "upcoming") {
    if (showAll) {
      strUrl = getUpcomingURL + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}&tag=${tag}`
    } else {
      strUrl = getUpcomingURL + `?pagination[start]=${paginationStart}&pagination[limit]=${paginationLimit}`
    }
  }
  
  const res = await axios.get(strUrl);
  console.log("getNewsData", res)
  return res;
};

const getAllCategories = async (): Promise<any> => {
  const res = await axios.get(getAllCategoriesURL);
  return res;
};

interface SearchQuery {
  type?: string
  tag?: string
  trending?: boolean
  ecosystem?: string
  search_term?: string
}

export const getPosts = (query: SearchQuery, skip: number, limit: number): Promise<any> => {
  console.log('queryqueryquery', query);

  let queryParams = `?pagination[start]=${skip}&pagination[limit]=${limit}`
  if (query.type !== undefined && query.type !== "") {
    queryParams = queryParams + `&type=${query.type}`
  }
  if (query.tag !== undefined && query.tag !== "") {
    queryParams = queryParams + `&tag=${query.tag}`
  }
  if (query.trending === true) {
    queryParams = queryParams + `&trending=${query.trending}`
  }
  if (query.ecosystem !== undefined && query.ecosystem !== "") {
    queryParams = queryParams + `&ecosystem=${query.ecosystem}`
  }
  if (query.search_term !== undefined && query.search_term !== "") {
    queryParams = queryParams + `&search_term=${query.search_term}`
  }

  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/posts`,
    params: queryParams
  }
  console.log("config", config);

  let result = new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data)
    )
      .catch(err => reject(err))
  })

  console.log("gdshdbjadj", result)
  return result
};

export const getPostById = (slug: string): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/posts/${slug}`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getCategories = (): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/tags`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getEcosystem = (): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/ecosystems`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getPdfs = (): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/pdfs`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getTweets = (): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/tweets`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const getNextNewsArticle = async (categoryName: string, excludeSlugString: string): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/posts/next?tag=${categoryName}&exclude=${excludeSlugString}`
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
};

export const searchResultAPI = async (term: string): Promise<any> => {
  const config = {
    method: "get",
    url: `${apiBaseUrl}/api/search`,
    params: { term }
  }
  return new Promise((resolve, reject) => {
    axios(config).then(res => resolve(res.data))
      .catch(err => reject(err))
  })
}

export {
  getNewsData,
  getAllCategories,
  getPodcastData,
  getEcosysyemData,
  getUpcomingData
}