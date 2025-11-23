import React, { useState } from 'react';
import { Comment, UserUser } from '../types';
import { MessageSquare, ThumbsUp, Send, Database } from 'lucide-react';

interface DiscussionSectionProps {
  comments: Comment[];
  user: UserUser;
  onAddComment: (text: string) => void;
}

export const DiscussionSection: React.FC<DiscussionSectionProps> = ({ comments, user, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-slate-700 bg-slate-800/50 p-6">
      <div className="flex items-center justify-between border-b border-slate-700 pb-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Off-Chain Discussion</h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Database className="h-3 w-3" />
          <span>Stored on IPFS</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto pr-2">
        {comments.length === 0 ? (
          <div className="py-8 text-center text-slate-500">
            No comments yet. Start the debate!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs font-bold text-white">
                {comment.author.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-200">{comment.author}</span>
                  <span className="text-xs text-slate-500">{comment.timestamp}</span>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{comment.text}</p>
                <div className="flex items-center gap-4 pt-1">
                  <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-400 transition-colors">
                    <ThumbsUp className="h-3 w-3" />
                    {comment.likes}
                  </button>
                  <button className="text-xs text-slate-500 hover:text-slate-300">Reply</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2 border-t border-slate-700 pt-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={user.isConnected ? "Add to the debate..." : "Connect wallet to comment"}
          disabled={!user.isConnected}
          className="flex-1 rounded-lg border border-slate-600 bg-slate-900 px-4 py-2 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!user.isConnected || !newComment.trim()}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 transition-colors"
        >
          <Send className="h-4 w-4" />
          Post
        </button>
      </form>
    </div>
  );
};