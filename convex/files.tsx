import {v} from 'convex/values';
import { mutation, query } from './_generated/server';

export const createFile=mutation({
    args:{
        fileName:v.string(),
        teamId:v.string(),
        createdBy:v.string(),
        archive:v.boolean(),
        document:v.string(),
        whiteboard:v.string(),
        isShared:v.optional(v.boolean())
    },
    handler:async(ctx, args) =>{
        const fileData = {
            ...args,
            isShared: args.isShared || false // Default to not shared
        };
        const result=await ctx.db.insert('files', fileData);
        return result;
    },
})

export const getFiles=query({
    args:{
        teamId:v.string()
    },
    handler:async(ctx, args)=> {
        const result=ctx.db.query('files')
        .filter(q=>q.eq(q.field('teamId'),args.teamId))
        .order('desc')
        .collect();

        return result;
    },
})

export const updateDocument=mutation({
    args:{
        _id:v.id('files'),
        document:v.string(),
        userId:v.optional(v.string())
    },
    handler:async(ctx, args) =>{
        // Get current file data to check permissions
        const file = await ctx.db.get(args._id);
        
        // If file is shared, only allow the creator to modify it
        if (file.isShared && args.userId && file.createdBy !== args.userId) {
            throw new Error("Only the creator can modify a shared file");
        }
        
        const result = await ctx.db.patch(args._id, {document:args.document});
        return result;
    },
})

export const updateWhiteboard=mutation({
    args:{
        _id:v.id('files'),
        whiteboard:v.string(),
        userId:v.optional(v.string())
    },
    handler:async(ctx, args) =>{
        // Get current file data to check permissions
        const file = await ctx.db.get(args._id);
        
        // If file is shared, only allow the creator to modify it
        if (file.isShared && args.userId && file.createdBy !== args.userId) {
            throw new Error("Only the creator can modify a shared file");
        }
        
        try {
            // Parse the whiteboard data to validate it
            JSON.parse(args.whiteboard);
            
            // Save the validated whiteboard data
            const result = await ctx.db.patch(args._id, {whiteboard: args.whiteboard});
            return result;
        } catch (error) {
            console.error("Error updating whiteboard:", error);
            throw new Error("Failed to update whiteboard: Invalid data format");
        }
    },
})



export const getFileById=query({
    args:{
        _id:v.id('files')
    },
    handler:async(ctx, args)=> {
        const result=await ctx.db.get(args._id);
        return result;
    },
})

// Share file with another user by email
export const shareFileByEmail = mutation({
    args:{
        fileId: v.id('files'),
        email: v.string(),
    },
    handler: async(ctx, args) => {
        // Mark the file as shared
        await ctx.db.patch(args.fileId, { 
            isShared: true 
        });
        
        // In a real implementation, you would:
        // 1. Check if the email corresponds to an existing user
        // 2. Grant permissions to that user for this file
        // 3. Send an email notification
        
        return { success: true, message: `File shared with ${args.email}` };
    }
})