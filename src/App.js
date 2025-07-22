import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ReviewSchema = Yup.object().shape({
  title: Yup.string().required('Movie title is required'),
  review: Yup.string().min(10, 'Review must be at least 10 characters').required('Review text is required'),
  rating: Yup.number().min(1).max(5).required('Rating is required'),
  recommended: Yup.boolean(),
});

const MovieReviewApp = () => {
  const [reviews, setReviews] = useState([]);

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
      
      

      <h2>🎬 Movie Review Form</h2>
      <Formik
        initialValues={{ title: '', review: '', rating: '', recommended: false }}
        validationSchema={ReviewSchema}
        onSubmit={(values, { resetForm }) => {
          setReviews([...reviews, values]);
          resetForm();
        }}
      >
        {() => (
          <Form>
            <div className='container' >
              <label htmlFor="title">Movie Title:</label>
              <Field name="title" type="text" />
              <ErrorMessage name="title" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label htmlFor="review">Review:</label>
              <Field name="review" as="textarea" rows="4" />
              <ErrorMessage name="review" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label htmlFor="rating">Rating (1-5):</label>
              <Field name="rating" as="select">
                <option value="">Select</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </Field>
              <ErrorMessage name="rating" component="div" style={{ color: 'red' }} />
            </div>

            <div>
              <label>
                <Field name="recommended" type="checkbox" />
                Recommend this movie
              </label>
            </div>

            <button type="submit">Submit Review</button>
          </Form>
        )}
      </Formik>

      <hr />

      <h3>📋 Submitted Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        reviews.map((rev, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
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
