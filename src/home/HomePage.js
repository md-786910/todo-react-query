import React from 'react'
import { Text, Box, Flex } from "@chakra-ui/react"
import { useHistory } from 'react-router-dom'

function HomePage() {

    const history = useHistory()
    const id = 1;

    return (
        <Flex justify="center" alignContent="center">
            <Box w="100%" h="100vh" bgGradient="linear(to-r, green.200, pink.500)"

            >
                <Text
                    bgGradient="linear(to-l, #7928CA, #FF0080)"
                    bgClip="text"
                    fontSize="6xl"
                    fontWeight="extrabold"
                    textAlign="center"
                >
                    Welcome to Create Post
                </Text>
                <Flex justify="center">
                    <Box
                        as="button"
                        p={4}
                        color="white"
                        fontWeight="bold"
                        borderRadius="md"
                        bgGradient="linear(to-r, teal.500, green.500)"
                        _hover={{
                            bgGradient: "linear(to-r, red.500, yellow.500)",
                        }}
                        onClick={() => history.push(`/${id}`)}
                    >
                        Create a new post
                    </Box>
                </Flex>
            </Box>
        </Flex>
    )
}

export default HomePage
