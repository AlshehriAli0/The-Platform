import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function CreatePost() {
  return (
    <div className="mx-auto max-w-md rounded-lg border bg-white p-6 shadow-lg dark:bg-gray-950">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Create a Post</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Add an image and a caption to your post.
          </p>
        </div>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="image">Image</Label>
            <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pb-6 pt-5 dark:border-gray-600">
              <div className="space-y-1 text-center">
                <CloudUploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 dark:text-gray-400">
                  <label
                    className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500 dark:bg-gray-950 dark:text-gray-400"
                    htmlFor="image"
                  >
                    <span>Upload a file</span>
                    <Input className="sr-only" id="image" type="file" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-950 dark:text-white dark:focus:border-indigo-500"
              id="caption"
              placeholder="Write a caption for your post..."
              rows={3}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Post</Button>
        </div>
      </div>
    </div>
  );
}

function CloudUploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
