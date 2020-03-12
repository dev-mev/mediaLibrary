import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { Video } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import { Icon, NavigationButton } from '../../components';
import { getParam } from '../../utils/navHelpers';
import { headerStyle, colors } from '../../styles';
import s from './styles';
import { VideoPlayer, Trimmer } from 'react-native-video-processing';

const PlayVideoScreen = (props) => {
  const {
    videoUrl,
    isError,
    isLoading,
    isPlaying,
    onError,
    onLoad,
    onTogglePlaying,
  } = props;

  const icon = isError ? (
    <Icon
      size={50}
      IconSet={Feather}
      iconName="refresh-ccw"
      color={colors.white}
    />
  ) : (
    <Icon
      size={50}
      IconSet={Feather}
      iconName="play"
      color={colors.white}
      iconStyle={s.playIcon}
    />
  );

  // compression methods
  function trimVideo() {
    const options = {
        startTime: 0,
        endTime: 15,
        quality: VideoPlayer.Constants.quality.QUALITY_1280x720, // iOS only
        saveToCameraRoll: true, // default is false // iOS only
        saveWithCurrentDate: true, // default is false // iOS only
    };
    this.videoPlayerRef.trim(options)
        .then((newSource) => console.log(newSource))
        .catch(console.warn);
  }

  function compressVideo() {
      const options = {
          width: 720,
          height: 1280,
          bitrateMultiplier: 3,
          saveToCameraRoll: true, // default is false, iOS only
          saveWithCurrentDate: true, // default is false, iOS only
          minimumBitrate: 300000,
          removeAudio: true, // default is false
      };
      this.videoPlayerRef.compress(options)
          .then((newSource) => console.log(newSource))
          .catch(console.warn);
  }

  function getPreviewImageForSecond(second) {
      const maximumSize = { width: 640, height: 1024 }; // default is { width: 1080, height: 1080 } iOS only
      this.videoPlayerRef.getPreviewForSecond(second, maximumSize) // maximumSize is iOS only
      .then((base64String) => console.log('This is BASE64 of image', base64String))
      .catch(console.warn);
  }

  function getVideoInfo() {
      this.videoPlayerRef.getVideoInfo()
      .then((info) => console.log(info))
      .catch(console.warn);
  }

  return (
    <View style={s.root}>
      <Video
        source={{ uri: videoUrl }}
        style={s.video}
        shouldPlay={isPlaying}
        resizeMode="contain"
        useNativeControls={isPlaying}
        onLoad={onLoad}
        onError={onError}
      />
      {!isPlaying && (
        <TouchableOpacity
          style={[s.button, isError && s.playButtonError]}
          onPress={onTogglePlaying}
        >
          {isLoading
            ? <ActivityIndicator size="large" color={colors.white} />
            : icon}
        </TouchableOpacity>
      )}
      <VideoPlayer
          ref={ref => this.videoPlayerRef = ref}
          startTime={30}  // seconds
          endTime={120}   // seconds
          play={true}     // default false
          replay={true}   // should player play video again if it's ended
          rotate={true}   // use this prop to rotate video if it captured in landscape mode iOS only
          source={'file:///sdcard/DCIM/....'}
          playerWidth={300} // iOS only
          playerHeight={500} // iOS only
          style={{ backgroundColor: 'black' }}
          resizeMode={VideoPlayer.Constants.resizeMode.CONTAIN}
          onChange={({ nativeEvent }) => console.log({ nativeEvent })} // get Current time on every second
      />
      <Trimmer
          source={'file:///sdcard/DCIM/....'}
          height={100}
          width={300}
          onTrackerMove={(e) => console.log(e.currentTime)} // iOS only
          currentTime={this.video.currentTime} // use this prop to set tracker position iOS only
          themeColor={'white'} // iOS only
          thumbWidth={30} // iOS only
          trackerColor={'green'} // iOS only
          onChange={(e) => console.log(e.startTime, e.endTime)}
      />
    </View>
  );
};

PlayVideoScreen.propTypes = {
  videoUrl: PropTypes.string,
  isError: PropTypes.bool,
  isLoading: PropTypes.bool,
  isPlaying: PropTypes.bool,
  onError: PropTypes.func,
  onLoad: PropTypes.func,
  onTogglePlaying: PropTypes.func,
};

PlayVideoScreen.navigationOptions = ({ navigation }) => ({
  ...headerStyle,
  title: getParam(navigation, 'title'),
  headerRight: (
    <NavigationButton
      text="Remove"
      enabled
      onPress={() => {
        getParam(navigation, 'remove')();
        navigation.dispatch(NavigationActions.back({ key: null }));
      }}
    />
  ),
});

export default PlayVideoScreen;
