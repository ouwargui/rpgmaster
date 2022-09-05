import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Signup: React.FC = () => {
  const {bottom} = useSafeAreaInsets();

  return (
    <ScrollView
      className="flex-1 bg-[#00141A]"
      contentContainerStyle={{flexGrow: 1}}
    >
      <View className="flex-1" style={{paddingBottom: bottom}}>
        <Text className="text-white">teste</Text>
      </View>
    </ScrollView>
  );
};

export default Signup;
