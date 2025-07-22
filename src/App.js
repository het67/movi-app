import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './App.css'; // Make sure this is pointing to your CSS file

const ReviewSchema = Yup.object().shape({
  title: Yup.string().required('Movie title is required'),
  review: Yup.string().min(10, 'Review must be at least 10 characters').required('Review text is required'),
  rating: Yup.number().min(1).max(5).required('Rating is required'),
  recommended: Yup.boolean(),
});

const MovieReviewApp = () => {
  const [reviews, setReviews] = useState([]);

  return (
    <div className="review-app">
      <h2 className="title">🎬 Movie Review Form</h2>
      <Formik
        initialValues={{ title: '', review: '', rating: '', recommended: false }}
        validationSchema={ReviewSchema}
        onSubmit={(values, { resetForm }) => {
          setReviews([...reviews, values]);
          resetForm();
        }}
      >
        {() => (
          <Form className="review-form">
            <div className="form-group">
              <label htmlFor="title">🎥 Movie Title:</label>
              <Field name="title" type="text" className="input-field" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="review">📝 Review:</label>
              <Field name="review" as="textarea" rows="4" className="input-field" />
              <ErrorMessage name="review" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="rating">⭐ Rating (1-5):</label>
              <Field name="rating" as="select" className="input-field">
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Field>
              <ErrorMessage name="rating" component="div" className="error" />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <Field name="recommended" type="checkbox" />
                Recommend this movie
              </label>
            </div>

            <button type="submit" className="submit-button">Submit Review</button>
          </Form>
        )}
      </Formik>

      <hr />

      <h3 className="subtitle">📋 Submitted Reviews</h3>
      {reviews.length === 0 ? (
        <p className="no-review">No reviews yet.</p>
      ) : (
        reviews.map((rev, index) => (
          <div key={index} className="review-card">
            <h4>{rev.title}</h4>
            <p><strong>Rating:</strong> {rev.rating}/5</p>
            <p>{rev.review}</p>
            <p><strong>Recommended:</strong> {rev.recommended ? 'Yes' : 'No'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MovieReviewApp;
