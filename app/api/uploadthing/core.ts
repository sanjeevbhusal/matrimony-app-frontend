import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" })

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "8MB" } })
    // TODO: perform authentication first
    // .middleware(async ({ req }) => {
    //   const user = await auth(req);
    //   if (!user) throw new Error("Unauthorized");
    //   return { userId: user.id };
    // })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("file url", file.url);

      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
