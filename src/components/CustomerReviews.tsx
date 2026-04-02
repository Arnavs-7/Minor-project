import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Send, Loader2, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface Review {
  id: number;
  product_id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface CustomerReviewsProps {
  productId: string;
}

const API_BASE = "/api/reviews";

const StarSelector = ({
  rating,
  onSelect,
}: {
  rating: number;
  onSelect: (r: number) => void;
}) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onSelect(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="p-0.5 transition-transform hover:scale-110"
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            size={20}
            className={
              star <= (hover || rating)
                ? "text-champagne fill-champagne transition-colors"
                : "text-border transition-colors"
            }
          />
        </button>
      ))}
      {rating > 0 && (
        <span className="ml-2 text-xs text-muted-foreground">
          {rating} / 5
        </span>
      )}
    </div>
  );
};

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) > 1 ? "s" : ""} ago`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const CustomerReviews = ({ productId }: CustomerReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}?product_id=${productId}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_id: productId,
          user_name: userName.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      if (res.ok) {
        const newReview = await res.json();
        // Optimistic update
        setReviews((prev) => [newReview, ...prev]);
        setUserName("");
        setRating(0);
        setComment("");
        setShowForm(false);
        toast.success("Review submitted! Thank you for your feedback.");
      } else {
        const err = await res.json();
        toast.error(err.error || "Failed to submit review");
      }
    } catch (err) {
      console.error("Failed to submit review:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="container mx-auto px-6 lg:px-12 py-12 border-t border-border mt-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-heading text-2xl mb-1">Customer Reviews</h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < Math.round(avgRating)
                        ? "text-champagne fill-champagne"
                        : "text-border"
                    }
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {avgRating.toFixed(1)} ({reviews.length} review
                {reviews.length !== 1 ? "s" : ""})
              </span>
            </div>
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="border border-foreground px-6 py-2.5 text-xs uppercase tracking-[0.1em] hover:bg-foreground hover:text-background transition-colors"
        >
          {showForm ? "Cancel" : "Write a Review"}
        </button>
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="overflow-hidden mb-10"
          >
            <div className="bg-muted/30 border border-border p-6 lg:p-8 space-y-5">
              <h4 className="font-heading text-lg">Share Your Experience</h4>

              <div>
                <label className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  Rating *
                </label>
                <StarSelector rating={rating} onSelect={setRating} />
              </div>

              <div>
                <label className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  Your Name *
                </label>
                <div className="relative">
                  <User
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    maxLength={100}
                    className="w-full bg-transparent border border-border pl-9 pr-3 py-2.5 text-sm outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs tracking-[0.1em] uppercase text-muted-foreground mb-2 block">
                  Your Review *
                </label>
                <div className="relative">
                  <MessageSquare
                    size={14}
                    className="absolute left-3 top-3 text-muted-foreground"
                  />
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about your experience with this product..."
                    rows={4}
                    maxLength={1000}
                    className="w-full bg-transparent border border-border pl-9 pr-3 py-2.5 text-sm outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="bg-foreground text-background px-8 py-3 text-xs tracking-[0.15em] uppercase hover:bg-champagne hover:text-foreground transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Submit Review
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={24} className="animate-spin text-champagne" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-12 bg-muted/20 border border-border">
          <MessageSquare size={32} className="mx-auto text-muted-foreground mb-3" strokeWidth={1} />
          <p className="text-muted-foreground font-light text-sm mb-1">No reviews yet</p>
          <p className="text-xs text-muted-foreground">
            Be the first to share your experience with this product!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="border-b border-border pb-6"
            >
              <div className="flex items-center gap-2 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={
                      i < review.rating
                        ? "text-champagne fill-champagne"
                        : "text-border"
                    }
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground font-light mb-3">
                "{review.comment}"
              </p>
              <div className="flex items-center gap-2">
                <p className="text-xs tracking-[0.1em] uppercase font-medium">
                  {review.user_name}
                </p>
                <span className="text-border">·</span>
                <p className="text-xs text-muted-foreground">
                  {formatDate(review.created_at)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
