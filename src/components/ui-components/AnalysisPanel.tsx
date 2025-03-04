
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  FileText, 
  BookOpen, 
  ScrollText, 
  FlaskConical, 
  BarChart, 
  MessageSquare,
  Lightbulb,
  Bookmark,
  ListChecks,
  ArrowUpRight,
  Paperclip
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisPanelProps {
  className?: string;
  isLoading?: boolean;
  analysisData?: any;
}

export function AnalysisPanel({ className, isLoading = false, analysisData }: AnalysisPanelProps) {
  const [activeTab, setActiveTab] = useState("summary");

  if (isLoading) {
    return (
      <div className={cn("flex flex-col space-y-4 animate-pulse", className)}>
        <div className="h-8 bg-muted rounded-md w-3/4"></div>
        <div className="h-4 bg-muted rounded-md w-1/2"></div>
        <div className="h-4 bg-muted rounded-md w-full"></div>
        <div className="h-4 bg-muted rounded-md w-5/6"></div>
        <div className="h-4 bg-muted rounded-md w-3/4"></div>
        <div className="h-32 bg-muted rounded-md w-full"></div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
        <div className="mb-4">
          <FileText className="h-16 w-16 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-medium mb-2">Analysis not available</h3>
        <p className="text-muted-foreground max-w-md">
          The analysis for this paper is either in progress or has not been generated yet. 
          Please check back later.
        </p>
      </div>
    );
  }

  return (
    <Tabs 
      defaultValue="summary" 
      value={activeTab}
      onValueChange={setActiveTab}
      className={cn("w-full", className)}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 animate-fade-in">
          Research Paper Analysis
        </h2>
        <p className="text-muted-foreground max-w-3xl animate-fade-in delay-100">
          We've analyzed your paper and broken it down into key components. Explore each tab to better understand different aspects of the research.
        </p>
      </div>
      
      <TabsList className="flex flex-wrap gap-2 h-auto bg-transparent p-0">
        <TabsTrigger 
          value="summary" 
          className={cn(
            "flex items-center gap-2 px-4 py-2 transition-all rounded-md data-[state=active]:bg-accent data-[state=active]:shadow-none",
            "border border-transparent data-[state=active]:border-border",
            "animate-fade-in"
          )}
        >
          <ScrollText className="h-4 w-4" />
          <span>Summary</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="sections" 
          className={cn(
            "flex items-center gap-2 px-4 py-2 transition-all rounded-md data-[state=active]:bg-accent data-[state=active]:shadow-none",
            "border border-transparent data-[state=active]:border-border",
            "animate-fade-in delay-[50ms]"
          )}
        >
          <BookOpen className="h-4 w-4" />
          <span>Sections</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="methodology" 
          className={cn(
            "flex items-center gap-2 px-4 py-2 transition-all rounded-md data-[state=active]:bg-accent data-[state=active]:shadow-none",
            "border border-transparent data-[state=active]:border-border",
            "animate-fade-in delay-100"
          )}
        >
          <FlaskConical className="h-4 w-4" />
          <span>Methodology</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="findings" 
          className={cn(
            "flex items-center gap-2 px-4 py-2 transition-all rounded-md data-[state=active]:bg-accent data-[state=active]:shadow-none",
            "border border-transparent data-[state=active]:border-border",
            "animate-fade-in delay-[150ms]"
          )}
        >
          <BarChart className="h-4 w-4" />
          <span>Findings</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="terminology" 
          className={cn(
            "flex items-center gap-2 px-4 py-2 transition-all rounded-md data-[state=active]:bg-accent data-[state=active]:shadow-none",
            "border border-transparent data-[state=active]:border-border",
            "animate-fade-in delay-[200ms]"
          )}
        >
          <Bookmark className="h-4 w-4" />
          <span>Terminology</span>
        </TabsTrigger>
        
        <TabsTrigger 
          value="references" 
          className={cn(
            "flex items-center gap-2 px-4 py-2 transition-all rounded-md data-[state=active]:bg-accent data-[state=active]:shadow-none",
            "border border-transparent data-[state=active]:border-border",
            "animate-fade-in delay-[250ms]"
          )}
        >
          <Paperclip className="h-4 w-4" />
          <span>References</span>
        </TabsTrigger>
      </TabsList>
      
      <div className="mt-6 bg-card border rounded-lg p-6 animate-scale-in">
        <ScrollArea className="h-[450px] pr-4">
          <TabsContent value="summary" className="mt-0 space-y-4">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium">
                Paper Overview
              </span>
              <h3 className="text-xl font-medium">{analysisData?.summary ? 'Analysis Results' : 'Neural Network Approaches to Natural Language Processing'}</h3>
              <p className="text-muted-foreground text-sm">Authors: {analysisData?.authors || 'Unknown'} • Published: {analysisData?.publication_year || 'Unknown'}</p>
              
              <div className="space-y-2 mt-4">
                <p>{analysisData?.summary || 'This paper explores recent advancements in neural network approaches to natural language processing (NLP), with a focus on transformer architectures and their applications in various NLP tasks.'}</p>
                
                <p>Key contributions include:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {analysisData?.key_findings ? (
                    analysisData.key_findings.map((finding: string, index: number) => (
                      <li key={index}>{finding}</li>
                    ))
                  ) : (
                    <>
                      <li>A systematic comparison of transformer-based models across multiple NLP tasks</li>
                      <li>Analysis of computational efficiency and parameter optimization techniques</li>
                      <li>Identification of remaining challenges and promising research directions</li>
                      <li>A framework for evaluating ethical considerations in NLP model deployment</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                  Natural Language Processing
                </span>
                <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                  Neural Networks
                </span>
                <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                  Transformer Architectures
                </span>
                <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                  Computational Linguistics
                </span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sections" className="mt-0 space-y-6">
            {analysisData?.section_summaries ? (
              Object.entries(analysisData.section_summaries).map(([key, value]: [string, any]) => (
                <div key={key}>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium mb-2">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <p className="text-sm">{value}</p>
                </div>
              ))
            ) : (
              <>
                <div>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium mb-2">
                    Abstract
                  </span>
                  <p className="text-sm">Natural language processing (NLP) has been transformed by neural network approaches, particularly transformer-based architectures.</p>
                </div>
                
                <div>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium mb-2">
                    Introduction
                  </span>
                  <p className="text-sm">The introduction traces the evolution of NLP from rule-based systems to statistical approaches and finally to neural network models.</p>
                </div>
                
                <div>
                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium mb-2">
                    Literature Review
                  </span>
                  <p className="text-sm">This section examines prior work in neural NLP, focusing on the development of key architectures.</p>
                </div>
              </>
            )}
          </TabsContent>
          
          <TabsContent value="methodology" className="mt-0">
            <div className="space-y-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium">
                Research Approach
              </span>
              <h3 className="text-lg font-medium">Comparative Analysis Methodology</h3>
              
              <div className="space-y-4">
                <p>{analysisData?.methodology_notes || 'The paper employs a mixed-methods approach combining quantitative benchmarking with qualitative analysis of model architectures.'}</p>
                
                <div className="bg-muted/30 p-4 rounded-md border space-y-2">
                  <h4 className="font-medium">Model Selection</h4>
                  <p className="text-sm">The researchers selected state-of-the-art transformer-based models, including BERT, RoBERTa, T5, and GPT variants, based on citation impact and performance on leaderboards.</p>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-md border space-y-2">
                  <h4 className="font-medium">Evaluation Framework</h4>
                  <p className="text-sm">Models were evaluated on standard NLP benchmark datasets spanning different tasks, including GLUE, SQuAD, CoNLL-2003, and WMT.</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="findings" className="mt-0">
            <div className="space-y-6">
              <div>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium mb-2">
                  Key Findings
                </span>
                <h3 className="text-lg font-medium">Performance Across NLP Tasks</h3>
                
                <div className="mt-4 space-y-4">
                  <div className="bg-muted/30 p-4 rounded-md border">
                    <h4 className="font-medium mb-2">Performance Comparison</h4>
                    <div className="relative pt-1">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block">BERT</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block">82%</span>
                        </div>
                      </div>
                      <div className="flex h-2 mb-4 overflow-hidden rounded bg-muted">
                        <div className="bg-primary/80" style={{ width: "82%" }}></div>
                      </div>
                      
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block">RoBERTa</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block">87%</span>
                        </div>
                      </div>
                      <div className="flex h-2 mb-4 overflow-hidden rounded bg-muted">
                        <div className="bg-primary/80" style={{ width: "87%" }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-4 rounded-md border space-y-2">
                      <h4 className="font-medium">Computational Efficiency</h4>
                      <p className="text-sm">Larger models achieved higher accuracy but required substantially more computational resources.</p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-md border space-y-2">
                      <h4 className="font-medium">Task Specialization</h4>
                      <p className="text-sm">Encoder-decoder architectures outperformed encoder-only models on generation tasks.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="terminology" className="mt-0">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium">
                Key Terminology
              </span>
              <h3 className="text-lg font-medium">Essential NLP Concepts Explained</h3>
              
              <div className="grid grid-cols-1 gap-4">
                {analysisData?.key_terms?.terms ? (
                  analysisData.key_terms.terms.map((item: any, index: number) => (
                    <div key={index} className="bg-muted/30 p-4 rounded-md border space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{item.term}</h4>
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">Term</span>
                      </div>
                      <p className="text-sm">{item.definition}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-muted/30 p-4 rounded-md border space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Transformer Architecture</h4>
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">Architecture</span>
                      </div>
                      <p className="text-sm">A neural network architecture introduced in the paper "Attention Is All You Need" (Vaswani et al., 2017).</p>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-md border space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">Self-Attention</h4>
                        <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">Mechanism</span>
                      </div>
                      <p className="text-sm">A mechanism that allows a model to weigh the importance of different words in a sequence relative to each other.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="references" className="mt-0">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium">
                Citations Analysis
              </span>
              <h3 className="text-lg font-medium">Key References and Their Significance</h3>
              
              <div className="space-y-4">
                {analysisData?.citation_analysis?.references ? (
                  analysisData.citation_analysis.references.map((ref: any, index: number) => (
                    <div key={index} className="bg-muted/30 p-4 rounded-md border space-y-2 transition-all hover:bg-muted/50">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{ref.title}</h4>
                        <span className="text-xs text-muted-foreground">{ref.year}</span>
                      </div>
                      <p className="text-sm">{ref.authors}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">Cited {ref.citations} times</span>
                        <a href="#" className="text-xs flex items-center text-primary hover:underline">
                          View paper <ArrowUpRight className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="bg-muted/30 p-4 rounded-md border space-y-2 transition-all hover:bg-muted/50">
                      <div className="flex justify-between">
                        <h4 className="font-medium">Attention Is All You Need</h4>
                        <span className="text-xs text-muted-foreground">2017</span>
                      </div>
                      <p className="text-sm">Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L., & Polosukhin, I.</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">Cited 45,000+ times</span>
                        <a href="#" className="text-xs flex items-center text-primary hover:underline">
                          View paper <ArrowUpRight className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-md border space-y-2 transition-all hover:bg-muted/50">
                      <div className="flex justify-between">
                        <h4 className="font-medium">BERT: Pre-training of Deep Bidirectional Transformers</h4>
                        <span className="text-xs text-muted-foreground">2019</span>
                      </div>
                      <p className="text-sm">Devlin, J., Chang, M. W., Lee, K., & Toutanova, K.</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">Cited 30,000+ times</span>
                        <a href="#" className="text-xs flex items-center text-primary hover:underline">
                          View paper <ArrowUpRight className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </ScrollArea>
      </div>
    </Tabs>
  );
}
