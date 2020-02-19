import React from "react";
import PropTypes from "prop-types";
import "./dailyNote.less";
import CKEditor from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import { FaLock, FaLockOpen } from "react-icons/fa";

const monthMap = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const weekMap = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

class DailyNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.content || "",
      isEditable: false,
      noteDateClass: "daily-note-date disabled"
    };
    this.lockContent = this.lockContent.bind(this);
  }

  handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };

  lockContent() {
    const isEditable = !this.state.isEditable;
    // if (isEditable) {
    // }
    this.setState({
      isEditable,
      noteDateClass: "daily-note-date" + (isEditable ? " enabled" : " disabled")
    });
  }

  // getDisplayDate() {
  //   return (
  //     weekMap[this.props.date.getDay()] +
  //     " " +
  //     this.props.date.getDate() +
  //   );
  // }

  setNoteDateClassName() {
    return "daily-note-date" + (this.isEditable ? " enabled" : " disabled");
  }

  render() {
    return (
      <div
        className={
          "daily-note" +
          (this.props.dailyClassName ? " " + this.props.dailyClassName : "")
        }
      >
        <div className={this.state.noteDateClass}>
          <div className="row-one">{weekMap[this.props.date.getDay()]}</div>
          <div className="row-two">
            <div className="date-of-month">{this.props.date.getDate()}</div>
            <div className="lock-container">
              {this.state.isEditable ? (
                <FaLockOpen onClick={this.lockContent} />
              ) : (
                <FaLock onClick={this.lockContent} />
              )}
            </div>
          </div>
        </div>
        <div
          className="daily-note-content-container"
          onDoubleClick={this.lockContent}
        >
          <CKEditor
            disabled={!this.state.isEditable}
            editor={InlineEditor}
            data={this.state.content}
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote"
              ],
              heading: {
                options: [
                  {
                    model: "paragraph",
                    title: "Paragraph",
                    class: "ck-heading_paragraph"
                  },
                  {
                    model: "heading1",
                    view: "h1",
                    title: "Heading 1",
                    class: "ck-heading_heading1"
                  },
                  {
                    model: "heading2",
                    view: "h2",
                    title: "Heading 2",
                    class: "ck-heading_heading2"
                  }
                ]
              }
            }}
            onInit={editor => {
              // You can store the "editor" and use when it is needed.
              console.log("Editor is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              // console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </div>
      </div>
    );
  }
}

DailyNote.propTypes = {
  content: PropTypes.string,
  dailyClassName: PropTypes.string,
  date: PropTypes.object.isRequired
};

export default DailyNote;
