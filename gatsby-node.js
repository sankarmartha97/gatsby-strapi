const path = require('path')

// module.exports.onCreateNode = ({ node, actions }) => {
//     const { createNodeField } = actions

//     if(node.internal.type === 'MarkdownRemark') {
//         const slug = path.basename(node.fileAbsolutePath, '.md')
//         // console.log(node)

//         createNodeField({
//             node,
//             name: 'slug',
//             value: slug
//         })
//     }
//     // console.log(node);
// }

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const blogTemplate = path.resolve('./src/templates/blog.js')
    const res = await graphql(`
        query {
            allContentfulBlogPost {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `)
    res.data.allContentfulBlogPost.edges.forEach((edge) => {
        createPage({
            component: blogTemplate,
            path: `/blog/${edge.node.slug}`,
            context: {
                slug: edge.node.slug
            }
        })
    }) 
    // 1. Get path to templete
    // 2. Get markdown data
    // 3. Create new pages

}

// query {
//     allMarkdownRemark {
//         edges {
//             node {
//                 fields{
//                     slug
//                 }
//             }
//         }
//     }
// }