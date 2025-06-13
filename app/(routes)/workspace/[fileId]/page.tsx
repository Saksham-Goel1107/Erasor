"use client"
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader'
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '../../dashboard/_components/FileList';
import Canvas from '../_components/Canvas';

// View mode types: "both", "documentation", "diagram"
type ViewMode = "both" | "documentation" | "diagram";

function Workspace({params}:any) {
   const [triggerSave,setTriggerSave]=useState(false);
   const [viewMode, setViewMode] = useState<ViewMode>("both");
   const convex=useConvex();
   const [fileData,setFileData]=useState<FILE|any>();
   useEffect(()=>{
    console.log("FILEID",params.fileId)
    params.fileId&&getFileData();
   },[])

   const getFileData=async()=>{
    const result=await convex.query(api.files.getFileById,{_id:params.fileId})
    setFileData(result);
  }
  return (
    <div>
      <WorkspaceHeader 
        onSave={()=>setTriggerSave(!triggerSave)}
        fileId={params.fileId}
        fileName={fileData?.fileName}
        fileData={fileData}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Workspace Layout - Grid adapts based on viewMode */}
      <div className={`grid ${
        viewMode === "both" ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
      }`}>
        {/* Document - Only shown in "both" or "documentation" modes */}
        {(viewMode === "both" || viewMode === "documentation") && (
          <div className='h-screen'>
            <Editor onSaveTrigger={triggerSave}
            fileId={params.fileId}
            fileData={fileData}
            />
          </div>
        )}
        {/* Whiteboard/canvas - Only shown in "both" or "diagram" modes */}
        {(viewMode === "both" || viewMode === "diagram") && (
          <div className={`h-screen ${viewMode === "both" ? "border-l" : ""}`}>
            <Canvas
             onSaveTrigger={triggerSave}
             fileId={params.fileId}
             fileData={fileData}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Workspace