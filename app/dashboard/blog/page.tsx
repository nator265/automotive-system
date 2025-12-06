"use client";

import React, { useEffect, useState } from "react";

const BlogCMS = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/posts");
      const json = await res.json();
      setPosts(json.posts || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function addPost(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        setTitle("");
        setContent("");
        fetchPosts();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function deletePost(id: string) {
    try {
      const res = await fetch("/api/posts", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (res.ok) fetchPosts();
    } catch (err) {
      console.error(err);
    }
  }

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sendResult, setSendResult] = useState<string | null>(null);

  async function sendNewsletter(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, content: body }),
      });
      const json = await res.json();
      if (res.ok) {
        setSendResult(`Sent to ${json.sent} subscribers`);
        setSubject("");
        setBody("");
      } else {
        setSendResult(json.error || "Failed to send");
      }
    } catch (err) {
      console.error(err);
      setSendResult("Error while sending");
    }
  }

  return (
    <main className="w-full transition-all duration-300 mt-5 p-4 md:p-6">
      <div className="mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold text-gray-800">Blog CMS</h1>
        <p className="text-gray-500">Create and manage blog posts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-3">New Post</h3>
          <form onSubmit={addPost} className="space-y-3">
            <div>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" rows={6} className="w-full border px-3 py-2 rounded" />
            </div>
            <div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Publish</button>
            </div>
          </form>
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Newsletter</h3>
            <form onSubmit={sendNewsletter} className="space-y-3">
              <div>
                <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Message body" rows={4} className="w-full border px-3 py-2 rounded" />
              </div>
              <div>
                <button className="bg-emerald-600 text-white px-4 py-2 rounded">Send Newsletter</button>
              </div>
              {sendResult && <p className="text-sm text-gray-600 mt-2">{sendResult}</p>}
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="space-y-3">
            {posts.length === 0 ? (
              <div className="bg-white p-4 rounded shadow">No posts yet.</div>
            ) : (
              posts.map((p) => (
                <div key={p.id} className="bg-white p-4 rounded shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{p.title}</h4>
                      <p className="text-xs text-gray-500">{p.createdAt}</p>
                    </div>
                    <div>
                      <button onClick={() => deletePost(p.id)} className="text-red-600">Delete</button>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">{p.content}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogCMS;
