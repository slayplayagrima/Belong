import { Switch, Route, Router as WouterRouter } from "wouter";
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

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/role-select" component={RoleSelect} />
      <Route path="/ngo/register" component={NgoRegister} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/profile/adopter" component={AdopterProfile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
