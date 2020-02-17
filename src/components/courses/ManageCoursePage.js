import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import Spinner from "../common/Spinner";
import { newCourse } from "../../../tools/mockData";
import { toast } from "react-toastify";

function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  loadAuthors,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!courses || courses.length === 0) {
      loadCourses().catch(error => {
        console.log("error loading courses" + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (!authors || authors.length === 0) {
      loadAuthors().catch(error => {
        console.log("error loading authors" + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  function isFormValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) {
      errors.title = "Title is required!";
    }
    if (!authorId) {
      errors.author = "Author is required!";
    }
    if (!category) {
      errors.category = "Category is required!";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (isFormValid()) {
      setSaving(true);
      saveCourse(course)
        .then(() => {
          toast.success("Course Saved");
          history.push("/courses");
        })
        .catch(error => {
          setSaving(false);
          setErrors({ onSave: error.message });
        });
    }
  }
  return authors.length === 0 || courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired // passed in by react-router automatically,
};

const getCourseBySlug = (courses, slug) => {
  return courses.find(course => course.slug === slug) || null;
};

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
};

const mapDisptchToProps = {
  loadCourses: courseActions.loadCourses,
  saveCourse: courseActions.saveCourse,
  loadAuthors: authorActions.loadAuthors
};

export default connect(mapStateToProps, mapDisptchToProps)(ManageCoursePage);
