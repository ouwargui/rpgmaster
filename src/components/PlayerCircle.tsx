import React, {useState} from 'react';
import {View, Image, ImageSourcePropType} from 'react-native';
import SkeletonLoader from './SkeletonLoader';

interface PlayerCircleProps {
  image?: ImageSourcePropType | null;
  isActive: boolean;
}

const PlayerCircle: React.FC<PlayerCircleProps> = ({image, isActive}) => {
  const [skeletonWidth, setSkeletonWidth] = useState(0);
  const [imgReady, setImgReady] = useState(false);

  return (
    <View
      onLayout={(e) => setSkeletonWidth(e.nativeEvent.layout.width)}
      className={`w-full h-full overflow-hidden rounded-[100px] bg-white border-4 ${
        isActive ? 'border-green-500' : 'border-zinc-800'
      }`}
    >
      <Image
        onLoad={() => setImgReady(true)}
        onLoadEnd={() => setImgReady(true)}
        className="w-full h-full"
        source={
          image ?? {uri: 'https://avatars.githubusercontent.com/u/1234567?v=4'}
        }
      />
      {!imgReady && <SkeletonLoader width={skeletonWidth} />}
    </View>
  );
};

export default PlayerCircle;
