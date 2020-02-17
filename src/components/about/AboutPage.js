import React from "react";
import { Calendar, CenturyView } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import AlloyEditor from "alloyeditor";
// const AboutPage = () => (
//   <div>
//     <h2>About</h2>
//     <p>
//       This app uses React, Redux, React Router, and many other helpful
//       libraries.
//     </p>
//   </div>
// );

class AboutPage extends React.Component {
  state = {
    date: new Date()
  };

  // constructor(props) {
  //   super(props);
  //   // AlloyEditor.editable("Editor");
  // }

  // componentDidMount() {
  //   this._editor = AlloyEditor.editable("Editor", {});
  // }

  // componentWillUnmount() {
  //   this._editor.destroy();
  // }

  handleCalendarChange = date => {
    this.setState({ date });
  };

  handleEditorChange = (content, editor) => {
    console.log("Content was updated:", content);
  };

  render() {
    return (
      <div>
        <Calendar
          onChange={this.handleCalendarChange}
          calendarType="US"
          value={this.state.date}
          tileClassName="testing"
          defaultView="decade"
        />
        <CenturyView activeStartDate={new Date()} />
        <CKEditor
          height="900px"
          editor={ClassicEditor}
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
    );
  }
}

export default AboutPage;
