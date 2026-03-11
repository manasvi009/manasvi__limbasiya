import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { postsAPI, commentsAPI } from '../services/api';
import { formatDistanceToNow } from 'date-fns';

export default function BlogDetail({ user }) {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await postsAPI.getBySlug(slug);
        setPost(response.data);

        // Fetch comments
        const commentsResponse = await commentsAPI.getByPost(response.data._id);
        setComments(commentsResponse.data);
      } catch (error) {
        console.error('[v0] Fetch post error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) return;

    setCommentLoading(true);
    try {
      const response = await commentsAPI.create({
        content: newComment,
        post: post._id,
      });

      setComments([response.data.comment, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('[v0] Add comment error:', error);
      alert('Failed to add comment');
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Post not found</p>
      </div>
    );
  }

  return (
    <article className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex items-center gap-4 text-gray-600 pb-4 border-b">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div>
                <p className="font-semibold">{post.author?.name}</p>
                <p className="text-sm">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-8 w-full h-96 bg-gray-300 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Featured Image</span>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg p-8 mb-8 prose prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-800">{post.content}</div>
          </div>

          {/* Tags */}
          {post.tags?.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Comments Section */}
          <section className="mt-12 border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

            {/* Add Comment Form */}
            {user ? (
              <form onSubmit={handleAddComment} className="mb-8 bg-gray-50 p-6 rounded-lg">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="submit"
                  disabled={commentLoading}
                  className="mt-4 px-6 py-2 bg-primary text-white rounded hover:bg-blue-600 disabled:opacity-50 transition"
                >
                  {commentLoading ? 'Adding...' : 'Add Comment'}
                </button>
              </form>
            ) : (
              <p className="text-gray-600 mb-8">
                <a href="/login" className="text-primary hover:underline">
                  Sign in
                </a>{' '}
                to leave a comment
              </p>
            )}

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <p className="text-gray-600">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment._id} className="bg-white border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="font-semibold">{comment.author?.name}</p>
                        <p className="text-sm text-gray-500">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </p>
                        <p className="mt-2 text-gray-700">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
