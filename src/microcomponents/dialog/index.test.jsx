jest.mock('react-dom');

import React from 'react';
import { createPortal } from 'react-dom';

import renderer from 'react-test-renderer';
import Dialog from '.';

class DialogBox extends React.Component {
  state = {
    open: false
  };

  render() {
    return (
      <>
        {createPortal(
          <Dialog
            open={this.state.open}
            close={this.handleClose}
            titledisagree="لغو"
            titleagree="تایید"
            agree={this.handleClose}
            disagree={this.handleClose}
            title="لورم ایپسوم"
          >
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان
            که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
          </Dialog>
        )}
      </>
    );
  }
}

it('renders default', () => {
  expect(renderer.create(<DialogBox />).toJSON()).toMatchSnapshot();
});
