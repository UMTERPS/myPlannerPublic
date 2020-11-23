module.exports = {
  themeVariableTemplate: `
@<<themeName>>-background: <<background>>;
@<<themeName>>-edit-bacdground: <<edit-bacdground>>;
@<<themeName>>-color: <<color>>;
@<<themeName>>-border-color: <<border-color>>;
@<<themeName>>-highlight: <<highlight>>;
@<<themeName>>-highlight-red: <<highlight-red>>;
@<<themeName>>-checkbox-color: <<checkbox-color>>;
@<<themeName>>-checkbox-background: <<checkbox-background>>;
@<<themeName>>-checkbox-border: <<checkbox-border>>;

`,
  styleSheetTemplate: `
.App-Container<<themeClassName>> {
  div.ant-tabs-left {
    div.ant-tabs-nav-wrap {
      background-color: @<<themeName>>-background;
      .ant-tabs-tab.ant-tabs-tab-active {
        background-color: @<<themeName>>-highlight;
      }
    }
  }

  .settings-container {
    background-color: @<<themeName>>-background;
    label {
      color: @<<themeName>>-color;
    }
  }

  .daily-note-header-container {
    background-color: @<<themeName>>-background;
    button.ant-btn {
      background-color: @<<themeName>>-background;
    }
  }

  .daily-note {
    .daily-note-date.disabled {
      border-right: 1px dashed @<<themeName>>-border-color;
      background-color: @<<themeName>>-background;
    }
    .daily-note-date {
      .weekend {
        color: @<<themeName>>-highlight-red;
      }
      .row-two {
        .lock-container {
          color: @<<themeName>>-highlight;
        }
      }
    }
    .daily-note-content-container {
      div.ck-editor__editable_inline.ck-read-only {
        background-color: @<<themeName>>-background;
      }
    }
    .ck-content .todo-list .todo-list__label {
      > input[checked]{
        &::before {
          background: @<<themeName>>-checkbox-background;
          border-color: @<<themeName>>-checkbox-border;
        }
        &::after {
          border-color: @<<themeName>>-checkbox-color;
        }
      }
    }
  }

  .week-note-container {
    .week-note-title {
      background-color: @<<themeName>>-background;
    }
    .ck-editor
      > .ck-editor__main
      > div.ck-editor__editable_inline.ck-read-only {
      background-color: @<<themeName>>-background;
    }
    .ck-content .todo-list .todo-list__label {
      > input[checked]{
        &::before {
          background: @<<themeName>>-checkbox-background;
          border-color: @<<themeName>>-checkbox-border;
        }
        &::after {
          border-color: @<<themeName>>-checkbox-color;
        }
      }
    }
  }
}

`
};
