
import { useState, useRef, useCallback } from "react";
import { FileText, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/hooks/useAuth";
import { analyzePaper } from "@/utils/analysisUtils";
import { useNavigate } from "react-router-dom";

interface FileUploadProps {
  onFileUploaded?: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
}

export function FileUpload({ onFileUploaded, accept = ".pdf", maxSize = 10 }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Define handleFileSelect before using it
  const handleFileSelect = (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("application/pdf")) {
      setError("Only PDF files are supported");
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a PDF file",
      });
      return;
    }

    const maxSizeInBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      setError(`File size exceeds the maximum limit of ${maxSize} MB`);
      toast({
        variant: "destructive",
        title: "File too large",
        description: `Please upload a file smaller than ${maxSize} MB`,
      });
      return;
    }

    setSelectedFile(file);
    setError(null);
  };

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files[0];
    handleFileSelect(droppedFile);
  }, []);

  const resetFileSelection = () => {
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadToSupabase = async (selectedFile: File) => {
    // Check if user is authenticated
    if (!user) {
      setError("You must be logged in to upload files");
      toast({
        variant: "destructive",
        title: "Authentication required",
        description: "Please log in to upload files",
      });
      return;
    }
    
    setIsUploading(true);
    setProgress(0);
    
    try {
      const fileId = uuidv4();
      const fileName = selectedFile.name;
      const fileExt = fileName.split('.').pop();
      const filePath = `${fileId}.${fileExt}`;
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 5;
        });
      }, 300);
      
      // Upload file to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('papers')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false,
        });
      
      clearInterval(progressInterval);
      
      if (uploadError) {
        throw uploadError;
      }

      console.log("File uploaded successfully to storage:", data);

      // Store paper metadata in database with user_id
      const { data: paperData, error: dbError } = await supabase
        .from('papers')
        .insert({
          title: fileName.replace('.pdf', ''),
          file_path: filePath,
          status: 'processing',
          user_id: user.id, // Explicitly set the user ID
        })
        .select();

      if (dbError) {
        console.error("Database error:", dbError);
        throw dbError;
      }

      setProgress(100);
      
      toast({
        title: "Upload successful",
        description: "Your file has been uploaded and is being processed.",
      });
      
      if (onFileUploaded) {
        onFileUploaded(selectedFile);
      }

      // Start analysis process
      if (paperData && paperData.length > 0) {
        try {
          // Show toast for analysis
          toast({
            title: "Analysis started",
            description: "Your paper is being analyzed. This may take a moment.",
          });
          
          // Trigger analysis
          await analyzePaper(paperData[0].id, paperData[0].title);
          
          // Navigate to analysis page
          navigate(`/analysis/${paperData[0].id}`);
        } catch (analysisError) {
          console.error("Analysis error:", analysisError);
          toast({
            variant: "destructive",
            title: "Analysis failed",
            description: "There was an error analyzing your paper. Please try again.",
          });
        }
      }
      
      resetFileSelection();
    } catch (error: any) {
      console.error("Upload error:", error);
      setError(error.message || "An error occurred during upload");
      
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: error.message || "There was an error uploading your file",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div
      className="relative border-dashed border-2 border-muted-foreground/50 rounded-md p-4 md:p-10 flex flex-col items-center justify-center text-center"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept={accept}
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
      />
      
      {isDragging && (
        <div className="absolute inset-0 bg-accent/80 z-10 flex items-center justify-center text-accent-foreground rounded-md">
          Drop here to upload
        </div>
      )}
      
      {selectedFile ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <FileText className="h-12 w-12 text-primary" />
          <p className="text-sm text-muted-foreground">
            {selectedFile.name} - {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
          </p>
          <div className="flex space-x-2">
            <Button variant="secondary" size="sm" onClick={resetFileSelection}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => uploadToSupabase(selectedFile)} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
          {isUploading && (
            <Progress value={progress} className="w-64" />
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      ) : (
        <div className="space-y-4">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <h3 className="text-lg font-semibold">
            Drag and drop your file here or{" "}
            <label
              htmlFor="file-upload"
              className="text-primary hover:underline cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              browse
            </label>
          </h3>
          <p className="text-sm text-muted-foreground">
            Supports: {accept} | Max Size: {maxSize} MB
          </p>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      )}
    </div>
  );
}
