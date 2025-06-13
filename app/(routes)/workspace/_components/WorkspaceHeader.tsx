"use client"
import { Button } from '@/components/ui/button'
import { Link, Save, FileText, SquarePen, Columns } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import ShareDialog from './ShareDialog'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

interface WorkspaceHeaderProps {
  onSave: () => void;
  fileId?: string;
  fileName?: string;
  fileData?: any;
  viewMode: "both" | "documentation" | "diagram";
  setViewMode: (mode: "both" | "documentation" | "diagram") => void;
}

function WorkspaceHeader({onSave, fileId, fileName, fileData, viewMode, setViewMode}: WorkspaceHeaderProps) {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const { user, isLoading } = useKindeBrowserClient()
  const [isOwner, setIsOwner] = useState(false)
  
  useEffect(() => {
    if (user && fileData) {
      // Check if current user is the creator of the file
      setIsOwner(fileData.createdBy === user.email)
    }
  }, [user, fileData])

  // Determine if buttons should be shown based on authentication and ownership
  const showButtons = !isLoading && user && isOwner
  
  return (
    <div className='p-3 border-b flex justify-between items-center'>
      <div className='flex gap-2 items-center'>
        <a href={user ? '/dashboard' : '/'}>
          <Image 
            src={'/logo-1.png'}
            alt='logo'
            height={40}
            width={40}
            className="cursor-pointer" 
          />
        </a>
        <h2>{fileName || "File Name"}</h2>
      </div>
      <div className='flex items-center gap-4'>
        {/* View mode toggle buttons */}
        <div className='flex items-center gap-2 mr-4 border rounded-md overflow-hidden'>
          <Button
            variant={viewMode === "documentation" ? "default" : "ghost"}
            size="sm"
            className='h-8 px-3 rounded-none'
            onClick={() => setViewMode("documentation")}
          >
            <FileText size={16} className="mr-2" /> Doc
          </Button>
          <Button
            variant={viewMode === "both" ? "default" : "ghost"}
            size="sm"
            className='h-8 px-3 rounded-none'
            onClick={() => setViewMode("both")}
          >
            <Columns size={16} className="mr-2" /> Both
          </Button>
          <Button
            variant={viewMode === "diagram" ? "default" : "ghost"}
            size="sm"
            className='h-8 px-3 rounded-none'
            onClick={() => setViewMode("diagram")}
          >
            <SquarePen size={16} className="mr-2" /> Diagram
          </Button>
        </div>
        
        {showButtons ? (
          <>
            <Button className='h-8 text-[12px]
            gap-2 bg-yellow-500 hover:bg-yellow-600'
            onClick={()=>onSave()}
            > 
            <Save className='h-4 w-4' /> Save </Button>
            <Button 
              className='h-8 text-[12px] gap-2 bg-blue-600 hover:bg-blue-700'
              onClick={() => setIsShareDialogOpen(true)}
            >
              Share <Link className='h-4 w-4' /> 
            </Button>
          </>
        ) : (
          <div className='text-sm text-slate-500 italic'>
            {isLoading ? 'Loading...' : 
             !user ? 'Please sign in to edit this file' : 
             'View only - You are not the owner of this file'}
          </div>
        )}
        
        {fileId && user && isOwner && <ShareDialog 
          isOpen={isShareDialogOpen} 
          setIsOpen={setIsShareDialogOpen}
          fileId={fileId}
          fileName={fileName}
        />}
      </div>
    </div>
  )
}

export default WorkspaceHeader