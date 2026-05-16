import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import RoleSelect from "@/pages/role-select";
import NgoRegister from "@/pages/ngo-register";
import Signup from "@/pages/signup";
import Login from "@/pages/login";
import AdopterProfile from "@/pages/adopter-profile";
import NgoProfileSetup from "@/pages/ngo-profile-setup";
import NgoProfile from "@/pages/ngo-profile";
import AnimalsPage from "@/pages/animals";
import AnimalDetail from "@/pages/animal-detail";
import NgoDashboard from "@/pages/ngo-dashboard";
import NgoAddAnimal from "@/pages/ngo-add-animal";
import MyRequests from "@/pages/my-requests";
import Dashboard from "@/pages/dashboard";

const queryClient = new QueryClient();

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/role-select" element={<RoleSelect />} />
      <Route path="/ngo/register" element={<NgoRegister />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile/adopter" element={<AdopterProfile />} />
      <Route path="/ngo/profile-setup" element={<NgoProfileSetup />} />
      <Route path="/ngo/profile" element={<NgoProfile />} />
      <Route path="/ngo/dashboard" element={<NgoDashboard />} />
      <Route path="/ngo/add-animal" element={<NgoAddAnimal />} />
      <Route path="/animals" element={<AnimalsPage />} />
      <Route path="/animals/:id" element={<AnimalDetail />} />
      <Route path="/my-requests" element={<MyRequests />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
