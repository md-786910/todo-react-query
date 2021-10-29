import React from 'react'

import { Heading, Container, Flex, Text, Stack, Grid, Spinner, useToast, Button } from "@chakra-ui/react"
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { useParams, useHistory, Link } from 'react-router-dom'
import AddNewPost from '../components/AddNewPost'

import { fetchPost, deletePost } from "../api/index"


const Home = () => {

    const cache = useQueryClient()

    const history = useHistory()
    const { id } = useParams()
    const pageId = parseInt(id)
    // === 0 ? 1 : parseInt(id)

    const toast = useToast();


    const { data, isLoading } = useQuery(["posts", parseInt(id)], () => fetchPost(pageId), {


        keepPreviousData: true,
        onError: (error) => {
            toast({ status: "error", title: error.message })
        }
    });

    const { mutateAsync, isLoading: isMutating } = useMutation("deletePost", deletePost, {

        onError: (error) => {
            toast({ status: "error", title: error.message })
        },
        onSuccess: () => {
            cache.invalidateQueries("posts")
        }
    })

    return (

        <Container maxW="1300px" mt="5">
            {isLoading ? <Grid placeItems="center" height="100vh"><Spinner /></Grid> :
                <>

                    <AddNewPost />
                    <Flex justify="space-between" mb="5">
                        {
                            pageId > 0 ? <Button colorScheme="red" onClick={() => {

                                if (data.meta.pagination.links.previous !== null) {

                                    history.push(`/${pageId - 1}`)
                                }
                            }}  >
                                Prev</Button> :
                                <Button colorScheme="red" disabled>Prev</Button>
                        }

                        <Text>Current Page : {pageId}</Text>

                        <Button colorScheme="green"

                            onClick={() =>

                                history.push(`/${pageId + 1}`)

                            }

                        >Next</Button>
                    </Flex>

                    {
                        data.data.map((post) => {
                            return (
                                <Stack key={post.id}>
                                    <Flex justify="flex-end">
                                        <Button size="sm" colorScheme="red" isLoading={isMutating}
                                            onClick={async () => await mutateAsync({ id: post.id })}
                                        >
                                            Delete Post
                                        </Button>
                                    </Flex>

                                    <Link to={`/post/${post.id}`} >
                                        <Stack p="4" mb="4" boxShadow="xl" border="1px solid #ccc" key={post.id}>
                                            <Flex justifyContent="space-between">
                                                <Text>
                                                    User Id: {post.id}
                                                </Text>
                                                <Text>
                                                    User Id: {post.user_id}
                                                </Text>
                                            </Flex>

                                            <Heading fontSize="2xl">
                                                {post.title}
                                            </Heading>
                                            <Text>
                                                {post.body}
                                            </Text>
                                        </Stack>
                                    </Link>
                                </Stack>
                            )
                        })
                    }
                </>

            }

        </Container>


    )
}

export default Home
