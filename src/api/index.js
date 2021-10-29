import axios from 'axios'


// const api = axios.create({

//     baseURL: process.env.REACT_APP_URL,
//     headers: {
//         Authorization: "Bearer 53b54301dd66fc4cdaa95f007d7db22fbe8388536b387bae085933b7d996823c"
//     }
// })


export const fetchPost = async (pageId) => {
    try {
        const { data } = await axios.get(`https://gorest.co.in/public/v1/users/2244/posts?page=${pageId}`)
        return data
    } catch (error) {
        throw Error("unable to fetch posts")
    }
}

export const addNewPost = async ({ title, body }) => {
    try {

        // const { data } = await axios.post(`https://gorest.co.in/public/v1/users/17/posts`,
        //     {
        //         title,
        //         body,
        //     },
        //     {
        //         headers: {
        //             "Content-Type": "application/json",
        //             Authorization: "Bearer 53b54301dd66fc4cdaa95f007d7db22fbe8388536b387bae085933b7d996823c"
        //         }
        //     }

        // )

        // return data

        const resp = await fetch(`https://gorest.co.in/public/v1/users/2244/posts`, {
            method: "POST",
            headers: {
                Authorization: "Bearer 53b54301dd66fc4cdaa95f007d7db22fbe8388536b387bae085933b7d996823c",
                "Content-Type": "application/json",

            },
            body: JSON.stringify({
                title, body
            })
        })

        const { data } = await resp.json()
        // console.log(resp)
        if (resp.status === 201) {

            return data;
        }
        else {
            throw new Error("unable to fetch and set post data")
        }

    } catch (error) {
        throw Error("unable to post data")

    }
}

// update post
export const updatePost = async ({ title, body, id }) => {
    try {

        const { data } = await axios.patch(`https://gorest.co.in/public/v1/posts/${id}`,
            {
                title,
                body,
            },
            {
                headers: {

                    Authorization: "Bearer 53b54301dd66fc4cdaa95f007d7db22fbe8388536b387bae085933b7d996823c"
                }
            }

        )

        // return data

        //     const resp = await fetch(`https://gorest.co.in/public/v1/posts/${id}`, {
        //         method: "PATCH",
        //         headers: {
        //             Authorization: "Bearer 53b54301dd66fc4cdaa95f007d7db22fbe8388536b387bae085933b7d996823c",
        //             "Content-Type": "application/json",

        //         },
        //         body: JSON.stringify({
        //             title, body
        //         })
        //     })

        //     const { data } = await resp.json()
        //     // console.log(resp)
        //     if (resp.status === 201) {

        //         return data;
        //     }
        //     else {
        //         throw new Error("unable to fetch and set post data")
        //     }

    } catch (error) {
        throw Error("unable to post data")

    }
}

// delete post
export const deletePost = async ({ id }) => {
    try {

        const { data } = await axios.delete(`https://gorest.co.in/public/v1/posts/${id}`,
            {
                headers: {

                    Authorization: "Bearer 53b54301dd66fc4cdaa95f007d7db22fbe8388536b387bae085933b7d996823c"
                }
            }

        )
        return data;


        //     const resp = await fetch(`https://gorest.co.in/public/v1/posts/${id}`, {
        //         method: "PATCH",
        //         headers: {
        //             Authorization: "Bearer 53b54301dd66fc4cdaa95f007d7db22fbe8388536b387bae085933b7d996823c",
        //             "Content-Type": "application/json",

        //         },
        //         body: JSON.stringify({
        //             title, body
        //         })
        //     })

        //     const { data } = await resp.json()
        //     // console.log(resp)
        //     if (resp.status === 201) {

        //         return data;
        //     }
        //     else {
        //         throw new Error("unable to fetch and set post data")
        //     }

    } catch (error) {
        throw Error("unable to delete post")

    }
}

export const fetchPostData = async (pageId) => {
    try {
        const { data } = await axios.get(`https://gorest.co.in/public/v1/posts/${pageId}`)
        return data
    } catch (error) {
        throw Error("unable to fetch posts")
    }
}