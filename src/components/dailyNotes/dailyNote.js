import React from "react";
import PropTypes from "prop-types";
import "./dailyNote.less";
import CKEditor from "@ckeditor/ckeditor5-react";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";

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

class DailyNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: true
    };
    this.lockContent = this.lockContent.bind(this);
  }

  handleEditorChange = (content, editor) => {
    console.log(editor);
    console.log("Content was updated:", content);
  };

  lockContent() {
    console.log(this.state.isEditable);
    this.setState({ isEditable: !this.state.isEditable });
  }

  getDisplayDate() {
    return (
      monthMap[this.props.date.getMonth()] +
      " " +
      this.props.date.getDate() +
      ", " +
      this.props.date.getFullYear()
    );
  }

  render() {
    return (
      <div
        className={
          "daily-note" +
          (this.props.dailyClassName ? " " + this.props.dailyClassName : "")
        }
      >
        <div className="daily-note-date">
          {" "}
          {this.getDisplayDate()}{" "}
          <button
            className="btn btn-outline-success btn-sm"
            onClick={this.lockContent}
          >
            Lock
          </button>
        </div>
        <div className="daily-note-content-container">
          <CKEditor
            disabled={!this.state.isEditable}
            className="ckeditor"
            editor={InlineEditor}
            data="<p>Hello from CKEditor 5!</p>"
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
              console.log({ event, editor, data });
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
  dailyClassName: PropTypes.string,
  date: PropTypes.object.isRequired
};

export default DailyNote;
