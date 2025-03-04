
import { useState, useEffect } from "react";
import { Logo } from "../ui-components/Logo";
import { Button } from "@/components/ui/button";
import { BookOpenText, User, Menu, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again.",
      });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6",
        scrolled ? "bg-background/80 backdrop-blur-xl shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo className="animate-fade-in" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-foreground/80 hover:text-foreground transition-colors duration-200 text-sm font-medium animate-fade-in"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-foreground/80 hover:text-foreground transition-colors duration-200 text-sm font-medium animate-fade-in delay-[50ms]"
          >
            About
          </Link>
          <Link
            to="/features"
            className="text-foreground/80 hover:text-foreground transition-colors duration-200 text-sm font-medium animate-fade-in delay-100"
          >
            Features
          </Link>
          <div className="flex items-center space-x-3 pl-3 animate-fade-in delay-[150ms]">
            {session ? (
              <Button variant="ghost" size="sm" className="gap-2" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2"
                onClick={() => navigate("/auth")}
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            )}
            <Button size="sm" className="gap-2" onClick={() => navigate("/")}>
              <BookOpenText className="h-4 w-4" />
              <span>Get Started</span>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-[72px] bg-background/95 backdrop-blur-lg border-b transition-all duration-300 overflow-hidden",
          mobileMenuOpen ? "max-h-screen border-b" : "max-h-0 border-b-0"
        )}
      >
        <nav className="flex flex-col p-6 space-y-4">
          <Link
            to="/"
            className="text-foreground/80 hover:text-foreground py-2 transition-colors duration-200 text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-foreground/80 hover:text-foreground py-2 transition-colors duration-200 text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/features"
            className="text-foreground/80 hover:text-foreground py-2 transition-colors duration-200 text-base font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Features
          </Link>
          <div className="pt-4 flex flex-col space-y-3">
            {session ? (
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            ) : (
              <Button 
                variant="outline" 
                className="w-full justify-start gap-2"
                onClick={() => {
                  navigate("/auth");
                  setMobileMenuOpen(false);
                }}
              >
                <User className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            )}
            <Button 
              className="w-full justify-start gap-2"
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
            >
              <BookOpenText className="h-4 w-4" />
              <span>Get Started</span>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
