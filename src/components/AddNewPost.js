import React from 'react'
import { Stack, Heading, useToast } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { InputControl, TextareaControl, SubmitButton } from "formik-chakra-ui"

import { useMutation, useQueryClient, } from "react-query"

import { addNewPost, updatePost } from "../api/index"


function AddNewPost({ isUpdate, id }) {

    const toast = useToast();
    const cache = useQueryClient()

    const { isLoading, mutateAsync } = useMutation(
        isUpdate ? "updatePost" : "addNewPost",
        isUpdate ? updatePost : addNewPost,

        {
            onSuccess: () => {
                // isUpdate ? cache.invalidateQueries(["posts", id]) :
                cache.invalidateQueries("posts")
            },

            onMutate: async (newPost) => {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)

                if (isUpdate) {
                    await cache.cancelQueries("post")

                    // Snapshot the previous value
                    const previousTodos = cache.getQueryData(["post", id])


                    // Optimistically update to the new value
                    cache.setQueryData(["post", id], old => {
                        console.log(old)
                        return { data: newPost }
                    })

                    return { previousTodos }
                    // Return a context object with the snapshotted value
                }
            },
            onError: (error, newPost, context) => {
                cache.setQueryData(["post", id], context.previousTodos)
                toast({ status: "error", title: error.message })
            },
            // Always refetch after error or success:
            onSettled: () => {
                cache.invalidateQueries('post')
            }
        })



    return (
        <div>
            <Formik initialValues={{ title: "", body: "" }}

                onSubmit={async (value) =>
                    isUpdate ? await mutateAsync({ title: value.title, body: value.body, id }) :
                        await mutateAsync({ title: value.title, body: value.body })
                }>

                <Form>
                    <Stack my="4">
                        <Heading fontSize="2xl" textAlign="center">

                            {isUpdate ? "Update " : "Add "}

                            Post

                        </Heading>
                        <InputControl name="title" label="title" placeholder="Enter a title" />
                        <TextareaControl name="body" label="content" />
                        <SubmitButton isLoading={isLoading}>
                            {isUpdate ? "Update " : "Add "}

                            Post</SubmitButton>
                    </Stack>
                </Form>
            </Formik>
        </div>
    )
}

export default AddNewPost
