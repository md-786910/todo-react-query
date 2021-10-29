import React from 'react'

import { ReactQueryDevtools } from 'react-query/devtools'

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { QueryClientProvider, QueryClient, useQuery } from "react-query"

import Home from "./home/Home"
import Post from "./post/Post"

import './App.css';
import HomePage from './home/HomePage';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        // refetchInterval: 1000
      },
    },
  })

  return (
    <ChakraProvider >
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>

            <Route path="/post/:id" exact >
              <Post />
            </Route>

            <Route path="/:id" exact >
              <Home />
            </Route>

            <Route path="/" exact >
              <HomePage />
            </Route>

          </Switch>
        </Router>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
