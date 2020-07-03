import React from "react"
import { Link, graphql, useStaticQuery} from "gatsby"
import Layout from "../components/layout"
import Head from "../components/head"
import blogStyles from './blog.module.scss'
const BlogPage = () => {
    const data = useStaticQuery(graphql`
        query {
            allContentfulBlogPost (
                sort: {
                    fields:publishedDate,
                    order:DESC
                }
            ) {
                edges {
                    node {
                        title
                        slug
                        publishedDate(formatString:"MMMM Do, YYYY")
                    }
                }
            }
        }
    `)
    return ( 
        <Layout>
            <Head title="Blog"/>
            <div>
                <h1>Blog</h1>
                {/* <h2>Posts will show up here later on.</h2> */}
                <ol className={blogStyles.posts}>
                    {data.allContentfulBlogPost.edges.map((edges) => {
                        return (
                            <li className={blogStyles.post}>
                                <Link to={`/blog/${edges.node.slug}`}>
                                    <h2>{edges.node.title}</h2>
                                    <p>{edges.node.publisheDate}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </Layout>
    )
}

export default BlogPage


// query {
//     allContentfullBlogPost (sort: {
//         fields:publisheDate,
//         order:DESC
//     }) {
//         edges {
//             node {
//                 title 
//                 slug
//                 publicsheDate (formatString: "MMMM Do, YYYY")
//             }
//         }
//     }
// }


// query {
//     allMarkdownRemark {
//         edges {
//             node {
//                 frontmatter {
//                     title
//                     date
//                 }
//                 fields {
//                     slug
//                 }
//             }
//         }
//     }
// }

// {data.allMarkdownRemark.edges.map((edges) => {
//     return (
//         <li className={blogStyles.post}>
//             <Link to={`/blog/${edges.node.fields.slug}`}>
//                 <h2>{edges.node.frontmatter.title}</h2>
//                 <p>{edges.node.frontmatter.date}</p>
//             </Link>
//         </li>
//     )
// })}