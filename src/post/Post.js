import React, { useState, useEffect } from 'react'

import { Heading, Container, Flex, Text, Stack, Grid, Spinner, useToast, Button } from "@chakra-ui/react"
import { useQuery } from 'react-query'
import { useParams, useHistory } from 'react-router-dom'

import { fetchPostData } from "../api/index"
import AddNewPost from '../components/AddNewPost'

const Post = () => {
    const history = useHistory()
    const { id } = useParams()
    const pageId = parseInt(id)

    const toast = useToast();


    const { data, isLoading } = useQuery(["posts", pageId], () => fetchPostData(pageId), {
        onError: (error) => {
            toast({ status: "error", title: error.message })
        }
    });

    return (

        <Container maxW="1300px" mt="5">
            {isLoading ? <Grid placeItems="center" height="100vh"><Spinner /></Grid> :
                <>
                    <AddNewPost isUpdate={true} id={data.data.id} />

                    <Flex justify="space-between" mb="4">
                        <Button colorScheme="red" onClick={
                            () => history.goBack()
                        }>
                            Back
                        </Button>
                    </Flex>
                    <Stack p="4" mb="4" boxShadow="xl" border="1px solid #ccc" key={data.data.id}>
                        <Flex justifyContent="space-between">
                            <Text>
                                User Id: {data.data.id}
                            </Text>
                            <Text>
                                User Id: {data.data.user_id}
                            </Text>
                        </Flex>

                        <Heading fontSize="2xl">
                            {data.data.title}
                        </Heading>
                        <Text>
                            {data.data.body}
                        </Text>
                    </Stack>
                </>
            }

        </Container>


    )
}

export default Post
