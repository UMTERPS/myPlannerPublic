/**
 * @license Copyright (c) 2014-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import InlineEditor from '@ckeditor/ckeditor5-editor-inline/src/inlineeditor.js';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment.js';
import FontColor from '@ckeditor/ckeditor5-font/src/fontcolor.js';
import FontSize from '@ckeditor/ckeditor5-font/src/fontsize.js';
import FontFamily from '@ckeditor/ckeditor5-font/src/fontfamily.js';
import Highlight from '@ckeditor/ckeditor5-highlight/src/highlight.js';
import HorizontalLine from '@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js';
import Strikethrough from '@ckeditor/ckeditor5-basic-styles/src/strikethrough.js';
import TodoList from '@ckeditor/ckeditor5-list/src/todolist';
import Underline from '@ckeditor/ckeditor5-basic-styles/src/underline.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';

class EditorInlineBuild extends InlineEditor {}
class EditorClassicBuild extends ClassicEditor {}

// Plugins to include in the build.
EditorClassicBuild.builtinPlugins = [
  Autoformat,
  Bold,
  Italic,
  BlockQuote,
  Heading,
  Indent,
  List,
  PasteFromOffice,
  Alignment,
  FontColor,
  FontSize,
  FontFamily,
  Highlight,
  HorizontalLine,
  Strikethrough,
  TodoList,
  Underline,
  Essentials,
  Paragraph
];

// Editor configuration.
EditorClassicBuild.defaultConfig = {
  toolbar: {
    items: [
      // first row
      'bold',
      'underline',
      'italic',
      'strikethrough',
      '|',
      'fontFamily',
      'fontSize',
      'fontColor',
      'highlight',
      '|',
      'horizontalLine',
      'blockQuote',
      // second row
      'heading',
      '|',
      'bulletedList',
      'numberedList',
      'todoList',
      'alignment',
      'indent',
      'outdent',
      '|'
    ]
  },

  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en'
};

// Plugins to include in the build.
EditorInlineBuild.builtinPlugins = [
  Autoformat,
  Bold,
  Italic,
  BlockQuote,
  Heading,
  Indent,
  List,
  PasteFromOffice,
  Alignment,
  FontColor,
  FontSize,
  FontFamily,
  Highlight,
  HorizontalLine,
  Strikethrough,
  TodoList,
  Underline,
  Essentials,
  Paragraph
];

// Editor configuration.
EditorInlineBuild.defaultConfig = {
  toolbar: {
    items: [
      // first row
      'bold',
      'underline',
      'italic',
      'strikethrough',
      '|',
      'fontFamily',
      'fontSize',
      'fontColor',
      'highlight',
      '|',
      'horizontalLine',
      'blockQuote',
      // second row
      'heading',
      '|',
      'bulletedList',
      'numberedList',
      'todoList',
      'alignment',
      'indent',
      'outdent',
      '|'
    ]
  },

  // This value must be kept in sync with the language defined in webpack.config.js.
  language: 'en'
};

export { EditorInlineBuild, EditorClassicBuild };
