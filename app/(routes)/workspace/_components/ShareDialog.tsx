"use client"

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Copy, Mail, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { api } from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { Id } from '@/convex/_generated/dataModel'

function ShareDialog({isOpen, setIsOpen, fileId, fileName}: {
  isOpen: boolean, 
  setIsOpen: (open: boolean) => void,
  fileId: string,
  fileName: string
}) {
  // Convert the string fileId to Convex ID type
  const fileIdTyped = fileId as Id<"files">
  
  // Get the share mutation from Convex
  const shareFileMutation = useMutation(api.files.shareFileByEmail)
  
  const shareLink = `${window.location.origin}/workspace/${fileId}`
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink)
    toast('Link copied to clipboard')
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share "{fileName}"</DialogTitle>
          <DialogDescription>
            Share this file with others by copying the link. 
            Note: Only you will have edit rights; others will have view access only.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex items-center space-x-2">
            <Input
              value={shareLink}
              readOnly
              className="flex-1"
            />
            <Button onClick={copyToClipboard} className="bg-blue-600 hover:bg-blue-700" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ShareDialog
