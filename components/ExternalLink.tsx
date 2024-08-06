import * as Linking from 'expo-linking';
import { openBrowserAsync } from 'expo-web-browser';
import React from 'react';
import { Platform, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

type Props = TouchableOpacityProps & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <TouchableOpacity
      {...rest}
      onPress={async () => {
        if (Platform.OS !== 'web') {
          await openBrowserAsync(href);
        } else {
          Linking.openURL(href);
        }
      }}
    >
      <Text style={rest.style}>{rest.children}</Text>
    </TouchableOpacity>
  );
}
