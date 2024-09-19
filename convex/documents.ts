import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

const validateUser = async (ctx: any): Promise<string> => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");
  return identity.subject;
};

const fetchDocument = async (ctx: any, id: Id<"documents">, userId: string) => {
  const document = await ctx.db.get(id);
  if (!document || document.userId !== userId) throw new Error("Unauthorized");
  return document;
};

const recursiveOperation = async (
  ctx: any,
  documentId: Id<"documents">,
  userId: string,
  isArchived: boolean,
) => {
  const children = await ctx.db
    .query("documents")
    .withIndex("by_user_parent", (q: any) =>
      q.eq("userId", userId).eq("parentDocument", documentId),
    )
    .collect();

  for (const child of children) {
    await ctx.db.patch(child._id, { isArchived });
    await recursiveOperation(ctx, child._id, userId, isArchived);
  }
};

export const createDocument = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const userId = await validateUser(ctx);
    return await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });
  },
});

export const getSideBar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const userId = await validateUser(ctx);
    return await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q: any) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument),
      )
      .filter((q: any) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
  },
});

export const archiveDocument = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const userId = await validateUser(ctx);
    await fetchDocument(ctx, args.id, userId);
    await ctx.db.patch(args.id, { isArchived: true });
    await recursiveOperation(ctx, args.id, userId, true);
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const userId = await validateUser(ctx);
    return await ctx.db
      .query("documents")
      .withIndex("by_user", (q: any) => q.eq("userId", userId))
      .filter((q: any) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();
  },
});

export const restoreDocument = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const userId = await validateUser(ctx);
    const document = await fetchDocument(ctx, args.id, userId);

    const options: Partial<Doc<"documents">> = { isArchived: false };
    if (document.parentDocument) {
      const parentDocument = await ctx.db.get(document.parentDocument);
      if (parentDocument?.isArchived) options.parentDocument = undefined;
    }

    await ctx.db.patch(args.id, options);
    await recursiveOperation(ctx, args.id, userId, false);
  },
});

export const removeDocument = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const userId = await validateUser(ctx);
    await fetchDocument(ctx, args.id, userId);
    return await ctx.db.delete(args.id);
  },
});

export const getSearch = query({
  handler: async (ctx) => {
    const userId = await validateUser(ctx);
    return await ctx.db
      .query("documents")
      .withIndex("by_user", (q: any) => q.eq("userId", userId))
      .filter((q: any) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
  },
});

export const searchByTitle = query({
  handler: async (ctx, { title }: { title?: string }) => {
    const userId = await validateUser(ctx);

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .collect();

    if (!title || title.trim() === "") {
      return documents;
    }

    const filteredDocuments = documents.filter(
      (doc) => doc.title.toLowerCase().includes(title.toLowerCase()),
    );

    return filteredDocuments;
  },
});

export const getById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Document not found");
    return document;
  },
});

export const getPublishedDocumentById = query({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.documentId);
    if (!document) throw new Error("Document not found");
    if (!document.isPublished) throw new Error("Document is not published");
    return document;
  },
});

export const updateDocument = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updateFields } = args;
    const document = await ctx.db.get(id);
    if (!document) throw new Error("Document not found");
    return await ctx.db.patch(id, updateFields);
  },
});

export const removeIcon = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const userId = await validateUser(ctx);
    await fetchDocument(ctx, args.id, userId);
    return await ctx.db.patch(args.id, { icon: undefined });
  },
});

export const removeCoverImage = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const userId = await validateUser(ctx);
    await fetchDocument(ctx, args.id, userId);
    return await ctx.db.patch(args.id, { coverImage: undefined });
  },
});