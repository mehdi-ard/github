import React from "react";
import { storiesOf } from "@storybook/react";
import Dialog from "./";
import Button from "../button";

class DialogBox extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.handleClickOpen}
        >
          open dialog
        </Button>
        <Dialog
          open={this.state.open}
          close={this.handleClose}
          titledisagree="لغو"
          titleagree="تایید"
          agree={this.handleClose}
          disagree={this.handleClose}
          title="Lorem Ipsum"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </Dialog>
      </>
    );
  }
}

storiesOf("Dialog", module).add("default", () => <DialogBox />);
