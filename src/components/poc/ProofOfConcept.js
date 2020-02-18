import React from "react";
import { CenturyView } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import CKEditor from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import CalendarPopup from "../calendar/CalendarPopup";

class ProofOfConceptPage extends React.Component {
  handleEditorChange = (content, editor) => {
    console.log(editor);
    console.log("Content was updated:", content);
  };

  render() {
    return (
      <div>
        <CenturyView activeStartDate={new Date()} />
        <CalendarPopup />
        <CKEditor
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

        {/* <CKEditor
          editor={InlineEditor}
          data="<p>Hello from CKEditor 5!</p>"
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
        /> */}
      </div>
    );
  }
}

export default ProofOfConceptPage;
