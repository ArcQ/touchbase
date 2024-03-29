import { Avatar, utils } from 'react-native-gifted-chat';
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

import CustomDay from './CustomGiftedChatComposer/CustomDay';
import colors from '../../../constants/colors';
import gStyle from '../../../constants/gStyle';
import MessageBubble from './MessageBubble';

// components

const { isSameUser, isSameDay } = utils;

class Message extends React.Component {
  getInnerComponentProps() {
    const { containerStyle, ...props } = this.props;

    return {
      ...props,
      position: 'left',
      isSameUser,
      isSameDay,
    };
  }

  renderDay() {
    const { currentMessage, renderDay } = this.props;

    if (currentMessage.createdAt) {
      const dayProps = this.getInnerComponentProps();

      if (renderDay) {
        return renderDay(dayProps);
      }

      return (
        <CustomDay
          {...dayProps}
          containerStyle={style.containerDay}
          textStyle={style.dayText}
        />
      );
    }

    return null;
  }

  renderBubble() {
    const { renderBubble } = this.props;

    const bubbleProps = this.getInnerComponentProps();

    if (renderBubble) {
      return renderBubble(bubbleProps);
    }

    return <MessageBubble {...bubbleProps} />;
  }

  renderAvatar() {
    const { currentMessage, previousMessage } = this.props;
    let extraStyle;

    if (
      isSameUser(currentMessage, previousMessage) &&
      isSameDay(currentMessage, previousMessage)
    ) {
      // set the invisible avatar height to 0, but keep the width, padding, etc.
      extraStyle = { height: 0 };
    }

    const avatarProps = this.getInnerComponentProps();
    return (
      <Avatar
        {...avatarProps}
        imageStyle={{
          left: [style.slackAvatar, avatarProps.imageStyle, extraStyle],
        }}
      />
    );
  }

  render() {
    const { containerStyle, currentMessage, nextMessage } = this.props;

    const marginBottom = isSameUser(currentMessage, nextMessage) ? 2 : 10;

    return (
      <View>
        {this.renderDay()}

        <View style={[style.container, { marginBottom }, containerStyle]}>
          {this.renderAvatar()}
          {this.renderBubble()}
        </View>
      </View>
    );
  }
}

Message.defaultProps = {
  currentMessage: {},
  containerStyle: {},
  nextMessage: {},
  previousMessage: {},
  renderAvatar: undefined,
  renderBubble: null,
  renderDay: null,
  user: {},
};

Message.propTypes = {
  currentMessage: PropTypes.object,
  containerStyle: PropTypes.shape({
    left: PropTypes.number,
    right: PropTypes.number,
  }),
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  renderAvatar: PropTypes.func,
  renderBubble: PropTypes.func,
  renderDay: PropTypes.func,
  user: PropTypes.object,
};

const style = {
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 8,
  },
  containerDay: {
    alignItems: 'flex-start',
    marginHorizontal: 8,
  },
  dayText: {
    ...gStyle.textLarsBold16,
    color: colors.blueBlack,
    paddingBottom: 2,
    textAlign: 'left',
  },
  slackAvatar: {
    // the bottom should roughly line up with the first line of message text.
    borderRadius: 3,
    height: 40,
    width: 40,
  },
};

export default Message;
