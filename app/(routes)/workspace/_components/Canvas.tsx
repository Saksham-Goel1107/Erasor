import React, { useEffect, useState } from 'react'
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { FILE } from '../../dashboard/_components/FileList';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { processFiles } from '@/lib/imageUtils';
import { toast } from 'sonner';

function Canvas({onSaveTrigger, fileId, fileData}:{onSaveTrigger:any, fileId:any, fileData:FILE}) {
    const [whiteBoardData, setWhiteBoardData] = useState<any>();
    const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
    const [files, setFiles] = useState<{[id: string]: any}>({});
    const [isSaving, setIsSaving] = useState(false);
    
    const updateWhiteboard = useMutation(api.files.updateWhiteboard);
    
    // Initialize the whiteboard data and files from the saved state
    useEffect(() => {
        if (fileData?.whiteboard) {
            try {
                const parsedData = JSON.parse(fileData.whiteboard);
                // Check if there's a files object in the saved data
                if (parsedData.files) {
                    setFiles(parsedData.files);
                }
            } catch (error) {
                console.error("Error parsing whiteboard data:", error);
            }
        }
    }, [fileData]);

    useEffect(() => {
        if (onSaveTrigger) {
            saveWhiteboard();
        }
    }, [onSaveTrigger]);

    const saveWhiteboard = async () => {
        if (!excalidrawAPI) return;
        
        try {
            setIsSaving(true);
            
            // Get elements and appState from Excalidraw
            const elements = excalidrawAPI.getSceneElements();
            const appState = excalidrawAPI.getAppState();
            const fileData = excalidrawAPI.getFiles() || {}; // Ensure fileData is an object
            
            // Process and optimize images before saving
            const optimizedFiles = await processFiles(fileData);
            
            // Create a complete data object that includes elements and files
            const completeData = {
                elements: elements,
                appState: appState,
                files: optimizedFiles || {} // Ensure files is an object even if processFiles fails
            };
            
            // Save the complete data
            await updateWhiteboard({
                _id: fileId,
                whiteboard: JSON.stringify(completeData)
            });
            
            toast.success("Canvas saved successfully");
        } catch (error) {
            console.error("Error saving whiteboard:", error);
            toast.error("Failed to save canvas");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div style={{ height: "670px" }}>
            {fileData && (
                <Excalidraw 
                    theme='light'
                    initialData={{
                        elements: fileData?.whiteboard ? 
                            JSON.parse(fileData?.whiteboard)?.elements || [] : 
                            [],
                        appState: fileData?.whiteboard ? 
                            {
                                ...JSON.parse(fileData?.whiteboard)?.appState || {},
                                collaborators: []
                            } : 
                            { collaborators: [] },
                        files: fileData?.whiteboard ? 
                            JSON.parse(fileData?.whiteboard)?.files || {} : 
                            {}
                    }}
                    onChange={(
                        elements: readonly any[], 
                        files: { [id: string]: any }
                    ) => {
                        setWhiteBoardData(elements);
                        setFiles(files);
                    }}
                    UIOptions={{
                        canvasActions: {
                            saveToActiveFile: false,
                            loadScene: false,
                            export: {} as Record<string, unknown>,
                            toggleTheme: false
                        }
                    }}
                    excalidrawAPI={(api: any) => setExcalidrawAPI(api)}
                >
                    <MainMenu>
                        <MainMenu.DefaultItems.ClearCanvas/>
                        <MainMenu.DefaultItems.SaveAsImage/>
                        <MainMenu.DefaultItems.ChangeCanvasBackground/>
                    </MainMenu>
                    <WelcomeScreen>
                        <WelcomeScreen.Hints.MenuHint/>
                        <WelcomeScreen.Hints.ToolbarHint/>
                        <WelcomeScreen.Center>
                            <WelcomeScreen.Center.MenuItemHelp/>
                        </WelcomeScreen.Center>
                    </WelcomeScreen>
                </Excalidraw>
            )}
        </div>
    )
}

export default Canvas