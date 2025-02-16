import React, { useState } from "react";
import "./ReviewsPage.css";

const ReviewsPage = () => {
    const [reviews, setReviews] = useState([])
    const [newReview, setNewReview] = useState({
        walkerName: "",
        rating: 0,
        comment: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setNewReview((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = () => {
        if (!newReview.walkerName || newReview.rating <= 0 || !newReview.comment) {
            alert("Please fill in all fields and give a valid rating!")
            return
        }

        setReviews((prev) => [
            ...prev,
            {
                ...newReview,
                id: Date.now(),
                date: new Date().toLocaleDateString(),
            },
        ])
        setNewReview({ walkerName: "", rating: 0, comment: "" })
        alert("Thank you for your review!")
    }

    return (
        <div className="reviews-page">
            <h1>Reviews & Ratings</h1>

            <div className="review-form">
                <h2>Leave a Review</h2>
                <input
                    type="text"
                    name="walkerName"
                    placeholder="Dog Walker's Name"
                    value={newReview.walkerName}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="rating"
                    placeholder="Rating (1-5)"
                    min="1"
                    max="5"
                    value={newReview.rating}
                    onChange={handleInputChange}
                />
                <textarea
                    name="comment"
                    placeholder="Write your review here..."
                    value={newReview.comment}
                    onChange={handleInputChange}
                ></textarea>
                <button onClick={handleSubmit}>Submit Review</button>
            </div>

            <div className="review-list">
                <h2>Customer Reviews</h2>
                {reviews.length === 0 ? (
                    <p>No reviews yet. Be the first to review!</p>
                ) : (
                    reviews.map((review) => (
                        <div key={review.id} className="review">
                            <h3>{review.walkerName}</h3>
                            <p>Rating: ⭐ {review.rating}</p>
                            <p>{review.comment}</p>
                            <p className="date">Reviewed on: {review.date}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ReviewsPage;
