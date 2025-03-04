import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Brain, ChevronRight, FileText, Lightbulb, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FileUpload } from "@/components/ui-components/FileUpload";
import { AnalysisPanel } from "@/components/ui-components/AnalysisPanel";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [fileUploaded, setFileUploaded] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const demoRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const scrollToDemo = () => {
    demoRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleFileUploaded = (file: File) => {
    setTimeout(() => {
      setFileUploaded(true);
      toast({
        title: "Analysis complete",
        description: "We've analyzed your research paper and extracted the key insights.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <motion.section 
        className="pt-32 pb-20 px-6 relative" 
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium animate-fade-in">
            Making Research Accessible
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight max-w-4xl mx-auto animate-fade-in delay-[50ms]">
            Understand Complex Research Papers with AI
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in delay-100">
            ResearchEase helps students decode academic papers through AI-powered summaries, explanations, and insights.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4 animate-fade-in delay-[150ms]">
            <Button size="lg" onClick={scrollToDemo} className="gap-2">
              <UploadCloud className="h-4 w-4" />
              <span>Try it now</span>
            </Button>
            <Button variant="outline" size="lg" onClick={scrollToFeatures} className="gap-2">
              <Lightbulb className="h-4 w-4" />
              <span>Learn more</span>
            </Button>
          </div>
        </div>
        
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[80%] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[70%] rounded-full bg-primary/5 blur-3xl" />
        </div>
      </motion.section>

      <section className="py-20 px-6" ref={featuresRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Simplified Academic Reading
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              ResearchEase breaks down complex research papers into digestible components, 
              making them easier to understand and reference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <UploadCloud className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Upload Your Paper</h3>
              <p className="text-muted-foreground">
                Simply upload any academic PDF, and our AI will process the document, 
                extracting text and recognizing its structure.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">AI Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes the content, identifying key concepts, 
                summarizing sections, and explaining complex terminology.
              </p>
            </div>
            
            <div className="bg-card border rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-medium mb-3">Comprehend Easily</h3>
              <p className="text-muted-foreground">
                Access interactive summaries, explanations, and visualizations that make 
                complex research accessible and easier to understand.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium">
              Key Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Designed for Academic Success
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive suite of features helps you navigate through academic literature with ease.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Section-by-Section Summaries</h3>
                <p className="text-muted-foreground">
                  Get concise summaries of each paper section, from abstract to conclusion, 
                  helping you quickly grasp the paper's structure and content.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Key Terminology Extraction</h3>
                <p className="text-muted-foreground">
                  Automatically identify and explain domain-specific terms and jargon, 
                  making specialized vocabulary accessible to newcomers.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12H4M6 8H8M10 4H12M2 16H8M14 16H18M22 12H20M18 8H16M14 4H12M12 22V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Visual Data Interpretation</h3>
                <p className="text-muted-foreground">
                  Convert complex tables, charts, and numerical data into clear, 
                  intuitive visualizations that highlight key insights.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9H21M7 3V5M17 3V5M6 13H8M6 17H8M12 13H14M12 17H14M18 13H20M18 17H20M6.2 21H17.8C18.9201 21 19.4802 21 19.908 20.782C20.2843 20.5903 20.5903 20.2843 20.782 19.908C21 19.4802 21 18.9201 21 17.8V8.2C21 7.07989 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.07989 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V17.8C3 18.9201 3 19.4802 3.21799 19.908C3.40973 20.2843 3.71569 20.5903 4.09202 20.782C4.51984 21 5.07989 21 6.2 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Citation Analysis</h3>
                <p className="text-muted-foreground">
                  Understand the significance of cited works and how they relate to the paper's argument, 
                  providing context for the research.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section ref={demoRef} className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium">
              Try It Now
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">
              Experience ResearchEase
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload a research paper to see how our AI transforms complex academic content into accessible insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-xl font-medium mb-4">Upload Your Paper</h3>
              <p className="text-muted-foreground mb-6">
                Select a PDF file of any research paper to begin. Our AI will analyze the content and generate comprehensive insights.
              </p>
              <div className="mb-6">
                <FileUpload onFileUploaded={handleFileUploaded} />
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border">
                <h4 className="font-medium flex items-center gap-1.5 mb-2">
                  <Lightbulb className="h-4 w-4 text-primary" />
                  <span>Pro Tip</span>
                </h4>
                <p className="text-sm text-muted-foreground">
                  For the best results, upload a paper in PDF format with clear text. Our system works with most academic paper layouts and formats.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-medium mb-4">Analysis Results</h3>
              <p className="text-muted-foreground mb-6">
                See how ResearchEase breaks down complex papers into digestible components.
              </p>
              
              {fileUploaded ? (
                <AnalysisPanel />
              ) : (
                <div className="border border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center bg-muted/30 h-[500px]">
                  <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                  <h4 className="text-lg font-medium mb-2">No Paper Analyzed Yet</h4>
                  <p className="text-muted-foreground max-w-md">
                    Upload a research paper using the form on the left to see the analysis results here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20 px-6 bg-primary/5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Academic Reading?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of students who are using ResearchEase to unlock deeper understanding of academic literature.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span>Get Started Free</span>
            </Button>
            <Button variant="outline" size="lg" className="gap-2">
              <ArrowRight className="h-4 w-4" />
              <span>Learn More</span>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
