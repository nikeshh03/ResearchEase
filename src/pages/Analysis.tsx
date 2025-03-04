
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnalysisPanel } from "@/components/ui-components/AnalysisPanel";
import { PageTransition } from "@/components/ui-components/PageTransition";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Analysis = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [paperTitle, setPaperTitle] = useState("");
  const [paperDate, setPaperDate] = useState<Date | null>(null);
  const [analysisData, setAnalysisData] = useState<any>(null);
  
  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to view analysis",
      });
      navigate("/auth");
      return;
    }

    const fetchPaperDetails = async () => {
      if (!id) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Paper ID is missing"
        });
        navigate("/");
        return;
      }

      try {
        // Fetch paper details
        const { data: paper, error: paperError } = await supabase
          .from('papers')
          .select('*')
          .eq('id', id)
          .single();

        if (paperError || !paper) {
          throw new Error(paperError?.message || "Paper not found");
        }

        setPaperTitle(paper.title);
        if (paper.upload_date) {
          setPaperDate(new Date(paper.upload_date));
        }

        // Fetch analysis data
        const { data: analysis, error: analysisError } = await supabase
          .from('analyses')
          .select('*')
          .eq('paper_id', id)
          .single();

        if (analysisError && analysisError.code !== 'PGRST116') {
          // PGRST116 means no rows returned, which might be expected if analysis is not ready
          throw new Error(analysisError.message);
        }

        if (analysis) {
          setAnalysisData(analysis);
        } else {
          // If analysis doesn't exist yet, check paper status
          if (paper.status === 'processing') {
            toast({
              title: "Analysis in progress",
              description: "Your paper is still being analyzed. Please check back later.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Analysis not found",
              description: "No analysis found for this paper.",
            });
          }
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching paper details:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load paper details"
        });
        navigate("/");
      }
    };

    fetchPaperDetails();
  }, [id, navigate, toast, user]);
  
  const handleDownload = () => {
    // In a real app, this would generate a PDF or other format of the analysis
    toast({
      title: "Download started",
      description: "Your analysis is being downloaded.",
    });
  };

  const handleShare = () => {
    // In a real app, this would generate a shareable link
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Analysis link copied to clipboard.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28 pb-20 px-6">
        <PageTransition>
          <div className="max-w-7xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-8 px-0 hover:bg-transparent hover:text-primary flex items-center gap-2"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            
            <div className="mb-8 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{paperTitle || "Loading paper..."}</h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="text-sm text-muted-foreground">
                  Analyzed on {paperDate ? paperDate.toLocaleDateString() : "..."} • PDF
                </div>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={handleDownload}
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Analysis</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </Button>
                </div>
              </div>
            </div>
            
            <AnalysisPanel isLoading={isLoading} analysisData={analysisData} />
          </div>
        </PageTransition>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analysis;
