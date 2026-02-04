import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { api, queryKeys } from "@/lib/api-client";
import { PostForm } from "@/components/Form";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const queryClient = useQueryClient();

  const { data, status, error } = useQuery({
    queryKey: [queryKeys.POSTS],
    queryFn: async () => {
      const response = await api.posts.$get();
      if (!response.ok) {
        throw new Error("Could not fetch posts");
      }
      return await response.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.posts[":id"].$delete({ param: { id: String(id) } });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.POSTS] });
    },
  });

  if (status === "pending") {
    return <span>Loading...</span>;
  }

  if (status === "error") {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="p-4 flex flex-col gap-6">
      <PostForm />
      
      <ul className="flex flex-col gap-4">
        {data.map((post) => {
          return (
            <li key={post.id} className="p-3 border rounded-lg flex justify-between items-start gap-4">
              <div>
                <h3 className="font-bold">{post.title}</h3>
                <p className="text-gray-600">{post.content}</p>
              </div>
              <button
                onClick={() => deleteMutation.mutate(post.id)}
                disabled={deleteMutation.isPending}
                className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
