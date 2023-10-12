import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { ClerkProvider } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Home from "@/pages/Home";
import Error from "@/pages/error/Error";
import FeaturedPage from "@/pages/FeaturedPage";

import { ThemeProvider } from "@/components/themes/theme-provider";
import SignInComponent from "@/components/auth/signIn";
import SignUpComponent from "@/components/auth/signUp";

const clerkPubKey = import.meta.env.VITE_REACT_APP_CLERK_PUBLISHABLE_KEY;
const isDev =
  !import.meta.env.VITE_REACT_APP_ENVIRONMENT ||
  import.meta.env.VITE_REACT_APP_ENVIRONMENT === "development";

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

const queryClient = new QueryClient();

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();
  const toastOptions = { duration: 4000, position: "bottom-left" };

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/sign-in/*" element={<SignInComponent />} />
            <Route path="/sign-up/*" element={<SignUpComponent />} />

            <Route
              path="/trending"
              element={
                <FeaturedPage
                  endpoint="getTrendingAnimes"
                  title="Trending"
                  queryKey="trendingAnimes"
                />
              }
            />
            <Route
              path="/popular"
              element={
                <FeaturedPage
                  endpoint="getTopAnimes"
                  title="Most Popular"
                  queryKey="topAnimes"
                />
              }
            />
            {/* <Route
              path="/currentlyAiring"
              element={
                <FeaturedPage
                  endpoint="getCurrentlyAiringAnimes"
                  title="Currently Airing"
                  queryKey="currentlyAiringAnimes"
                />
              }
            /> */}

            {/* <Route path=""/> */}

            <Route path="*" element={<Error />} />
          </Routes>
          {isDev && <ReactQueryDevtools initialIsOpen={false} />}
          <Toaster toastOptions={toastOptions} />
        </QueryClientProvider>
      </ThemeProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ClerkProviderWithRoutes />
    </BrowserRouter>
  );
}

export default App;
