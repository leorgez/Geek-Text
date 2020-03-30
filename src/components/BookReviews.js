import React, { useState, useEffect } from "react";

export const BookReviews = props => {
  const [reviews, setReviews] = useState(props.reviews);
  useEffect(() => {
    setReviews(props.reviews);
  }, [props.reviews]);
  return (
    <div className="w-full d-block pr-4 pl-4">
      <div className="mt-4">
        <h3>Reviews</h3>
      </div>
      {reviews.map((review, i) => { // we map the review by the integer 
        return (
          <div key={i} className="border-bottom text-left mt-4">
            <h6>Review by {review.author ? review.author : "Anonymous"}</h6> {/* If statement, if they wish to have a name or not */}
            <p>Rating: {review.rating}</p> {/*Here the rate number will be display*/}
            <p>{review.content}</p> {/* The content by the user will be displayed */}
          </div>
        );
      })}
    </div>
  );
};